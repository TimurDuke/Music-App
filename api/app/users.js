const express = require('express');
const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");
const config = require("../config");
const User = require('../models/User');
const axios = require("axios");

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

router.post('/', upload.single('image'), async (req, res) => {
    const { username, password } = req.body;
    const avatarImage = req.file ? req.file.filename : null;

    if (!username || !password || !avatarImage) {
        return res.status(400).send({error: "Data not valid"});
    }

    const userData = {username, password, avatarImage};

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
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(401).send({message: "Email or password is wrong"});
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return res.status(401).send({message: "Email or password is wrong"});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send(user);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body['accessToken'];
    const accessToken = config.fb.appId + '|' + config.fb.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const {data} = await axios.get(debugTokenUrl);

        if (data.data.error) {
            return res.status(401).send({message: "Facebook token incorrect!"});
        }

        if (req.body.id !== data.data['user_id']) {
            return res.status(401).send({message: "Wrong user ID"});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            const userData = {
                email: req.body.email,
                password: uniqid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url,
            }

            user = new User(userData);
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        res.send(user);
    } catch (e) {
        return res.status(401).send({message: "Facebook token incorrect!"});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({success, user});
});

module.exports = router;