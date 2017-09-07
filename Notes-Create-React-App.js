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
