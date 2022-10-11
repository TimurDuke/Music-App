const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/music',
        options: {useNewUrlParser: true},
    },
    fb: {
        appId: '1104678347083775',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    }
};