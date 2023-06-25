const bcrypt = require('bcrypt');

localStrategy = require('passport-local').Strategy //this is going to be our local strategy

function initialize(passport, getUserByEmail) {
    
    const  authenticateUser = async(email, password , done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: 'No user with that email.'}); //here the first param is the error- which is null because it is not a server error. The second is the user, and since here we have no user we placed false.
        }

        try {
            
            let pass = await bcrypt.compare(password, user.password);
            if (pass) {
                let auth = user.firstName + ' ' + user.lastName;
                
                return done(null, auth); //successfull login
            } else { // user data is wrong
                return done(null, false, { message: 'Password incorrect.' });
            }
        } catch (e) {
            done(e);
        }
    }
    passport.use(new localStrategy({ usernameField: 'email' },
        authenticateUser));
    passport.serializeUser((user, done) => { //this will serialize our user to store it in a session
        //return done(null, user.id); 
        //console.log(`serialize user: ${user}`)
        return done(null, user)
    }) 
    passport.deserializeUser((user, done) => {// this is the opposit of the above function
        //return done(null, getUserById(id));
        return done(null, user)
    })
}

module.exports = initialize;