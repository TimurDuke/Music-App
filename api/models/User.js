const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqid = require("uniqid");

const {Schema, model} = mongoose;

const SALT_WORK_FACTOR = 10;

const usernameValidateUnique = async value => {
    const user = await User.findOne({username: value});

    if (user) return false;
};

const emailValidateUnique = async value => {
    const user = await User.findOne({email: value});

    if (user) {
        return false;
    }
};

const emailPatternValidate = value => {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(value));
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {validator: usernameValidateUnique, message: 'This user is already registered'}
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    email: {
        type: String,
        required: true,
        validate: [
            {validator: emailPatternValidate, message: 'Invalid mail format'},
            {validator: emailValidateUnique, message: 'This user is already registered'},
        ]
    },
    displayName: {
        type: String,
        required: true,
    },
    avatarImage: {
        type: String,
        required: true,
    },
    facebookId: String,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    return this.token = uniqid();
};

const User = model("User", UserSchema);

module.exports = User;