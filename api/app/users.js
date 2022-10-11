const express = require('express');
const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");
const config = require("../config");
const User = require('../models/User');

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