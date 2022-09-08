const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const { Schema, model } = mongoose;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
    release: {
        type: Date,
        required: true,
    },
    image: String,
});

AlbumSchema.plugin(idValidator, {error: 'Bad ID value for artist'});

const Album = model("Album", AlbumSchema);

module.exports = Album;