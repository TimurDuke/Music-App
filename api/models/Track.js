const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema, model } = mongoose;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
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
    number: {
        type: Number,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
    },
    youtube: String,
});

TrackSchema.plugin(idValidator, {error: 'Bad ID value for album'});

const Track = model("Track", TrackSchema);

module.exports = Track;