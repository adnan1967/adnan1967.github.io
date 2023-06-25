const express = require('express');
const router = express.Router();


router.get('/', (req, res) => { 
    res.render('parts/templates/features.ejs', {
        title: 'Mediquest',
        authenticatedUser: req.user,
        message: null
    });
});

module.exports = router;