
const keys = require('../config/keys');
//console.log('cle', keys.StripeSecure) works..
//const stripe = require('stripe')(keys.StripeSecure);  //on lui deonne la secretkey
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin= require('../middlewares/requireLogin'); //middleware qu on a fait qui verifie si user ou pas.

module.exports = app => {
  app.post('/api/stripe', requireLogin , async (req, res) => {
      // console.log(req.body); // on recoit un obj token bien parser.
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 pour 5 crédits',
      source: req.body.id
    });
    //console.log(charge); // on recoit un charge bien parser.
    //console.log(req.user) //on a acces au user .

      req.user.credits += 5;
      const user = await req.user.save();
      //console.log(user.credits) //5 ensuite 10 si on refait
      res.send(user)
  });
};


 
