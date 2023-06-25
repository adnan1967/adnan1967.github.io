const express = require('express');
const router = express.Router();

var exam = require('../public/database/mediquest2020.json');
var subjects = Object.keys(exam);

for (let sub of subjects) {
    console.log(sub, 'length=',exam[sub].length)
}

var answers = {};
for (let sub of subjects) {
   answers[sub] = [];
}
//console.log('examAria:10 answers=',answers)

router.get('/', (req, res) => {
    req.session.answers = answers;
    res.render('../views/parts/templates/examAria', {
        title: 'MediQuest',
        authenticatedUser: req.user,
        message: null,
        answer: 'undefined',
        
    })
})


module.exports = router;