const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ArtistSchema = new Schema({
   name: {
       type: String,
       maxLength: 255,
       minLength: 2,
       required: true,
       unique: true,
   },
    information: String,
    image: String,
});

ArtistSchema.plugin(uniqueValidator, {error: "An artist with that name already exists."});

const Artist = model("Artist", ArtistSchema);

module.exports = Artist;