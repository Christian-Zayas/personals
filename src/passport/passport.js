const passport = require('passport');
const { User } = require('../models/modelsindex');
const LocalStrategy = require('passport-local').Strategy;

passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField:  'password'  
} , async (email , password , done) => {
        const user = await User.findOne({email})
        
        if (!user) {
           return done(null , false , { message: 'Not user Found'});
        }else{
            // Math password users
         const match = await user.matchPassword(password);
         if(match)  {
             return done(null , user);
         }else {
             return done(null , false , { message:  'Incorrect password'});
         }
        }

}))


passport.serializeUser((user , done) => {
    done(null , user.id);
})

passport.deserializeUser( async ( id , done) =>{
    await User.findById(id , (err , user) => {
         done(err , user)
     })
})