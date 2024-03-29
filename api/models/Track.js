const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const {Schema, model} = mongoose;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    youtube: {
        type: String,
        validate: {
            validator: value => {
                if (!!value) {
                    return /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
                        .test(value);
                } else {
                    return true;
                }
            },
            message: 'Url address is entered incorrectly.'
        }
    },
});

TrackSchema.plugin(idValidator, {error: 'Bad ID value for album'});

const Track = model("Track", TrackSchema);

module.exports = Track;