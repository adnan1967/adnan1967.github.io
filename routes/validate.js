const express = require('express');
const router = express.Router();

const exam = require('../public/database/mediquest2020.json');
const subjects = Object.keys(exam);

router.post('/', (req, res) => {
    
    let answer = 'wrong';
    
    for (let i = 0; i < 5; i++) {
        let result = req.body.userAns  == exam.Internal_Medicine[0].CorrectAnswers +1;
        if (result) {
            answer = 'correct'; 
        } 
    }
    console.log(req.body)

    res.render('../views/index',{
        title: 'MediQuest',
        authenticatedUser: req.user,
        message: null,
        answer: answer
    });

});

router.get('/', (req, res) => {
    let correctlyAnswered = 0;
    let table = [];
    let tblIndex = 0;
    
    for (let subject of subjects) {
        for (let i = 0; i < exam[subject].length; i++) {
            let correctAnswer = exam[subject][i].CorrectAnswers +1;
            //console.log('exam[subject][i]=',exam[subject][i])
            let answered = Number(req.session.answers[subject][i]);
            let options = exam[subject][i].options;
            console.log(`validate:39 correct answer=${correctAnswer}, answered=${answered} subject=${subject}, qNumb=${i}, options=${options}`);
            if ( correctAnswer == answered) {
                correctlyAnswered++;
            } else {
                table[tblIndex] = {
                    'text': exam[subject][i].text,
                    'answered': options[answered - 1],
                    'correctAnswer': options[correctAnswer -1]
                }
                //console.log(`line:47  table[${tblIndex}]=${table[tblIndex]} `);
                tblIndex++;
            }
        }
        
    }
    console.log(`Your score = ${correctlyAnswered}/210`);
    // for (let i = 0; i < 10;i++) {
    //     console.log(table[i]);
    // }
    
    res.render('parts/templates/result', {
        title: 'MediQuest',
        authenticatedUser: req.user,
        message: null,
        correctlyAnswered: correctlyAnswered,
        tableContent: table
    })
})

module.exports = router;