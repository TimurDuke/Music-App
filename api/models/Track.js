const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

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

TrackSchema.plugin(idValidator, {error: 'Bad ID value for album'});
const Track = model("Track", TrackSchema);

module.exports = Track;