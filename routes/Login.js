const express = require('express');
const passport = require('passport')
const router = express.Router();
const mongoose = require('mongoose');
//const User = require('./user');

mongoose.connect('mongodb://127.0.0.1/DBUsers')
mongoose.connection
    .once('open', () => console.log('connected for login ..'))
    .on('error', (e) => {
        console.log(e.message)
    })

router.post('/', passport.authenticate('local', {// this is a middleware, 'local' means we are using local strategy. If you were using google or facebook to authenticate, it would say ‘google’ or ‘facebook’ instead of ‘local’.
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}))
module.exports = router;