const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('./../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
   
  // new Strategy => che Zamani new misazim   

passport.use('local.register' , new localStrategy({

    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true

} , (req , email , password , done) => {
    User.findOne({'email' : email} , (err , user) => {
        if (err) { return done(err); }
        if (user) { return done (null , false , req.flash('errors' , ' قبلا همچین کاربری ثبت نام کرده'))}

        const newUser = new User({
            name : req.body.name,
            email,
            password
        });
        newUser.save(err => {
            if(err) return done(err , false , req.flash('errors' ,' ثبت نام با موفقیت انجام نشد . دوباره امتحان کنید'));
            done(null ,newUser);

        })


    });
}));