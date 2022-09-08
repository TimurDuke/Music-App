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
    const {artist} = req.query;

    if (artist) {
        try {
            const albums = await Album.find({artist: artist});
            res.send(albums);
        } catch (e) {
            res.status(400).send(e.message);
        }
    }

    try {
        const artists = await Album.find();
        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

// router.post('/', upload.single('image'), async (req, res) => {
//
// });

module.exports = router;