const express = require('express');
const multer = require('multer');
const uniqid = require("uniqid");
const path = require('path');

const config = require('../config');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Album = require('../models/Album');
const Track = require("../models/Track");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, uniqid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const { artist } = req.query;

    if (artist) {
        try {
            const albums = await Album
                .find({artist})
                .sort({"release": 1})
                .populate('artist', 'name');

            const response = await Promise.all(albums.map(async album => {
                const tracks = await Track.find({album: album._id, published: true});

                return {...album['_doc'], tracksCount: tracks.length};
            }));

            res.send(response);
        } catch (e) {
            return res.status(400).send({error: e.message});
        }
    }

    if (!artist) {
        try {
            const artists = await Album
                .find()
                .populate('artist', 'name');

            res.send(artists);
        } catch {
            res.sendStatus(500);
        }
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).send({error: "There is no album with this id."});
        }

        res.send(album);
    } catch {
        res.status(404).send({error: "There is no album with this id."});
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { title, artist } = req.body;

    if (!title || !artist) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const albumData = {title, release: new Date().toISOString(), artist, image: null};

    if (req.file) {
        albumData.image = 'uploads/' + req.file.filename;
    }

    const album = new Album(albumData);

    try {
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({message: 'Album not found!'});
        }

        await Album.findByIdAndDelete(album['_id']);

        res.send({message: "Album deleted."});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;