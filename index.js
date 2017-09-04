const express = require('express');
const app = express(); //on peut avoir plusieurs app.

const port = process.env.PORT || 3000; // Pour Heroku

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //res.send('<h1>Bonjour Express</h1>'); //Content-Type: text/html express le sait , il est bright
  res.send({ ben: 'BENOIT' }); //obj va etre remis en json dnas le browser.{"ben":"BENOIT"}
});

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
