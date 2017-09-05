const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express(); //on peut avoir plusieurs app.

const port = process.env.PORT || 3000; // Pour Heroku

///'google' //1
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    // (accessToken) => {
    //   console.log(accessToken); ////4 - RENDU ICI ON A ACCES.
    // }
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken:', accessToken); // retourne le token
      console.log('refreshToken:', refreshToken); // retourne la possibilité de faire revivre un token
      console.log('profile:', profile); //le data
    }
  )
);


//2
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']  //ce qu on veut ceci est un preset,on pourrait demander pour lire les email..
  })
);

/*CE QUI REVIENT:
The redirect URI in the request, http://localhost:3000/auth/google/callback, does not match the ones authorized for the OAuth client. Visit https://console.developers.google.com/apis/credentials/oauthclient/755010499514-qcbq7t87s6m7moc9kua3tipbbr9o0kev.apps.googleusercontent.com?project=755010499514 to update the authorized redirect URIs.

DONC EN GROS, CETTE ADRESSE LA EST PAS AUTORISEE PAR GOOGLE. ON DOIT LE FAIRE DANS LE COMPTE DE L API.
CA SERA SIMPLE DE FAKER UN CLIENT ID DE AIRBNB PAR EXEMPLE, ET DE REVOYER ET PRENDRE L INFO SUR NOTRE SITE SINON.
GOOGLE VERIFIE L ADRESSE REDIRECT_URI POUR CONTRER LE PIRATAGE D INFO.



https://accounts.google.com/o/oauth2/v2/auth?response_type=code&
redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&   <-callbackURL
scope=profile%20email&
client_id=755010499514-qcbq7t87s6m7moc9kua3tipbbr9o0kev.apps.googleusercontent.com
*/

//maintenant google apres choisir son compte va aller la avec le code du user.
//3
app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
