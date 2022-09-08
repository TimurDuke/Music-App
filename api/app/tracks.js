const express = require('express');

const Track = require('../models/Track');

const router = express.Router();

// router.get('/', async (req, res) => {
//
// });

router.post('/', async (req, res) => {
    const {title, album, duration} = req.body;

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