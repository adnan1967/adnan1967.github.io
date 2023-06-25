const express = require('express');
const passport = require('passport')
const router = express.Router();

router.get('/', (req, res, next) => {
    req.logout((err) => {
       if (err) console.log(err.message);
       res.redirect('/');
    
      console.log('----------> User Logged Out ...');
    });
})

module.exports = router;