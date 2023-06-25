const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./user');
const bcrypt = require('bcrypt');
const passport = require('passport');
localStrategy = require('passport-local').Strategy

mongoose.connect('mongodb://127.0.0.1/DBUsers');
mongoose.connection
    .once('open', () => console.log('connected to register'))
    .on('error', (e) => {
        console.log(e.message)
    });

const newUser = async (email, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
        return done(null, false, { message: 'No user with that email.' }); //here the first param is the error- which is null because it is not a server error. The second is the user, and since here we have no user we placed false.
    }
}


router.post('/', async (req, res, next) => {
   
    let hashedPassword = await bcrypt.hash(req.body.password, 10); //we specify 10 times to generate that hash
    let user = await new User({
        firstName: req.body.name,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });
    console.log(user);
       
    try {
        await user.save();
        console.log('success');
        res.redirect('/signin');
                
    } catch (e) {
        res.render(`parts/templates/signup`, {
            title: 'Mediquest',
            authenticatedUser: req.user,
            message: 'Email already exists'
        })
    }

    res.end();
});

module.exports = router;