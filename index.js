//first we need to load our environment variables
if (process.env.NODE_ENV != 'production') { //this means that it is in development, & thus we can import out .env variables
    require('dotenv').config(); // this will load all our environment variables and set them inside process.env.
    
}

const express = require('express')
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const User = require('./routes/user');

const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/DBUsers', { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('connected to users'))
    .on('error', (error) => {
        console.log('Got an error:', error.message)
    });

const bcrypt = require('bcrypt');

const passport = require('passport');
const initializePassport = require('./passportConfig');

initializePassport(
    passport,
    async email => {
        const users = await User.find();
        const result = users.find(user => user.email === email);
        return result;
    },
    async id => {
        let users = await User.find();
        return users.find(user => user.id === id)
    }
);



//defining middlewares
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,// this is a key that we want to keep secret, that will encrypt all our info for us. And we got it from our environment variable, AND this variable is defined in our .env file.
    resave: false, //this means that we don't want to resave our sessions if nothing is changed
    saveUninitialized: false,// this means we don't want to save an empty value in a session
}));
app.use(passport.initialize());
app.use(passport.session());

//defining the template
app.set('view engine', 'ejs');

//getting the questions from the json file
app.locals.exam = require("./public/database/mediquest2020.json");

//setting the routes
const signIn = require('./routes/signin');
const signUp = require('./routes/signup');
const logIn = require('./routes/Login');
const Register = require('./routes/register');
const logOut = require('./routes/logout');
const features = require('./routes/features');
const validate = require('./routes/validate');
const examAria = require('./routes/examAria');
const nextQuest = require('./routes/nextQuest');
const user = require('./routes/user');


app.use('/signin', signIn);
app.use('/signup', signUp);
app.use('/login', logIn);
app.use('/register', Register);
app.use('/logout', logOut);
app.use('/features', features);
app.use('/validate', validate);
app.use('/examAria', examAria);
app.use('/nextquest', nextQuest);

//the home page

app.get('/', (req, res, next) => {
    try {
         res.render('index', {
            title: 'MediQuest',
            authenticatedUser: req.user,
             message: null,
             answer: 'undefined',
             qNumb: 0,
             subNumb: 0
        })
    }catch (e){ console.log(e.message)}
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log('Up and Listening on port: ' + PORT));