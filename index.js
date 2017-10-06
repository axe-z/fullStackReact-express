////SERVER
const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./services/passport'); //on veut juste que ca roule QUAND BESOIN ... donc pas de const pas d export.

const { User } = require('./models/User');
const { Survey } = require('./models/Survey');

const app = express(); //PARTIR EXPRESS.

app.use(bodyParser.json()); //middleware .json() bodyParser

///passport
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //Se compte en milliseconde 30j 24h 60m 60s 1000milisecondes. = 30jours
    keys: [keys.cookieKey]  //ca l air que ca prend un array...
  })
);
app.use(passport.initialize()); //pour activer l utilisation de cookies
app.use(passport.session());  //pour activer l utilisation de cookies

///LES ROUTES LOGIN GOOGLE AUTH // est une function donc de module.export qui demande express pour faire des app.get..;
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
 require('./routes/surveyRoutes')(app);


//conection mongoose emailpro-axe-z
// const { User } = require('./models/User');
// require('./models/Survey');



mongoose.Promise = global.Promise;

mongoose
  .connect(keys.mongoUri, {
    useMongoClient: true
  })
  .then(con => {
    console.log('connection reussi...' );
  })
  .catch(err => {
    console.log(err);
  });



if (process.env.NODE_ENV === 'production'){
  // express va servir les bons fichier, comme main.js ou main.css de build.
  app.use(express.static('client/build'));

  //express va servir index.html si il ne reconnait pas la route. dernier espoir .
  const path = require('path'); //de node
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build' , 'index.html'));
  });
}







/************************************ LISTEN ************************************/
const port = process.env.PORT || 5000; // POUR HEROKU

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
