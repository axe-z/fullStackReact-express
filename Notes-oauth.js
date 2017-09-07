///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///Google o-auth authentification/////                          ////
///////////////////////////////////////////////////////////////////////////////////////////////
//POUR ME PROTEGER TOUS LES URLS ON UN MOT SECRET QUI REND LES LIENS NON-FONCTIONNEL. (FU)
//CONSOLE.DEVELOPERS.GOOGLE.COM

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
/*{ id: '10831199082281546274727',
  displayName: 'Benoit Lafrance',
  name: { familyName: 'Lafrance', givenName: 'Benoit' },
  emails: [ { value: 'benoitlafrance3fu5@gmail.com', type: 'account' } ],
  photos: [ { value: 'https://lh3.googleusercontent.com/-LfIxBqeHg2k/AAAAAAAAAAI/AAAAAAAAABI/zhoBloucuiw/photo.jpg?sz=50' } ],
  gender: 'male',
  provider: 'google',
  _raw: '{\n "kind": "plus#person",\n "etag": "\\"Sh4n9u6EtD24TM0RmWv7jTXojqc/B1eaY1FubFRtZmK70rghemzmfRo\\"",\n "gender": "male",\n "emails": [\n  {\n   "value": "benoitlafrance35@gmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "108399212082281546274727",\n "displ
ayName": "Benoit Lafrance",\n "name": {\n  "familyName": "Lafrance",\n  "givenName": "Benoit"\n },\n "url": "https://plus.google.com/108399212082281546274727",\n "image": {\n  "url": "https://lh3.googleusercontent.com/-LfIxBqeHg2k/AAAAAAAAAAI/AAAAAAAAABI/zhoBloucuiw/photo.jpg?sz=50",\n  "isDefa
ult": false\n },\n "isPlusUser": true,\n "language": "fr",\n "circledByCount": 0,\n "verified": false\n}\n',
  _json:
   { kind: 'plus#person',
  ...
*/


/************************************ fichier separes ************************************/
en ce moement on a tout mis sur index.js... sur le serveur express. mieux vaut mettre la logique a part.

///////////// METTRE LES ROUTES PRISES POUR AUTH///////////////////////////////////////
 'routes/authRoutes.js'
const authRoutes = require('./routes/authRoutes');  // est un function donc de module .export
authRoutes(app);
OU
require('./routes/authRoutes')(app);  // est une function donc de module.export;
/*
const passport = require('passport');
//app est de express , donc on veut ramener ca sur le serveur ou y a express.

module.exports = (app) => {   //on passe app , express qui est necessaire.

  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']  //ce qu on veut ceci est un preset,on pourrait demander pour lire les email..
    })
  );
  app.get('/auth/google/callback', passport.authenticate('google'));

}
*/

/////////////INITIALISATION DE AUTH////////////////////////////////////////////////////

'services/passport.js'
require('./services/passport');  //on veut juste que ca roule ... donc pas de const pas d export.







///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///Initialiser Passport - cookie-session /////               ////
///////////////////////////////////////////////////////////////////////////////////////////////

/************************************ utiliser mongo avec passport ************************************/

par defauklt passeport ne gere pas les cookies , il faut ajouter ca.
 on devra utiliser des cookie pour determiner si un user a ou pas acces .
donc premiere chose :

npm install --save cookie-session

dans le server, index.js ajouter:
const cookieSession = require('cookie-session');
const passport = require('passport'); //pour dire a passeport d utiliser ca


///middleware
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //Se compte en milliseconde 30j 24h 60m 60s 1000milisecondes. = 30jours
    keys: [keys.cookieKey]  //ca l air que ca prend un array...
  })
);
app.use(passport.initialize()); //pour activer l utilisation de cookies
app.use(passport.session());  //pour activer l utilisation de cookies





MAINTENANT DANS PASSPORT.JS:
ICI ON APPELE SERIALIZEUSER , MAIS COMME ARGUMENT, ON LUI PASSE UN FUNCTION, IL RECOIT L INSTANCE EN BAS ICI
DANS NEW  GOOGLESTRATEGY
/*
CA :
new User({googleId: profile.id}).save()
.then(user => done(null, user))  //va envoyer ca a passport.serializeUser avec le user instance
}*/
DONC :

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

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
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
);

Y AUR PLUS TARD UN REFONTE EN ASYN AWAITS :
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //VERIFIER SI IL EXISTE.
      const userExistant = await User.findOne({ googleId: profile.id });
      if (userExistant) {
        // DONC IL EXISTE
        done(null, userExistant); // premier arg de done est err, 2 ieme on retourne le user.
      } else {
        // IL EXISTE PAS, ON DOIT LE CREER
        const user = await new User({ googleId: profile.id }).save();
        done(null, user); //va envoyer ca a passport.serializeUser avec le user instance
      }
    }
  )
);

MEME QUE :  // si on return , pas besoin de else .

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
        return done(null, userExistant); /// si on return , pas besoin de else .
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);




/************************************ DERNIER ETAPE  ************************************/

Dans les routes on va en ajouter une , ca pourrait etre n importe ou, on va verifier si on a le user :


  //devrait nous retourner le user loguer.
    app.get('/api/utilisateur_actuel', (req,res) => {
      res.send(req.user);  //user est un obj de passport, qu il ajoute lors de login, pas le model
    });

Et une derniere route pour le logout du user, avec sur req, d autre fn depassport qui s ajoute

  app.get('/api/logout', (req,res) => {
     req.logout() // comme user, passport ajoute des function a req, dont logout... qui hmm logout..
  });



  donc http:localhost:3000/api/utilisateur_actuel oui maintenant sur le res on a le user en cour  {"_id":"59af441cafb6fcafa61752e7","googleId":"108399082281546274727","__v":0}

mais si on va sur '/api/logout' et on retourne sur 'api/utilisateur_actuel' , on aura plus rien , le token est parti !



  *////////////////The end.\\\\\\\\\\\\\\\\\\*




Donc techniquement ici on pourait rapidement ajouter facebook , linkedin , etc...

ajouter un fn dans passport newFacebookStrategy et dans authRoutes.js ajout d un app.get :
app.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['profile', 'email']
  })
);


//////////////plusieurs gmail pour une personne.

note: si un user a plusieurs email GMAIL, il y aura quand meme un seul profile id:
profile:
 { id: 'f10839908228154627u4727' ...

 ce qui est cool.






///////////////////////////////////////////////////////////////////////////////////////////////
                              ///FIN /////
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
   ///EXTRA la securite, avoir des keys separer d un coup qu on se fait voler nos shit et la key locale. donc faire une keys prod et dev
///////////////////////////////////////////////////////////////////////////////////////////////


PROD / DEV

donc tout faire en double=>


refaire un db dans mlbas avec un different user-mot de passe=>

dans CONSOLE.DEVELOPERS.GOOGLE.COM maintenant:
on refait tout la meme chose que cité plus haut :

Origines JavaScript autorisées
 ET
URI de redirection autorisés: ici ca sera different... au lieu de localhost ca sera heroku :

Dans le terminal tuer le serveur et :
heroku open

prendre l adresse :


ORIGINES JAVASCRIPT AUTORISÉES: https://fullstack-axe-z.herokuapp.com

URI DE REDIRECTION AUTORISÉS: https://fullstack-axe-z.herokuapp.com/auth/google/callback

PAS METTRE DE / a la fin !!


KEY.JS :

if(process.env.NODE_ENV === 'production') {
  //retourne les cles PROD
  module.exports = require('./prod')
} else {
  //retourne les cles DEV, donc ici on export notre importation. ..
  module.exports = require('./dev')
}

DEV.JS, VA PRENDRE LES CLEF DEV QU ON AVAIT AVANT DANS KEYS.JS


ET PROD.JS, ON VA FAIRE AUTREMENT POUR ASSURER QUE SI ON SE FAIT VOLER...
///PRODUCTION
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret:  process.env.GOOGLE_CLIENT_SECRET,
  mongoUri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
}



ON VA MAINTENANT UPLOADER CES FICHIERS (KEYS ET PROD) SUR GITHUB ET HEROOKU , HEROKU EN A DE BESOIN !!!
Donc dans .gitignore config/dev.js est le seul qu on evite.


/************************************ ajuster les variable dasn heroku  ************************************/

1- aller sur heroku.com
2- choisir la bonne app, et aller dans settings
3- Config Variables: reveal Config Vars , click
4- entre les key / value de GOOGLE_CLIENT_ID ,  GOOGLE_CLIENT_SECRET, MONGO_URI et COOKIE_KEY
5- faire add a chaque fois.



Maintenant on push a git et heroku

on ouvre l app sur heroku
et on va tenter simplement de se logguer :
https://fullstack-axe-z.herokuapp.com/auth/google  , comme on faisait avant .



on aura :

Error: redirect_uri_mismatch

The redirect URI in the request, http://fullstack-axe-z.herokuapp.com/auth/google/callback, does not match the ones authorized for the OAuth client. Visit https://console.developers.google.com/apis/credentials/oauthclient/166152619192-v3hjm8tso1g1uui7hp68bm4767cf0h29.apps.googleusercontent.com?project=166152619192 to update the authorized redirect URIs.


A cause du HTTPS qui est necessaire quand on est pas a localhost(pour arranger :

 le probleme se creer dans passport.js et specifiquement

 new GoogleStrategy(
   {
     clientID: keys.googleClientID,
     clientSecret: keys.googleClientSecret,
     callbackURL: '/auth/google/callback' // <- lala

  ON UTILISE UN PATH RELATIF, ET LUI FAIT CE QU IL VEUT AU LIEU DE CE QU IL FAUT :
  LA RAISON EST CELLE CI :  PARCE QUE ENTRE LE BROWSER ET LE DATA IL Y A UN PROXY D HEROKU, ET OU IL Y A UN PROXY , C EST JUGER PAS SAFE...   MAINTENANT, SOIT QU ON TRUST OU PAS HEROKU, NOTRE APP EST SUR HEROKU, DONC ON VA LE TRUSTER PEUT-IMPORTE...

  DONC LA SOLUTION OU LES SOLUTIONS : ON POURRAIT S AJOUTER DES KEYS AVEC L ADRESSE COMPLET DANS PROD OU DEV
  MAIS Y A UNE AUTRE OPTION QUI EST D AJOUTER :


  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true             // <- ca ca


Refaire les push Git hub et heroku, et voila ca marche !!


https://fullstack-axe-z.herokuapp.com/auth/google  selectionne le compte , ensuite :
https://fullstack-axe-z.herokuapp.com/api/utilisateur_actuel === {"_id":"59b0864ba28749001266a6fa","googleId":"108399082281546274727","__v":0}


Une fois fait , good job !
le reste va se passer dans le script de package, si on lance avec prod ou dev.






 SI ON ROULE AVEC CREATE-REACT-APP ET 2 SERVEURS  :
 note il se peut, pas dnas notre config proxy qui est decrite plus bas , d avoir des troubles avec les cookie, quand on passe de localhost 3000 et 5000 , l echange est vu par le browser comme si on sautait de site. mais le setup actuel evite ca.
 ///////////////////////////////////////////////////////////////////////////////////////////////
                               ///createur d app react tout inclut/////
 ///////////////////////////////////////////////////////////////////////////////////////////////


 https://github.com/facebookincubator/create-react-app

 sudo npm install -g create-react-app

 CECI INSTALL UN PROGRAM QUI PERMET DE CREER LE KIT COMPLET DE DEV.
 PU VRAIMENT BESOIN DE REFAIRE CA...


 DANS LE REP DE SON CHOIX, MOI JE LE MET A LA RACINE , DANS LE TERMINAL TAPER :
  create-react-app nomquonveut, donc ici create-react-app client


 laisser s installer, au nouveau Rep apparait : CLIENT

 CE QUE C\'EST':
 DANS CLIENT IL Y A MAINTENANT SON PROPRE
 NODE-MODULES,
 PUBLIC
 SRC
 PACKAGE.JSON
 .GITIGNORE
 ET UN README.



 /************************************ Partir l app ************************************/
 IL SUFFIT DANS LE TERMINAL D ALLER DANS:

 1- cd client
 2- npm run start
 3- ca roule sur le port 3000 par defaut,
 4- tous les script sont dans le node_module de client , sous react-scripts
 5- On peut les modifier.


 6- dans src/app.js y a le react qui roule sur le port:3000
 7- toues les changement se font des qu on save, par-fucking-fait.



 ///////////////////////////////////////////////////////////////////////////////////////////////
     SI EXPRESS:  Donc quand on roule express, on se retrouve avec deux serveurs (5000 | 3000)!! shit
 ///////////////////////////////////////////////////////////////////////////////////////////////

 ///////////////////////////////////////////////////////////////////////////////////////////////
                               ////Comment faire rouler Ensemble////
 ///////////////////////////////////////////////////////////////////////////////////////////////

 On peut toujours utiliser 2 fenetre terminal... mais avec CONCURRENTLY, un plugin on peut joindre et avoir qu un call a faire, c est plus simple et clean :

 npm install --save concurrently

 "scripts": {
   "start": "node index.js", //pour heroku
   "express": "nodemon index.js",  //pour server
   "client": "npm run start --prefix client", //pour le start mais du front end
   "dev": "concurrently \"npm run express\" \"npm run client\"", //pour tout partir d un coup
   ...

 NPM RUN DEV:

 DONC MAINTENANT :
 NPM RUN DEV VA PARTIR LES DEUX - SERVER ET CLIENT -
 EN MEME TEMPS DANS LA MEME FENETRE ET DONNER LES RESULTATS DES DEUX.

 Exemple d output terminal :
 [1] === client [0] === server

 [1] Compiled successfully!
 [0] connection reussi...
 [1] Compiling...
 [0] [nodemon] restarting due to changes...
 [0] [nodemon] starting `node index.js`
 [0] ca roule sur 5000


  /**************** ****comment en gardant les path relatif pointer la bonne chose  **************************/
   /**************** ****comment en gardant les path relatif pointer la bonne chose  **************************/
    /**************** ****comment en gardant les path relatif pointer la bonne chose  **************************/

 Donc react roule sur 3000 et express sur 5000 , comment si on fait un lien dnas react sur 3000 , aller sur les pages de 5000 .
 EN ENTRANT LE PATH COMPLET
 de 3000 a 5000
   <a href="http://localhost:5000/auth/google">Pour continuer</a>

 MAIS LE TROUBLE SE POURSUIT ET CE LIEN NE FONCTIONNERA PAS SUR LE SITE DE PRODUCTION


 POUR ARRANGER CA POUR LES DEVELOPMENT:
 si on veut que ca fonctionne:
 <a href="/auth/google">Pour continuer</a>

 il faut aller sur le package.json du CLIENT (REACT)
 et ajouter :

 "version": "0.1.0",
 "private": true,
 "proxy": {            //UN PROXY
   "/auth/google": {
     "target": "http://localhost:5000"
   }
 },


 Maintenant ceci regle AUSSI sur la portion PRODUCTION !
 la version production applatie tout , et le bundle va comprendre que /auth/google, veut dire de rester sur le site en question, puisqu il regarde un path relatif, donc 3000 et 5000 disparait, voila tout

 ca reste mieux que d avoir a faire des if(process.env === dev) else...

 /**************** ****comment en gardant les path relatif pointer la bonne chose  **************************/
  /**************** ****comment en gardant les path relatif pointer la bonne chose  **************************/
   /**************** ****comment en gardant les path relatif pointer la bonne chose  **************************/
