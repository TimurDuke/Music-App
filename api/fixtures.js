const mongoose = require('mongoose');
const uniqid = require('uniqid');
const config = require('./config');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const TrackHistory = require('./models/TrackHistory');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2] = await User.create({
        username: "admin",
        password: "admin",
        token: uniqid(),
        role: "admin",
    }, {
        username: "user",
        password: "user",
        token: uniqid(),
        role: "user",
    });

    const [artist1, artist2] = await Artist.create({
        name: "Timur",
        information: "Timur is artist",
        image: "fixtures/dog.jpg",
        published: true,
    }, {
        name: "Serkhan",
        information: "Serkhan is artist",
        image: "fixtures/sad.jpg",
        published: true,
    });

    const [albumTimur, albumSerkhan1, albumSerkhan2] = await Album.create({
        title: "Tracks 1 by Timur",
        artist: artist1['_id'],
        release: "2022-09-28T09:43:14.374Z",
        image: "fixtures/dog.jpg",
        published: true,
    }, {
        title: "Tracks 1 by Serkhan",
        artist: artist2['_id'],
        release: "2022-07-28T09:43:14.374Z",
        published: true,
    }, {
        title: "Tracks 2 by Serkhan",
        artist: artist2['_id'],
        release: "2022-08-28T09:43:14.374Z",
        published: false,
    });

    const [trackTimur1, trackTimur2, trackSerkhan1, trackSerkhan2] = await Track.create({
        title: "Track Timur 1",
        artist: artist1['_id'],
        album: albumTimur['_id'],
        duration: "2:12",
        number: 1,
        youtube: "hUTItsO2dfw",
        published: true,
    }, {
        title: "Track Timur 2",
        artist: artist1['_id'],
        album: albumTimur['_id'],
        duration: "3:25",
        number: 2,
        published: true,
    }, {
        title: "Track Serkhan 1",
        artist: artist2['_id'],
        album: albumSerkhan1['_id'],
        duration: "1:45",
        number: 1,
        youtube: "f2fupOTYgUI",
        published: true,
    }, {
        title: "Track Serkhan 2",
        artist: artist2['_id'],
        album: albumSerkhan1['_id'],
        duration: "4:15",
        number: 2,
        published: true,
    }, {
        title: "Track Serkhan 1",
        artist: artist2['_id'],
        album: albumSerkhan2['_id'],
        duration: "2:21",
        number: 1,
        published: false,
    });

    await TrackHistory.create({
        user: user1['_id'],
        track: trackTimur1,
        datetime: "2022-09-28T09:54:00.355Z",
    }, {
        user: user1['_id'],
        track: trackTimur2,
        datetime: "2022-09-28T09:55:00.355Z",
    }, {
        user: user1['_id'],
        track: trackSerkhan1,
        datetime: "2022-09-28T09:56:00.355Z",
    }, {
        user: user1['_id'],
        track: trackTimur1,
        datetime: "2022-09-28T09:57:00.355Z",
    }, {
        user: user2['_id'],
        track: trackSerkhan2,
        datetime: "2022-09-28T09:51:00.355Z",
    }, {
        user: user2['_id'],
        track: trackTimur2,
        datetime: "2022-09-28T09:54:00.355Z",
    });

    await mongoose.connection.close();
};

run().catch(console.error);