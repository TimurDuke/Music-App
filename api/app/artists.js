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
        const artists = await Artist.find({published: true});

        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

router.get('/personal', auth, async (req, res) => {
    try {
        const artists = await Artist.find({user: req.user._id});

        res.send(artists);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/not_publish', auth, permit('admin'), async (req, res) => {
    try {
        const artists = await Artist.find({published: false});

        res.send(artists);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { name, information } = req.body;

        const artistData = {
            name,
            user: req.user._id,
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

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
    const artistId = req.params.id;

    try {
        const artist = await Artist.findById(artistId);

        if (!artist) {
            return res.status(404).send({error: "Artist not found!"});
        }

        if (artist.published) {
            return res.status(400).send({message: "The artist has already been published."});
        }

        await Artist.findByIdAndUpdate(artistId, {published: true});

        res.send({message: "The artist has been successfully published."});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Artist not found!'});
        }

        await Artist.findByIdAndDelete(artist['_id']);

        res.send({message: "The artist has been successfully removed."});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;