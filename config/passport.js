const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require("../model/user");

console.log("Passport Js is executing");

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
},(email,password,done)=>{
    User.findOne({email,password},(err,user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false);
        }
        done(null,user);
    })
    // console.log(email,password);
}));

passport.serializeUser((user,done)=>{
    console.log("In Serialize User");
    done(null,user._id);
});

passport.deserializeUser((userId,done)=>{
    console.log("In deserialized user");
    // console.log(userId);
    User.findById(userId)
    .then(result=>{
        // console.log(result);
        done(null,result);
    })
    .catch(err=>{
        console.log(err);
        done(err);
    })
})



module.exports = passport;