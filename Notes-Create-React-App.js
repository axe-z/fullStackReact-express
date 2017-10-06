///////////////////////////////////////////////////////////////////////////////////////////////
                              ///createur d app react tout inclut/////
///////////////////////////////////////////////////////////////////////////////////////////////


https://github.com/facebookincubator/create-react-app


///////////////////////////////////////////////////////////////////////////////////////////////
                        Si y a une regle de eslint qui gosse...
                              DANS NODE_MODULE - ESLINT - INDEX.JS
                              ensuite si tu trouves, mettre a off ou false..
                              /////
///////////////////////////////////////////////////////////////////////////////////////////////

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


/************************************ ROULER REACT ************************************/

index.js est  le fichier a mettre par defaut.
si jamais on a un probleme et que tout devrait bien aller, seulement detruire package.json.lock et refaire npm install dans le rep CLIENT


import { BrowserRouter, Route } from 'react-router-dom'; BrowserRouter est le cerveau regarde l url et dit ce qui
devrait y etre comme component, Route lui est un component



/************************************ { BrowserRouter, Route } ************************************/
import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';


const App = () => {
 return (
    <div className="App">
       <BrowserRouter>
         <div> {/* doit avoir un wrapper  */}
            <Header /> {/* va etre partout  */}
            <Route exact={true} path="/" component={Landing} /> {/*ou juste exact */}
            <Route exact path="/surveys" component={Dashboard} />   {/*on voit landing si pas EXACT / est dans le chemin  */}
            <Route path="/surveys/new" component={SurveyNew} /> {/*Dashboard est inclut si pas exact a Dashboard */}
         </div>
       </BrowserRouter>
    </div>
  )
};


/************************************ materialize css et Material UI ************************************/
 materialize css: moyen avec react , mais pas pire=>  http://materializecss.com
Material UI complement a materialize, a meme des vrai component React inclut : http://www.material-ui.com/#/
mais tuff a modifier visuellement, css en js ..

install:

npm install materialize-css --save

sur index.js
import 'materialize-css/dist/css/materialize.min.css' // pas de nom , doit mettre l'extention

EN INSTALLANT CREATE REACT APP, ON A MIS EN MOTION UN SETUP WEBPACK PARTICULIER, qui mets le css dans le head .

materialize demande a avoir a la base au moins un className container, sinon tout va coller le bord donc dans App.js :
const App = () => {
 return (
    <div className="container">  <<----- ca
       <BrowserRouter>
    ...
       </BrowserRouter>
    </div>
  )
};



/************************************ Faire le pont entre server et client ************************************/
npm install --save axios redux-thunk

me demande pourquoi il utilise axios et pas fetch ....
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/utilisateur_actuel');

  dispatch({ type: FETCH_USER, payload: res.data });
};


ENCORE LA ON VA AJOUTER A NOTRE PROXY :
"api/*" va gerer tousles call a tous les routes imaginable a partir de api, donc quand on creer des liens, toujours les garder dans le meme domaine /truc/ si possible et fait du sens.

"name": "client",
"version": "0.1.0",
"private": true,
"proxy": {
  "/auth/google": {
    "target": "http://localhost:5000"
  },
  "/api/*": {
    "target": "http://localhost:5000"
  },
},
...



http://redux.js.org/docs/advanced/AsyncFlow.html

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REDUX THUNK /////
///////////////////////////////////////////////////////////////////////////////////////////////

FLOW EST ACTION(obj) A REDUCER A STORE D ORDINAIRE

MAIS AVEC THUNK , CA DEVIENT ACTION A DISPATCH(THUNK prend pas un obj, mais une funcion) AU STORE, ET DU STORE AU REDUCER.

SI ON EST A FAIRE DU ASYN ( COMME UN CALL A UN API ), ON DOIT UTILISER THUNK, ET POUR DECLENCHER THUNK IL FAUT QUE L ACTION CREATOR RETOURNE UN FUNCTION ET NON PAS UN OBJ. ENSUITE CETTE FUNCTION DOIT LAISSER A DISPATCH LE SOIN D ENVOYER L OBJ, QUI CONTIENT MAINTENANT LE DATA DU CALL ASYNC QU ON A FAIT , SOIT AVEC FETCH OU AXIOS.
!!!IMPORTANT, SI AU LIEU DE RETOURNER UN OBJ, POUR UNE ACTION REGULIERE, L ACTION CREATOR RETOURNE UN FUNCTION, REACT-THUNK VA S ENCLENCHER !! ET EN PLUS IL VA PASSER DISPATCH A LA FUNCTION, L AJOUTER.
ENCORE FAUT IL QUE LE THUNK SOIT ACTIVER DANS LE STORE, DANS LES APPLYMIDDLWARE :
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));


DONC LES THUNK ACTIONS , DEVIENNENT DES FUNCTION QUI RETOURNE UNE FUNCTION QUI DISPATCH L OBJ ACTION QUAND IL EST PRET.



avec axios et dispatch (pour thunk ) et a-a
redux thunk : DONC FN QUI RETOURNE UNE FN (POUR ACTIVER THUNK) QUI LUI INJECTE DISPATCH DANS CA , ET DISPATCH ENVOIE L OBJ FINAL.

export const fetchUser = () => async dispatch => { //FN QUI RETOUR.UNe FN,DISPATCH MAINTENANT QUI ARRIVE DE THUNK
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });//ET DISPATCH ENVOIE LE DATA, L OBJ.
};

OU SANS A-A :DONC FN QUI RETOURNE UNE FN (POUR ACTIVER THUNK) QUI LUI INJECTE DISPATCH DANS CA , ET DISPATCH ENVOIE L OBJ FINAL.

export const fetchUser = () =>  {  // FN QUI RETOURNE
  return function (dispatch){   // UN FN, AVEC DISPATCH MAINTENANT QUI ARRIVE DE THUNK
   axios.get('/api/utilisateur_actuel')
   .then(res => dispatch({type: FETCH_USER, payload: res.data })) //ET DISPATCH ENVOIE LE DATA, L OBJ.
  }
};



sinon sans thunk avec a-a NE FONCTIONNERAIT PAS A CAUSE DU ASYNC !!!
export const fetchUser = async () =>  {
  const res = await axios.get('/api/current_user');

  return {
     type: FETCH_USER,
     payload: res.data } ;
};


o n pourrait aller plus loin de le refactor.
export const fetchUser = () => async (dispatch) => { //retourne directement la deuxieme fn
  dispatch({ type: FETCH_USER, payload: await axios.get('/api/utilisateur_actuel').data });
};

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REDUX THUNK /////
///////////////////////////////////////////////////////////////////////////////////////////////




/********************* Partager des variables environement entre back et front  ****************************/

ca fonctionne un peu comme heroku :
EN FAIT ICI ON VA PLUS DIRE , COMMENT CREER UNE SOLUTION, QUI PERMET COMME SUR LE BACK-END DE REGARDER ENTRE DEVELOPMENT ET PRODUCTION ET STOCKER LES KEYS EN QUESTION POUR LE MODE.


1- tous les variable doivent commencer par REACT_APP_
2- elle seront definie sur process.env , COMME SUR LE BACK-END
3-  on va devoir creer SUR LA RACINE CLIENT, des fichiers  .env.production / .env.development

!!!IMPORTANT , REACTE-CREATE-APP , A DEJA LUI MEME DEUX VARIABLE D ENVIROMENT: production ET development EN ENGLISH
DONC ON DOIT APPELER LES NOTRE EN CONSEQUENCE!! .env.dev NE FONCTIONE PAS !! IL FAUT METTRE .env.development OU
 .env.production , CA FONCTIONNE AINSI : process.env.NODE_ENV VA RETOURNER SOIT development OU production ET VA POUR CONSEQUENCE SORTIR NOTRE KEY EN CONSEQUENCE !!!

donc on va faire deux fichier :  .env.production / .env.development

LE PREMIER: .env.development LUI AVEC LA PUBLIC KEY :
pas besoin de wrapper en string la key , mais doit commencer par REACT_APP_
REACT_APP_STRIPE_KEY=pk_test_....

meme chose pour.env.production, dasn ce cas precis, c est la meme key public donc pas de changement.


  DONC MAINTENANT CES 2 KEY SONT DISPO DANS REACT AINSI:

  console.log("NOTRE KEY EST", process.env.REACT_APP_STRIPE_KEY ) //DANS LA CONSOLE ...
  console.log('notre environement actuelle est:', process.env.NODE_ENV) //notre environement actuelle est: development





/************************************ LE BUILD  ************************************/

quand on roule et programme , nous ne somme pas avec les fichier de build , mais ceux de public=>

build contient les fichier clean pour production cependant=>
npm run build
va produire ces fichier.
le projet est construit en assumant que les fichier de build seront mis a la racine=>
si on veut changer ca :
package.json ajouter ca:

 "homepage" : "http://herokuShit/myapp",



un probleme peut survenir quand dans react on va sur /survey, mais que express lui pense qu il y a rien sur cette route la.. donc on doit dire a express que react va s en charger=>

dnas index.js sur server=>


if (process.env.NODE_ENV === 'production'){
  // express va servir les bons fichier, comme main.js ou main.css de build.
  app.use(express.static('client/build'));

  //express va servir index.html si il ne reconnait pas la route. dernier espoir .
  const path = require('path'); //de node
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html'));
  });
}


///comment le pusher,

1-soit qu on pitch le build , ce qui n est pas vu comme standars, sur git hub et faire la meme chose que d hab

2-soit qu on pitch sur heroku, et qu on laisse a heroku le soin de tout faire pour nous, ce qui demande a ce qu on install tout tout sur heroku (webpack et tous les npm) qu on a besoin dans le devellopenment et pas vraiment de besoin pour l app qui roule .

3-pour les entreprise et app serieuse, les CI (continious integration), est un serveur externe, qui va gerer ca , faire des test, creer un branch sur git hub qui push sur heroku automatiquement si tous les test on passé, c est l option serieuse disont. overkill pour nous. circleci.com


ON CONNAIT L OPTION 1, ON VA Y ALLER AVEC LE 2 , PAR HEROKU.


COMMENT FAIRE LES BUILD AVEC HEROKU:
https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process


Customizing the build process
If your app has a build step that you’d like to run when you deploy, you can use a postinstall script in package.json:

"scripts": {
  "start": "node index.js",
  "test": "mocha",
  "postinstall": "ici on va mettre genre npm run build"
}

mais vu qu on a des dependencies :

Or, you may need to build production assets after dependencies are installed.
For Heroku-specific actions, use the heroku-prebuild and heroku-postbuild scripts:
"scripts": {
  "heroku-prebuild": "echo This runs before Heroku installs your dependencies.",
  "heroku-postbuild": "echo This runs afterwards."
}


si on veut installer nos tous les dependencies ( non pas que ceux de production ) sur heroku, on doit lui dire, par defaut c est a true, donc pas les dev dependencies.
heroku config:set NPM_CONFIG_PRODUCTION=false


le seul package.json utilise par heroku est lui server,
--prefix client veut dire dans le rep client .
donc dans celui ci :
{
  "name": "fullstack",
  "version": "1.0.0",
  "description": "Full Stack React Express",
  "main": "build.js",
  "engines": {
    "node": "8.1.3",
    "npm": "5.3.0"
  },
  "scripts": {
    "start": "node index.js",
    "express": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run express\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
...



ensuite on peut pusher a github, avec le rep build de client, non -inclut , heroku va se charger de ca bientot.

ensuite git push heroku master,
pendant le push heroku va tout installer. et meme faire le build.

magique !

heroku open, et l app va y etre avec les fichier build !
le css nest pas dans le header, mais bien dans son fichier <link href="/static/css/main.3b9edbe2.css" rel="stylesheet">

moins complex que prevus.


faire attention d y mettre les .env.development et production .


/************************************ materializecss ************************************/
pour utiliser les icon

ajouter dans index.html de public :
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


 ensuite dans react, c est le mot, le innerhtml qui determine l icon :
 <i className="material-icons">add</i> donne un : +




/************************************ CRA et le state ************************************/

Create-React-App, cra, a un truc babel, qui permet de gerer les State autrement=>

class SurveyNew extends Component {
  //vieille maniere.
  constructor (props){
    super(props)

    this.state= {
      new : false
    }
  }


DEVIENT SIMPLEMENT
class SurveyNew extends Component {

state = { truc: false }; //that's it . pu besoin de constructor.. 
