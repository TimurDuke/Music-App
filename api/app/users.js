const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({error: "Data not valid"});
    }

    const userData = {username, password};

    const user = new User(userData);

    try {
        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});

    if (!user) {
        return res.status(401).send({error: "Username or password is wrong"});
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return res.status(401).send({error: "Username or password is wrong"});
    }

    const token = user.generateToken();
    await user.save();

    res.send({token});
});

module.exports = router;