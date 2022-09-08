const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});

const Track = model("Track", TrackSchema);

module.exports = Track;