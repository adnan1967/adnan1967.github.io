const express = require('express');
const router = express.Router();

function isLoggedUser(req, res, next) {
    //Use the “req.isAuthenticated()” function to protect logged in routes, it is a build in function
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}



router.post('/', isLoggedUser, (req, res) => {
    var subject = req.query.subject;
    var qNumb = req.query.qNumb;
    
    console.log("nextQuest.js:5 userAns=", req.body.userAns, "qNumb=", qNumb, " subNumb=", req.query.subNumb," subject=",subject);
    
    let examSession = req.session.answers[subject];
    examSession[qNumb] = req.body.userAns;
    
    console.log('session=', req.session)
    
    res.render('../views/parts/templates/examAria', {
        title: 'MediQuest',
        authenticatedUser: req.user,
        message: null,
        qNumb: Number(req.query.qNumb),
        subNumb: Number(req.query.subNumb)
        
    })
})

module.exports = router;