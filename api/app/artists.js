const express = require('express');
const multer = require('multer');
const uniqid = require("uniqid");
const path = require('path');

const config = require('../config');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Artist = require('../models/Artist');

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
    try {
        const {name, information} = req.body;

        const artistData = {
            name,
            information: information || null,
            image: null,
        };

        if (req.file) {
            artistData.image = 'uploads/' + req.file.filename;
        }

        const artist = new Artist(artistData);

        await artist.save();

        res.send(artist);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Artist not found!'});
        }

        await Artist.findByIdAndDelete(artist['_id']);

        res.send({message: "Artist deleted."});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;