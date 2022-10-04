const express = require('express');

const Track = require('../models/Track');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const { album, artist } = req.query;

    if (album) {
        try {
            const tracks = await Track
                .find({album})
                .sort({number: 1})
                .populate({path: 'album', select: 'title', populate: {path: "artist", select: 'name'}});

            res.send(tracks);
        } catch (e) {
            res.status(400).send({error: e.message});
        }
    } else if (artist) {
        try {
            const tracks = await Track.find({artist});

            res.send(tracks);
        } catch (e) {
            res.sendStatus(500);
        }
    }

    if (!album && !artist) {
        try {
            const tracks = await Track
                .find()
                .populate('album', 'title');

            res.send(tracks);
        } catch {
            res.sendStatus(500);
        }
    }
});

router.post('/', async (req, res) => {
    const { title, album, duration, number, youtube } = req.body;

    if (!title || !album || !duration || !number) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const checkNumber = await Track.findOne({number, album});

    if (checkNumber) return res.status(400).send({error: "Track with this number already having"});

    const trackData = {title, album, duration, number, youtube};

    const track = new Track(trackData);

    try {
        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send({message: 'Track not found!'});
        }

        await Track.findByIdAndDelete(track['_id']);

        res.send({message: "Track deleted."});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;