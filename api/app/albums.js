const express = require('express');
const multer = require('multer');
const uniqid = require("uniqid");
const path = require('path');

const Album = require('../models/Album');
const config = require('../config');

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
            const albums = await Album.find({artist});

            res.send(albums);
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