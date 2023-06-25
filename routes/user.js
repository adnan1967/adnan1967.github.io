const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
    },
    createDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }

});

module.exports = mongoose.model('Users', userShcema);