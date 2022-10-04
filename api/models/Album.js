const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');

const {Schema, model} = mongoose;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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
    published: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: String,
});

AlbumSchema.plugin(idValidator, {error: 'Bad ID value for artist'});

AlbumSchema.plugin(uniqueValidator, {error: "An album with that title already exists."});

const Album = model("Album", AlbumSchema);

module.exports = Album;