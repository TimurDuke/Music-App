require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');

const config = require('./config');

const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistories = require('./app/trackHistories');

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.use('/artists', artists);
    app.use('/albums', albums);
    app.use('/tracks', tracks);
    app.use('/users', users);
    app.use('/track_history', trackHistories);

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('MongoDb disconnect');
    });
};

run().catch(e => console.log(e));