const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');
const Track = require('../models/Track');

const router = express.Router();

router.post('/', async (req, res) => {
    const { track } = req.body;

    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: "No token presented"});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: "Token is wrong"});
    }

    try {
        const listenedTrack = await Track.findById({_id: track});

        if (!listenedTrack) {
            return res.status(400).send({error: "Track not found"});
        }

        const trackHistoryData = {
            track: listenedTrack['_id'],
            user: user['_id'],
            datetime: new Date().toLocaleDateString()
        };

        const trackHistory = new TrackHistory(trackHistoryData);

        await trackHistory.save();

        res.send(trackHistory);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

module.exports = router;