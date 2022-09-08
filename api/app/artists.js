const express = require('express');
const multer = require('multer');
const uniqid = require("uniqid");
const path = require('path');

const Artist = require('../models/Artist');
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
    try {
        const artists = await Artist.find();

        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name, information } = req.body;

    if (!name) {
        return res.status(400).send({error: 'The name field must be filled in.'});
    }

    const artistData = {
        name,
        information: information || null,
        image: null,
    };

    if (req.file) {
        artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);

    try {
        await artist.save();

        res.send(artist);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

module.exports = router;