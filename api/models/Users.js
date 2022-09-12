const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema, model } = mongoose;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

const User = model("User", UserSchema);

module.exports = User;