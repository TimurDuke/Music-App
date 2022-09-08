const express = require('express');

const Track = require('../models/Track');
const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    const { album, artist } = req.query;

    if (album) {
        try {
            const tracks = await Track.find({album: album});

            res.send(tracks);
        } catch (e) {
            res.status(400).send({error: e.message});
        }
    } else if (artist) {
        try {
            await Album.find({artist: artist}).exec(async (err, albums) => {
                if (err) throw new Error();

                const tracks = (await Promise.all(
                    albums.map(album => {
                        return Track.find({album: album['_id']});
                    })
                )).flat();

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
    const { title, album, duration } = req.body;

    if (!title || !album || !duration) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const trackData = {title, album, duration};

    const track = new Track(trackData);

    try {
        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;