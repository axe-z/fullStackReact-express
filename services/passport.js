const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./../config/keys');

const mongoose = require('mongoose');
const { User } = require('./../models/User.js');

//ici on appele serializeUser , mais comme argument, on lui passe un function
 passport.serializeUser((user, done) => {
   done(null, user.id)
 });

//meme chose ici pour le out.
 passport.deserializeUser((id, done) => {
   User.findById(id)
    .then(user => {
      done(null, user);
    });
 });

/************************************ initialisation de passport ************************************/

//1 version Async awaits
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const userExistant = await User.findOne({ googleId: profile.id });
      if (userExistant) {
        return done(null, userExistant);  /// si on return , pas besoin de else .
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);




//MIDDLEWARE GOOGLE , CE QUI ARRIVE QUAND ON VA SUR LES ROUTES DE AUTH.





/*

version promise

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      //VERIFIER SI IL EXISTE.
      User.findOne({googleId: profile.id})
      .then((userExistant) => {
        if(userExistant) {
          // DONC IL EXISTE
          done(null, userExistant); // premier arg de done est err, 2 ieme on retourne le user.
        } else {
          // IL EXISTE PAS, ON DOIT LE CREER
          new User({googleId: profile.id})
          .save()
          .then(user => done(null, user))  //va envoyer ca a passport.serializeUser avec le user instance
        }
      })
    }
  )
);*/
