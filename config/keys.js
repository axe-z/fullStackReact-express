
if(process_env.NODE_ENV === 'production') {
  //retourne les cles PROD
  module.exports = require('./prod')
} else {
  //retourne les cles DEV, donc ici on export notre importation. ..
  module.exports = require('./dev')
}



// module.exports = {
//   googleClientID: '755010499514-qcbq7t87s6m7moc9kua3tipbbr9o0kev.apps.googleusercontent.com',
//   googleClientSecret: 'ctqHwz6Kzqw5an4UjQ_goZbS',
//   mongoUriDev: 'mongodb://axe-z:0axe123456z@ds127034.mlab.com:27034/emailpro-axe-z',
//   cookieKey: 'ghweoijgiowe7jmgpwkp78gmmjkgregrecdgg'
// }
//cookiekey est random, mon coude sur le clavier...
//ajouter facebook un jour ...


//mongoUriProd devrait avoir un usename et password different.
