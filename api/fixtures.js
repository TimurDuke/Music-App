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
        displayName: "Admin",
        avatarImage: "fixtures/admin.jpg",
        password: "admin",
        token: uniqid(),
        role: "admin",
    }, {
        username: "user",
        displayName: "User",
        avatarImage: "fixtures/user.jpg",
        password: "user",
        token: uniqid(),
        role: "user",
    });

    const [artist1, artist2] = await Artist.create({
        name: "Timur",
        information: "Timur is artist",
        image: "fixtures/dog.jpg",
        published: true,
        user: user1['_id'],
    }, {
        name: "Serkhan",
        information: "Serkhan is artist",
        image: "fixtures/sad.jpg",
        published: true,
        user: user2['_id'],
    });

    const [albumTimur, albumSerkhan1] = await Album.create({
        title: "Tracks 1 by Timur",
        artist: artist1['_id'],
        release: "2022-09-28T09:43:14.374Z",
        image: "fixtures/dog.jpg",
        published: true,
        user: user1['_id'],
    }, {
        title: "Tracks 1 by Serkhan",
        artist: artist2['_id'],
        release: "2022-07-28T09:43:14.374Z",
        published: true,
        user: user2['_id'],
    }, {
        title: "Tracks 2 by Serkhan",
        artist: artist2['_id'],
        release: "2022-08-28T09:43:14.374Z",
        published: false,
        user: user2['_id'],
    });

    const [trackTimur1, trackSerkhan1] = await Track.create({
        title: "Track Timur 1",
        artist: artist1['_id'],
        album: albumTimur['_id'],
        duration: "2:12",
        number: 1,
        youtube: "https://www.youtube.com/watch?v=hUTItsO2dfw",
        published: true,
        user: user1['_id'],
    }, {
        title: "Track Serkhan 1",
        artist: artist2['_id'],
        album: albumSerkhan1['_id'],
        duration: "1:45",
        number: 1,
        youtube: "https://www.youtube.com/watch?v=f2fupOTYgUI",
        published: true,
        user: user2['_id'],
    }, {
        title: "Track Serkhan 2",
        artist: artist2['_id'],
        album: albumSerkhan1['_id'],
        duration: "4:15",
        number: 2,
        published: false,
        user: user2['_id'],
    }, {
        title: "Track Timur 2",
        artist: artist1['_id'],
        album: albumTimur['_id'],
        duration: "3:25",
        number: 2,
        published: false,
        user: user1['_id'],
    });

    await TrackHistory.create({
        user: user1['_id'],
        track: trackTimur1,
        datetime: "2022-09-28T09:54:00.355Z",
    }, {
        user: user1['_id'],
        track: trackTimur1,
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
        track: trackSerkhan1,
        datetime: "2022-09-28T09:51:00.355Z",
    }, {
        user: user2['_id'],
        track: trackSerkhan1,
        datetime: "2022-09-28T09:54:00.355Z",
    });

    await mongoose.connection.close();
};

run().catch(console.error);