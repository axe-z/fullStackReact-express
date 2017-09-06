const passport = require('passport');
//app est de express , donc on veut ramener ca sur le serveur ou y a express.

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get('/auth/google/callback', passport.authenticate('google'));

 // comme user, passport ajoute des function a req, dont logout... qui hmm logout..
 app.get('/api/logout', (req, res) => {
   req.logout();
   res.redirect('/');
 });


  //devrait nous retourner le user loguer.
    app.get('/api/utilisateur_actuel', (req,res) => {
      res.send(req.user);  //user est un obj de passport, qu il ajoute lors de login
    });
};








/************************************ Routes prise par passport ************************************/

//2
// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']  //ce qu on veut ceci est un preset,on pourrait demander pour lire les email..
//   })
// );
//
// /*CE QUI REVIENT:
// The redirect URI in the request, http://localhost:3000/auth/google/callback, does not match the ones authorized for the OAuth client. Visit https://console.developers.google.com/apis/credentials/oauthclient/755010499514-qcbq7t87s6m7moc9kua3tipbbr9o0kev.apps.googleusercontent.com?project=755010499514 to update the authorized redirect URIs.
//
// DONC EN GROS, CETTE ADRESSE LA EST PAS AUTORISEE PAR GOOGLE. ON DOIT LE FAIRE DANS LE COMPTE DE L API.
// CA SERA SIMPLE DE FAKER UN CLIENT ID DE AIRBNB PAR EXEMPLE, ET DE REVOYER ET PRENDRE L INFO SUR NOTRE SITE SINON.
// GOOGLE VERIFIE L ADRESSE REDIRECT_URI POUR CONTRER LE PIRATAGE D INFO.
//
//
//
// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&   <-callbackURL
// scope=profile%20email&
// client_id=755010499514-qcbq7t87s6m7moc9kua3tipbbr9o0kev.apps.googleusercontent.com
// */
//
// //maintenant google apres choisir son compte va aller la avec le code du user.
// //3
// app.get('/auth/google/callback', passport.authenticate('google'));
