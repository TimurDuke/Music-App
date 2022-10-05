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
                .find({album, published: true})
                .sort({number: 1})
                .populate({path: 'album', select: 'title', populate: {path: "artist", select: 'name'}});

            res.send(tracks);
        } catch (e) {
            res.status(400).send({error: e.message});
        }
    } else if (artist) {
        try {
            const tracks = await Track.find({artist, published: true});

            res.send(tracks);
        } catch (e) {
            res.sendStatus(500);
        }
    }

    if (!album && !artist) {
        try {
            const tracks = await Track
                .find({published: true})
                .populate('album', 'title');

            res.send(tracks);
        } catch {
            res.sendStatus(500);
        }
    }
});

router.get('/personal', auth, async (req, res) => {
    try {
        const tracks = await Track.find({user: req.user._id});

        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/not_publish', auth, permit('admin'), async (req, res) => {
    try {
        const tracks = await Track.find({published: false});

        res.send(tracks);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, artist, album, duration, number, youtube } = req.body;

        const checkNumber = await Track.findOne({number, album});

        if (checkNumber) return res.status(400).send({errors: {number: {message: "Track with this number already having."}}});

        const trackData = {
            title,
            user: req.user._id,
            artist,
            album,
            duration,
            number,
            youtube: youtube || null
        };

        const track = new Track(trackData);

        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
    const trackId = req.params.id;

    try {
        const track = await Track.findById(trackId);

        if (!track) {
            return res.status(404).send({error: "Track not found!"});
        }

        if (track.published) {
            return res.status(400).send({message: "The track has already been published."});
        }

        await Track.findByIdAndUpdate(trackId, {published: true});

        res.send({message: "The track has been successfully published."});
    } catch (e) {
        res.sendStatus(500);
    }
});


router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);

        if (!track) {
            return res.status(404).send({message: 'Track not found!'});
        }

        await Track.findByIdAndDelete(track['_id']);

        res.send({message: "The track has been successfully removed."});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;