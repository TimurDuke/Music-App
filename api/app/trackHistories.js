const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const Track = require('../models/Track');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const user = req.user;

    try {
        const history = await TrackHistory
            .find({user: user['_id']})
            .sort({datetime: -1})
            .populate({
                path: "track", select: "title",
                populate: {
                    path: "album", select: "_id",
                    populate: {path: "artist", select: "name"}
                }
            });

        res.send(history)
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', auth, async (req, res) => {
    const { track } = req.body;

    const user = req.user;

    try {
        const listenedTrack = await Track.findById({_id: track});

        if (!listenedTrack) {
            return res.status(400).send({error: "Track not found"});
        }

        const trackHistoryData = {
            track: listenedTrack['_id'],
            user: user['_id'],
            datetime: new Date().toISOString()
        };

        const trackHistory = new TrackHistory(trackHistoryData);

        await trackHistory.save();

        res.send(trackHistory);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

module.exports = router;