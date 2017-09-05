///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///Google o-auth authentification/////                          ////
///////////////////////////////////////////////////////////////////////////////////////////////
//POUR ME PROTEGER TOUS LES URLS ON UN MOT SECRET QUI REND LES LIENS NON-FONCTIONNEL. (FU)

"passport": "^0.4.0",
"passport-google-oauth20": "^1.0.0",

deriere Y a express :
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

********VOIR IMAGE DANS CONFIG/DIAGRAM GOOGLE-STRATEGY.png , ELLE EXPLIQUE LE CHEMIN

passport.use(new GoogleStrategy()); //instance


///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///ajouter l api.... tufff/////                               ////
///////////////////////////////////////////////////////////////////////////////////////////////
COMME POUR YOUTUBE, OU GOOGLEMAPS, IL FAUT ENREGISTRER UN API.

ALLER A CONSOLE.DEVELOPERS.GOOGLE.COM , ce qui amene dans notre compte google

ON DOIT CREER UN NOUVEAU PROJET: A COTE DU LOGO EN HAUT GAUCHE DE GOOGLE APIs, ALLER AU DROPDOWN ET FAIRE LE PLUS
POUR AJOUTER : EMAILY.DEV ... ATTENDRE QU IL SOIT FAIT , ENSUITE S ASSURER D ALLER DASN CE PROJET VIDE POUR L INSTANT.
On doit ajouter un api pour le oauth ... mais ca existe pas !! il faut ajouter pour ce faire google+ , et ENsuite on verra Accès aux données utilisateur avec OAuth 2.0 ..... pas facile !!!  en haut faire activer

faire des credential

cliquer sur le bouton bleu : Creer des identifiants ... et choisir ID CLIENT OAUTH

on verra :
Pour créer un ID client OAuth, vous devez d\'abord définir un nom de produit sur l\'écran d'autorisation .

faut cliquer sur Configuer l ecran d authorisation
y mettre seulement pour l instant le product name , et saver

ensuite choisir application-web
et pour nom : Client Web 1 est ok

les restrictions :

Origines JavaScript autorisées:
http://localhost:3000

URI de redirection autorisés:
//http://localhost:3000/*   Maintenant ceci fera un message d erreur qu on repare apres...
http://localhost:3000/auth/google      est le bon a mettre

cliquer sur CREER :

Voici votre ID client ( varesembler a ca .... ceci est un faux numero):
vdsvdsvdsv499514-qcbq7tfuckYouvua3tipbbr9o0kev.apps.googleusercontent.com
Voici votre code secret client
ctqfuckYouvdsv4e2goGREbS


Il est important que ces cles reste secretes !!!  il faudra eviter github ou autre...
donc on se met ca dans un folder. et l ajouter au .gitignore


VOICI LA CONFIG POUR COMMENCER .... ON Y REVIENDRA



///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///ajouter l api.... LA SUITE /////                 ////
///////////////////////////////////////////////////////////////////////////////////////////////

Dans le index.js

donc pour passport :
const keys = require('./config/keys');

///'google'
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken) => {
      console.log(accessToken);  //RENDU ICI ON A ACCES.
    }
  )
);

//app.use(express.static(__dirname + '/public'));
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']  //ce qu on veut ceci est un preset,on pourrait demander pour lire les email..
  })
);

SI ON TENTE http://localhost:3000/auth/google AVEC LE URI de redirection autorisés MAL FAIT : localhost:3000/*

/*CE QUI REVIENT:
The redirect URI in the request, http://localhost:3000/auth/google/callback, does not match the ones authorized for the OAuth client.

DONC EN GROS, CETTE ADRESSE LA EST PAS AUTORISEE PAR GOOGLE. ON DOIT LE FAIRE DANS LE COMPTE DE L API.
CA SERA SIMPLE DE FAKER UN CLIENT ID DE AIRBNB PAR EXEMPLE, ET DE REVOYER ET PRENDRE L INFO SUR NOTRE SITE SINON.
GOOGLE VERIFIE L ADRESSE REDIRECT_URI POUR CONTRER LE PIRATAGE D INFO.

https://accounts.google.com/o/oauth2/v2/auth?response_type=code&
redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&   <-callbackURL
scope=profile%20email&
client_id=755010499514-qcbq7t87s6m7moc9kua3tipbbr9o0kev.apps.googleusercontent.com

*/

DONC ALLER A L ADRESSE OFFERTE GENRE :
https://console.developers.google.com/apis/credentials/oauthclient/755010499514-qcbq7t87sFUCKYOUua3tipbbr9o0kev.apps.googleusercontent.com?project=755010499514

CE QUI NOUS RAMENE DANS LE SETUP Origines JavaScript autorisées ET URI de redirection autorisés
METTRE :
URI de redirection autorisés:
http://localhost:3000/auth/google/callback  AU LIEU DE /*


Attendre 2 min.
ensuite tenter http://localhost:3000/auth/google
maintenant au lieu d un message d erreur , on aura l offre de s authentifier.


ON CLICK SUR MON COMPTE GMAIL, CA IRA A : Cannot GET /auth/google/callback
PARCE QU ON GERE PAS LA REPONSE POUR L INSTANT DANS EXPRESS...

URL:
http://localhost:3000/auth/google/callback?code=4/5PMGjAePe1zaRdt_fuckYOU0f6IAwCJzAW_IYBd-kjs# <- CODE COOL.



MAINTENANT GOOGLE APRES CHOISIR SON COMPTE VA ALLER LA AVEC LE CODE DU USER.
 on le redonne a passport qui voit que c 'est le retour de google APRES l authentification'
app.get('/auth/google/callback', passport.authenticate('google'));


ON RECOIT LE TOKEN DANS LE TERMINAL ET CA GELE LA ... PARCE QUE ON LE LAISSE EN CONSOLE.LOG POUR L INSTANT

passport.use(
  new GoogleStrategy(...
(accessToken) => {
  console.log(accessToken); //RENDU ICI ON A ACCES AUX INFOS.  //ya29.Glu9BNe2FfuckYOU4EGAEgfiWB5FrYychfvnN75LNpzX9fuckYOUG-jyc3b38xgpA6caHzgH_3fuckYOUddxwMairEdj7L8WRp3fQGBc0qdGcfuckYOU0MkCE5dd
}

CA PEUT SEMBLER ETRANGE COMME FLOW...

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
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile:', profile);
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


/************************************ LE ACCESSTOKEN  ************************************/
C'EST COMME LA VIE, L EAU ET L AIR, C EST LA REPONSE A NOS PROBLEME. C EST LA VICTOIRE'.
Y a bcp plus que le token de dispo, maintenant on regarde ...
donc on refait le chemin et logue avec mon compte gmail=>

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    // (accessToken) => {
    //   console.log(accessToken); //RENDU ICI ON A ACCES.
    // }
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile:', profile);
    }
  )
);


garder le accestoken est important bien qu on ne l utilisera pas tellement ( on va saver tout suite), c est une preuve qu on a pour google que cette personne nous a deja donné acces par le passé, le token va mourir a un certain point de la le besoin d un refreshtoken.

le refreshToken : permet de refaire un token un fois le premier mort.

le profile, la y a tout ce qu on a demandé : scope: ['profile', 'email'] , on aurait comme je disais pu demander la liste des amis, et meme de fucking lire les emails...

BAM !!! :
accessToken:   ya29.Glu9BIA-XAVawCHE3Xyt2dPF6MJ9G30JD8CJhMoWowoG_JE8Gp0IzqAnfoowK1g8ulrhbn55Vj6yTulBPkZEp1gIoLGFQxk7DDmdoQYxefdQtiQ6Hbjm_zD1LGbZ

refreshToken: undefined

profile:
/*{ id: '108399082281546274727',
  displayName: 'Benoit Lafrance',
  name: { familyName: 'Lafrance', givenName: 'Benoit' },
  emails: [ { value: 'benoitlafrance35@gmail.com', type: 'account' } ],
  photos: [ { value: 'https://lh3.googleusercontent.com/-LfIxBqeHg2k/AAAAAAAAAAI/AAAAAAAAABI/zhoBloucuiw/photo.jpg?sz=50' } ],
  gender: 'male',
  provider: 'google',
  _raw: '{\n "kind": "plus#person",\n "etag": "\\"Sh4n9u6EtD24TM0RmWv7jTXojqc/B1eaY1FubFRtZmK70rghemzmfRo\\"",\n "gender": "male",\n "emails": [\n  {\n   "value": "benoitlafrance35@gmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "108399082281546274727",\n "displ
ayName": "Benoit Lafrance",\n "name": {\n  "familyName": "Lafrance",\n  "givenName": "Benoit"\n },\n "url": "https://plus.google.com/108399082281546274727",\n "image": {\n  "url": "https://lh3.googleusercontent.com/-LfIxBqeHg2k/AAAAAAAAAAI/AAAAAAAAABI/zhoBloucuiw/photo.jpg?sz=50",\n  "isDefa
ult": false\n },\n "isPlusUser": true,\n "language": "fr",\n "circledByCount": 0,\n "verified": false\n}\n',
  _json:
   { kind: 'plus#person',
     etag: '"Sh4n9u6EtD24TM0RmWv7jTXojqc/B1eaY1FubFRtZmK70rghemzmfRo"',
     gender: 'male',
     emails: [ [Object] ],
     objectType: 'person',
     id: '108399082281546274727',
     displayName: 'Benoit Lafrance',
     name: { familyName: 'Lafrance', givenName: 'Benoit' },
     url: 'https://plus.google.com/108399082281546274727',
     image:
      { url: 'https://lh3.googleusercontent.com/-LfIxBqeHg2k/AAAAAAAAAAI/AAAAAAAAABI/zhoBloucuiw/photo.jpg?sz=50',
        isDefault: false },
     isPlusUser: true,
     language: 'fr',
     circledByCount: 0,
     verified: false } }
*/


/************************************ fichier complet ************************************/
DONC EN GROS POUR PASSPORT C EST CA :
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
