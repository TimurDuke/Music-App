const express = require('express');
const multer = require('multer');
const uniqid = require("uniqid");
const path = require('path');

const Album = require('../models/Album');
const config = require('../config');
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
                const tracks = await Track.find({album: album._id});

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
    const { title, release, artist } = req.body;

    if (!title || !release || !artist) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const albumData = {title, release, artist, image: null};

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);

    try {
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

module.exports = router;