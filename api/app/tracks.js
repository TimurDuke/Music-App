const express = require('express');

const Track = require('../models/Track');
const Album = require('../models/Album');
const auth = require("../middleware/auth");

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
            await Album.find({artist}).exec(async (err, albums) => {
                if (err) throw new Error();

                if (!albums.length) {
                    return res.status(404).send({error: "No tracks found for this artist."});
                }

                const tracks = await Track.find({album: {$in: albums}});

                res.send(tracks);
            });
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
    const { title, album, duration, number } = req.body;

    if (!title || !album || !duration || !number) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const trackData = {title, album, duration, number};

    const track = new Track(trackData);

    try {
        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;