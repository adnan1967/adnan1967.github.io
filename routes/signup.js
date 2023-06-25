const express = require('express');
const router = express.Router();

function isLoggedUser(req, res, next) {
    //Use the “req.isAuthenticated()” function to protect logged in routes, it is a build in function
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}

router.get('/', isLoggedUser, (req, res) => { //here the '/' represents the '/register' route
    res.render('parts/templates/signup.ejs', {
        title: 'Mediquest',
        authenticatedUser: req.user, 
        message: null
    });
});

module.exports = router;