const express = require('express');
const User = require('../models/Users');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const userData = {username, password};

    const user = new User(userData);

    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send({error: e.message});
    }
});

module.exports = router;