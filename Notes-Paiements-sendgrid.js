///////////////////////////////////////////////////////////////////////////////////////////////
                              ///faire du paiement avec STRIPE/////
///////////////////////////////////////////////////////////////////////////////////////////////

            xxxxxxxxxxxxxxxxxxxxxx
            x                    x
            x  Nom               x
            x  x x x x x x       x
            x                    x
            x                    x
            x  num de carte      x
            x   x x x x x x      x
            x                    x
            x                    x
            x            envoyer x
            xxxxxxxxxxxxxxxxxxxxxx

regle de base :
  - on est pas bon en securite
  - Ne jamais garder le num de carte
  - toujours utiliser un processor externe de paiement (pour la securité... STRIPE )
  -tenter d eviter les paiements par mois, ca evite d avoir a ajuster les montant si changement de plans.
  - possible d eviter les montant a payer ?
  - Fraude et retours et changement de plans, c est de la marde.
  - si montant par mois, utiliser recurly ( add-on ).


STRIPE S''INSTALLE SUR LE FRONT-END  MAIS FONCTIONNE AVEC LE BACK-END .


login de stipe avec info@a,
ceci nous donne acces a des dummy carte de credit pour tester=>
https://stripe.com/docs/dashboard

/************************************ variable.. ************************************/
pour activer pour VRAI , activate you account sur le cote, mais on veut pas ca pour le moment du tout ...


1- API , cote gauche du dashboard
2- y a 2 key: une pk_45615..... , qu on peut publisher est pour le front-end, la secret, absolument pas! En fait le front -end n a suelemnt de besoin que de la publisher/public key.

pour la form a l ecran
3- STRIPE CHECKOUT, est un addon qu on va utiliser, mais avec react, on va utiliser autre chose ... https://stripe.com/checkout?locale=fr


 STRIPE AVEC REACT :
https://github.com/azmenak/react-stripe-checkout

est un component, et Strip est fait pour les dummy qui roule Jquery seulement ,
avec ce component ca rend la tache bcp bcp plus facile.


donc sur le front-end :
 npm install --save react-stripe-checkout


LE BACK END :

ajouter les key dans config, dev et prod s assurer que tout est beau pour dev dans le .gitignore, ainsi ensuite sur heroku :
heroku dnas les settings de l app. reveal app variable, ajouter STRIPE_PUBLIC et le num et le STRIPE_SECURE aussi.


IMPORTANT :
parce que notre front-end est en ES6-7 , les require statement du serveur , qui regarde si on est en dev ou en production vont chier a cause du common.js (require).
Create-react-app a cependant une solution pour partager les keys entre le back et le front.
ceci dit le front a juste de besoin de la Public key:



https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

1- tous les variable doivent commencer par REACT_APP_
2- elle seront definie sur process.env , COMME SUR LE BACK-END
3-  on va devoir creer SUR LA RACINE CLIENT, des fichiers  .env.production / .env.development

!!!IMPORTANT , REACTE-CREATE-APP , A DEJA LUI MEME DEUX VARIABLE D ENVIROMENT: production ET development EN ENGLISH
DONC ON DOIT APPELER LES NOTRE EN CONSEQUENCE!! .env.dev NE FONCTIONE PAS !! IL FAUT METTRE .env.development OU
 .env.production , CA FONCTIONNE AINSI : process.env.NODE_ENV VA RETOURNER SOIT development OU production ET VA POUR CONSEQUENCE SORTIR NOTRE KEY EN CONSEQUENCE !!!

donc on va faire deux fichier :  .env.production / .env.development

LE PREMIER: .env.development LUI AVEC LA PUBLIC KEY :
pas besoin de wrapper en string la key , mais doit commencer par REACT_APP_
REACT_APP_STRIPE_KEY=pk_test_Q7JbjhlJnsnjAn56gT5ZdK8q

meme chose pour.env.production, dasn ce cas precis, c est la meme key public donc pas de changement.

!!!IMPORTANT, IL DOIVENT ETRE DISPO POUR GITHUB OU HEROKU, SINON CA VA CHIER.

  DONC MAINTENANT CES 2 KEY SONT DISPO DANS REACT AINSI:

  console.log("NOTRE KEY EST", process.env.REACT_APP_STRIPE_KEY ) //DANS LA CONSOLE ...
  console.log('notre environement actuelle est:', process.env.NODE_ENV) //notre environement actuelle est: development




//////////////bon dans react maintenant:

react-stripe-checkout est en fait un bouton (cta genre buy now ), qui amene la fenetre checkout de Stride.


pour les test et le cour on va rester en US dollars,

TOUT LES amounts sont calcullé en sous , donc 5$ est 500
Le token, n est pas notre key, mais checkout, se fiat en deux coups, premier, on se connect, et Stripe nous redonne un token de validite, c est ce token qui est la. on y reviendra..

Paiements.js


class TakeMoney extends Component {
  render() {
    return (
      <StripeCheckout
        token={token => console.log('token est:', token)}
        amount={500}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      />
    );
  }
}

Header.js
class Header extends Component {
  renderContent(){
    //puisque 3 state possible null, good ou false on va mettre un switch, break marche pas..
    switch (this.props.auth) {
    ...
      default:
        return  [  ////IL FAUT METTRE UN ARRAY !!!!
        <li key={0}><Paiements /></li>,
        <li key={1}><a href="/api/logout">Quitter </a></li>
        ]
    }
  }
///////COOL
!!! cool, puisque nos 2 LI allait dans un UL , ET QU ON NE PEUT PAS RENVOYER SANS UN WRAPPER, DEPUIS LA VERSION 16 DE REACT, ON PEUT LES METTRE DANS UN ARRAY !
[  ////IL FAUT METTRE UN ARRAY !!!!
<li key={0}><Paiements /></li>,
<li key={1}><a href="/api/logout">Quitter </a></li>
]
AU LIEU DE

<DIV>
<li key={0}><Paiements /></li>,
<li key={1}><a href="/api/logout">Quitter </a></li>
</DIV>

NE FONCTIONNE PAS ATTENTTION:
return  (
<li key={0}><Paiements /></li>,
<li key={1}><a href="/api/logout">Quitter </a></li>
)
///////FIN COOL

/************************************ LA TRANSACTION ************************************/

 CLICK SUR LE BOUTON DANS LE HEADER


1-rentrer une fake adresse email,
2- le numero de carte par defaut : 4242 4242 4242 4242
3-pour expiration, mettre une date plus elevee qu aujourd hui=>
4- numero de cell sera demande .


le faire et boom:

le token :

on aura une bonne adresse, L ADRESSE DU PAYEUR :

card: address_city: null;
address_country: null;
address_line1: null;
address_line1_check: null;
address_line2: null;
address_state: null;
address_zip: null;
address_zip_check: null;
brand: 'Visa';
country: 'US';
cvc_check: 'pass';
dynamic_last4: null;
exp_month: 2;
exp_year: 2019;
funding: 'credit';
id: 'card_1B12KgC7U3Oc7MaG00o9qoyF';
last4: '4242';
metadata: {
}
name: 'test@email.com';
object: 'card';
tokenization_method: null;
__proto__: Object;
client_ip: '142.118.201.233';
created: 1505176374;
email: 'test@email.com';
id: 'tok_1B12KgC7U3Oc7MaG93Fm8Eq2';
livemode: false;
object: 'token';
type: 'card';
used: false;



/************************************ L ORDRE DE PROCESSION D ACHAT DE CREDIT************************************/

0-CLICK ET LA FORM APPARAIT
1- UTLISATEUR RENTRE SA CARTE
2- DETAILS ENVOYE A STRIPE
3- STRIPE NOUS RENVOIS LE TOKEN
4-ON ENVOIE LE TOKEN DANS NOTRE API
5 - NOTRE API CONFIRM LE MONTANT A STRIPE
6- AJOUT DE CREDITS DANS LE COMPTE DE L UTILISATEUR ( NOTRE API)

/************************************ L ORDRE DE PROCESSION D ACHAT DE CREDIT************************************/


/******************************* AJOUT D AFFICHAGE DE LA FENETRE CHECKOUT *****************************/

<StripeCheckout
  name = "Email-Pro"
  description = "5$ pour accès a 5 credits courriels"
  token={token => console.log('token est:', token)}
  amount={500}
  stripeKey={process.env.REACT_APP_STRIPE_KEY}
/>

le name et description s afficheront


POUR CHANGER LE STYLE(CSS) DU BOUTON:
il s agit de faire un child element button , la on reste avec materialize

render() {
  return (
    <StripeCheckout
      name = "Email-Pro"
      description = "5$ pour accès a 5 credits courriels"
      token={token => console.log('token est:', token)}
      amount={500}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">AJOUT DE CRÉDITS</button>
      </StripeCheckout>
  );
}


/******************************* DISPOSER DU TOKEN EN L ENREGISTRER *****************************/

ACTIONS - INDEX.JS

///va prendre le token qui revient de Stripe checkout ET LE POSTER , on recoit le token au moment de payer l ajout de credit.
export const handleToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};


PAIEMENTS.JS

import { connect } from 'react-redux';
import * as actions from '../actions'; //import de tout le rep, ouff action et types (nom prefait)
 class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name = "Email-Pro"
        description = "5$ pour accès a 5 credits courriels"
        //quand on va recevoir le token
        token={token => this.props.handleToken(token) } //ICI QUAND ON A LE TOKEN, ON FAIT LE POST
        amount={500}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">AJOUT DE CRÉDITS</button>
        </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments)

/*****************************   DEALER avec paiment sur serveur *****************************/
 A CE POInT CI ON A RIEN COMME ROUTE POUR DEALER SUR /API/STRIPE

donc faire une nouvelle route, billingRoutes :

module.exports = app => {  // on passe express  , pour avoir acces au methode, get post ...
  app.post('/api/stripe', (req,res) => {
 ...
  });
};

et l amener sur notre serveur index.js.
 est une function donc de module.export qui demande express pour faire des app.get..;
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);




comment dealer avec ca...
sur npm y a un module qui va nous aider: STRIPE

https://www.npmjs.com/package/stripe (POUR BACK-END)

mais mieux :
https://stripe.com/docs/api/node#intro

dans Core ressources, ensuite dans Charge :

https://stripe.com/docs/api/node#create_charge
EXEMPLE DU SITE :
var stripe = require("stripe")(
  "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
); //IL REQUIRE ET APPLIQUE TOUT DE SUITE La sercret key EUX..

stripe.charges.create({
  amount: 2000,
  currency: "usd",
  source: "tok_amex", // TOKEN obtained with Stripe.js
  description: "Charge for elizabeth.moore@example.com"
}, function(err, charge) {
  // asynchronously called
});




IMPORTANT, PAR DEFAUT EXPRESS PARSE PAS LE REQ COMME DU MONDE. DONC CHAQUE FOIS QU ON FAIT UN POST REQUEST AVEC EXPRESS, ON DEVRAIT , DOIT INSTALLER BODY-PARSER.

donc sur le serveur , index.js :
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //middleware .json()

billingroutes.js
module.exports = app => {
  app.post('/api/stripe', (req,res) => {

    console.log(req.body) // on recoit un obj bien parser.
  });
};


VA DONNER CA APRES UN PAIEMENT:

{ id: 'tok_1B34ZmC7U3Oc7MaGErfnoYKb',
[0]   object: 'token',
[0]   card:
[0]    { id: 'card_1B34ZmC7U3Oc7MaG08s8jnHA',
[0]      object: 'card',
[0]      address_city: null,
[0]      address_country: null,
[0]      address_line1: null,
[0]      address_line1_check: null,
[0]      address_line2: null,

[0]      address_state: null,
[0]      address_zip: null,
[0]      address_zip_check: null,
[0]      brand: 'Visa',
[0]      country: 'US',
[0]      cvc_check: 'pass',
[0]      dynamic_last4: null,
[0]      exp_month: 2,
[0]      exp_year: 2020,
[0]      funding: 'credit',
[0]      last4: '4242',
[0]      metadata: {},
[0]      name: 'test@email.com',
[0]      tokenization_method: null },
[0]   client_ip: '142.118.201.233',
[0]   created: 1505661654,
[0]   email: 'test@email.com',
[0]   livemode: false,
[0]   type: 'card',
[0]   used: false }





BON MAINTENAN CREER LA CHARGE :

const keys = require('../config/keys');
const stripe = require('stripe')(keys.StripeSecure);  //on lui deonne la secretkey


module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
//    console.log(req.body); // on recoit un obj bien parser.
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 pour 5 crédits',
      source: req.body.id
    });
    console.log(charge); //ce qui retourne ici est pas le token, mais la charge, avec son id.
  });
};

[0] connection reussi...
[0] { id: 'ch_1B3504C7U3Oc7MaGWjZLKtDF', //pas un token
[0]   object: 'charge', //charge pas token
[0]   amount: 500,
[0]   amount_refunded: 0,
[0]   application: null,
[0]   application_fee: null,
[0]   balance_transaction: 'txn_1B3504C7U3Oc7MaG1TZTeLbM',
[0]   captured: true,
[0]   created: 1505663284,
[0]   currency: 'usd',
[0]   customer: null,
....


DONC MAINTENAT IL NE RESTE QU A RACOORDER CA AU USER QUI EST LOGUER, DONC LE USER MODEL




/************************************ le user model a updater ************************************/
en ce moment il n accepte que
const userSchema = new Schema({
  googleId: String,
})

mais on doit ajouter les credits=>
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
})



//ensuite dans billingRoutes


const keys = require('../config/keys'); // acces au key
const stripe = require('stripe')(keys.StripeSecure);  //on lui deonne la secretkey


module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    if(!req.user){ //si quelqu un essaye de tricher aevc l url
      return res.status(401).send({error: 'Vous devez etre loguer'}) //pour sortir le mechant
     }
//    console.log(req.body); // on recoit un obj token bien parser.
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



/***************  mieux faire pour verifier qu il y a pas de crosse avec un middleware  *****************/


app.post('/api/stripe', async (req, res) => {
  if(!req.user){ //si quelqu un essaye de tricher aevc l url
    return res.status(401).send({error: 'Vous devez etre loguer'}) //pour sortir le mechant
   }

   ca deveint repetitif ...

dans middleware et requirelogin.js

   module.exports = (req,res,next) => {
     //middleware pour une route: /api/stripe.
     if(!req.user){ //si quelqu un essaye de tricher avec l url;
       return res.status(401).send({error: 'Vous devez etre enregistré'}) //pour sortir le mechant
     }
       next(); //si y a en effet un user.. poursuit ta route.
   };



dans billingRoute:

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
 ...


IL NE FAUT PAS L INVOQUER (), EXPRESS S EN CHARGERA AU BON MOMENT
AUSSI, APP.GET , APP.POST ET UPDATE ... ETC, PRENNENT JSUTEMENT UN NOMBRE X D ARGUMENT, POUR JUSTEMENT LAISSER LA CHANCE POUR NOUS DE CE FAIRE CE GENRE DE MIDDLEWARE PRECIS. TANT QU IL Y A (REQ,RES) UN MOMENT DONNÉ.




/************************************ afficher les credit du user ************************************/


CA SE PASSE DANS LE HEADER.JS, ON A DEJA AVEC THIS.PROPS.AUTH ACCES AU USER MODEL,
ON VA Y METTRE UN PEU DE STYLING, INLINE AVEC {{}}

class Header extends Component {
  renderContent(){
    //puisque 3 state possible null, good ou false on va mettre un switch, break marche pas..
    switch (this.props.auth) {  //qui est notre user model.
      case null:
        return  //rien a l ecran
      case false:
        return  (<li>
          <a href="/auth/google">Login Avec Google</a>
        </li>)
      default:
      return  [
      <li key={0}><Paiements /></li>,
      <li key={2} style={{margin: '0px 10px 0px 20px', fontWeight: 'bold'}}> Credits: {this.props.auth.credits} </li>,
      <li key={1}><a href="/api/logout" style={{fontWeight: 'bold'}}>Quitter </a></li>
      ]
    }
  }

  ...




Une chance :
quand dans la fenetre ou on voit nos credit et le boutton d ajout de credit, si on en ajoute, le nombre de credit change automatiquemment, passe de 5 a 10 , etc

pourtant y a aucun mecanisme de mis en place . pas de componentWillupdate, rien.
La raison pourquoi le chiffre change pour refleter la veriter est plus complexe :

1- quand on fait un paiement , dans Paiement,js , on se trouve a a utiliser l action handleToken
cette action dispatch type: FETCH_USER, tout comme l autre action qui nous donne le user, fetchUser  ,
donc en passant par handletoken, ca rafraichit la meme chose que FetchUser.


export const handleToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};



/************************************ sendGRID au lieu de mailchimp ************************************/

on envoie avec notre configuration ce qu on veut faire et eux envoie a plein de monde
ce qui permet d avoir des stats precise sur qui a repondu quoi, ce qui est tres tuff par email.
gratuit mais complex


api qui permet d envoyer des tas d email=>
https://app.sendgrid.com/settings/api_keys


une fois l inscription de fait, dans le dashboard, et settings, prendre notre api key, l ajouter a dev et prod dans notre projet et aussi a heroku.

installer l api dans node:
npm install --save sendgrid


mailer.js


const sendgrid = require('sendgrid');
const helper = sendgrid.mail;  //helper a pleins d affaires
const keys = require('./../config/keys');

class Mailer extends helper.Mail {   //MAJ on ajoute Mailer ce qui vient avechelper.Mail comme avec react component
  constructor({ subject, recipients }, content) {   //{ subject, recipients } deconst de surver
    super();

    this.sgApi = sendgrid(keys.sendGridKey);        //notre key pour envoyer
    this.from_email = new helper.Email('no-reply@ledomaine.com'); //le reply pour eux
    this.subject = subject;                                       //vient de survey
    this.body = new helper.Content('text/html', content);          //type de content et content (template)
    this.recipients = this.formatAddresses(recipients)              //recipients fromater de survey pour sendgrid

    this.addContent(this.body);           //on doit passer le body dans addcontent
    this.addClickTracking();
    this.addRecipients();
  }
//recipient est un array d obj {email: .... }  //helper.Email va formater pour sendgrid
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {   //destrcu pour prendre que le email.
      return new helper.Email(email);
    });
  }
//on copie ce qui est sur sendgrid.com
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
//une fois qu o na nos recipient.
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
//envoyer a sendgrid.
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;


dans le surveyRoute.js

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // endroit on on utilise la class de Mailer.js
    const mailer = new Mailer(survey, surveyTemplate(survey));
    //try catch, d un coup que mettons sendgrid est down.
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      console.log('user:', req.user);
      const user = await req.user.save();

      res.send(user);  // en renvoit le user updater.
    } catch (err) {
      res.status(422).send(err);
    }
  });
};





mais un probleme se pose, si on veut tester sans avoir a tout contruire le front end dands react, on ne peut pas vraiment utiliser postman, a cause du oauth , le login google, ca rend ca fucking complex=>

donc a la place, dnas le site qu on a on va faire notre post call avec axios :

axios.post('localhostshit/api/surver', enpassant les arguments qu on a de besoin ... ) tadam .

dans la console :
const survey = { title: 'mon titre' , subject: 'mon sujet', recipients: 'benoitlafrance@gmail.com', body: 'voici le body du email' }

axios.post('/api/surveys', survey)



Ca fonctionne :

si on va voir sur le site de sendgrid.com
dans le dashborad, ensuite dnas activities :

on voit tous les envois , et ce qui est l etat de ceux ci :



/*TYPE
SEARCH BY EMAIL
CATEGORY	TIME
  Click	B benoitlafrance@gmail.com		Sep 25, 2017 8:45:58 AM
EMAILbenoitlafrance@gmail.comPROCESSED STRINGSeptember 25, 2017 - 08:45:58 AMMSGID6spqP35gTHaLjOPcVXklFQ.filter0803p1mdw1-11842-59C907BA-D.0URLhttp://localhost:3000

  Click	B benoitlafrance@gmail.com		Sep 25, 2017 8:45:52 AM
EMAILbenoitlafrance@gmail.comPROCESSED STRINGSeptember 25, 2017 - 08:45:52 AMMSGIDbgI_GdsYSqmmdq1UBbzT7g.filter0617p1mdw1-5628-59C9078C-1D.0URLhttp://localhost:3000

  Open	B benoitlafrance@gmail.com		Sep 25, 2017 8:45:50 AM
EMAILbenoitlafrance@gmail.comPROCESSED STRINGSeptember 25, 2017 - 08:45:50 AMMSGIDbgI_GdsYSqmmdq1UBbzT7g.filter0617p1mdw1-5628-59C9078C-1D.0

  Processed	B benoitlafrance@gmail.com		Sep 25, 2017 8:42:18 AM
EMAILbenoitlafrance@gmail.comSMTP-ID<6spqP35gTHaLjOPcVXklFQ@ismtpd0002p1iad2.sendgrid.net>PROCESSED STRINGSeptember 25, 2017 - 08:42:18 AMMSGID6spqP35gTHaLjOPcVXklFQ.filter0803p1mdw1-11842-59C907BA-D.0IP ADDRESS65.94.87.201
/



/************************************ WEBHOOKS et  LOCALTUNNEL ************************************/

WEBHOOKS, c est tuff, passer un api externe a un autre truc externe.

comment 2 serveur vont se jaser:

1- 3 users, repondent au sondage email
2- Sendgrid enregistre les clicks
3- Sendgrid attends 30 sec
4- sendgrid fait un .post a notre serveur, et envoie le data des 30 dernieres secondes.

ce senario en development et production est different.

en production: sendgrid nous envoie chaque 30 seconde A NOTRE DOMAINE, pon post ca a une route, genre NOTRE DOMAINE/surveys/webhooks. notre domaine etant disponnible pour tous et de partout.
next, nous on enregistre et on fait ce qu on veut avec le data.

en dev: on a pas de domaine, et la ca se complique...
localhost:5000 ne veut rien dire a sendgrid.


Donc pour ca on devra utiliser un package : LOCALTUNNEL.com
ON VA UTILISER LA ROUTE DE PRODUCTION, UN FOIS QUE LE DATA EST DANS NOTRE DOMAINE, NOTRE DOMAINE NOUS L ENVOIE A NOUS SUR LOCALHOST..


https://localtunnel.github.io/www/

npm install -g localtunnel  //donc c est fait pour l avenir.,

/*
Start a webserver on some local port (eg http://localhost:5000) and use the command line interface to request a tunnel to your local server:
lt --port 5000
You will receive a url, for example https://gqgh.localtunnel.me, that you can share with anyone for as long as your local instance of lt remains active. Any requests will be routed to your local service at the specified port.
*/

Donc dans le package.json :
  "webhook": "lt --port 5000 -s remoiogreijixmgrj"

il faut y mettre un sub domain que personne d autre pourrait utiliser ... weird.


ensuite dans notre script de server express :
  "dev": "concurrently \"npm run express\" \"npm run client\" \"npm run webhook\"",


on lance le nom run dev :
et on recoit:
your url is: https://remoiogreijixmgrj.localtunnel.me


Dans chrome , on va sur sendgrid.com
dans le dashboard,
1-settings
2-mail settings
3-Event Notification (webhooks)
4- On met le localtunnel PLUS le route qu on veut ! https://remoiogreijixmgrj.localtunnel.me/api/surveys/webhooks
5-y a un botton pour tester la connection, mais pour ca on doit faire la route :
6 - Dans surveyRoute:
app.post('/api/surveys/webhooks', (req, res) => {
 console.log(req.body)
 res.send({});
});
7- on fait le test avec le bouton et dans le terminal , on recoit :

/*{ email: 'example@test.com',
[0]     timestamp: 1506981232,
[0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
[0]     event: 'group_unsubscribe',
[0]     category: 'cat facts',
[0]     sg_event_id: 'vGeH_NY-Q6Z_-NsFRdq9aw==',
[0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',

...*/
8- lui dit que ca crash, mais pas de mon bord. il a fait un script :
sendgrid_webhooks.sh
9-dans package.json :
  "webhook": "./sendgrid_webhook.sh"
10- j vais le faire si ca crash.
11- on doit dans la liste, choisir les click events
12- clicker sur le crochet pour activer le tout, fin .

////////////////////////// Maintenant que le setup et fait et qu on console(req.body) //////////

ON VA ENVOYER UN FORMULAIRE ET REPONDRE OUI AU EMAIL RECU, VOICI CE QU ON RECOIT DANS LE TERMINAL:

[
  { ip: '65.94.87.201',
[0]     sg_event_id: 'NmRmNmZkZjEtNWU0My00YTc4LTgxZDQtMDZkOWU3MmI1YTM5',
[0]     sg_message_id: 'ycEq6St2S4qgF6AK986NJQ.filter0023p3mdw1-29799-59D2C1D6-16.0',

[0]     useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Safari/604.1.38',
[0]     event: 'click',       //le bon type d event,
[0]     url_offset: { index: 0, type: 'html' },
[0]     email: 'benoitlafrance35@gmail.com',
[0]     timestamp: 1506984461,
[0]     url: 'http://localhost:3000/api/surveys/merci' }  //on sait rien
]



pour pouvoir bien voir le choix, on va changer les liens dans le email template
<div>
<a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Oui</a>
</div>
<div>
<a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">Non</a>
</div>


ce qui permet maintenant d avoir dans l url la reponse :
url: 'http://localhost:3000/api/surveys/59d2d1e285dcb264fa00fed6/yes' } ] //on sait plus



///empecher les double click, ou multiple click dnas les emails :
on avait mis dasn le model ,   responded: { type: Boolean, default: false }

et p-e se proteger de prendre que les event: click.
pour ca on va s aider avec lodash , et path-parser

npm install --save lodash path-parser

const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); lui aider a dealer avec des URL justement. fait parti de node.


donc sendgrid nous envoi un obj, dnas un arr, donc si on veut faire de quoi avec :

app.post('/api/surveys/webhooks', (req, res) => {
      console.log(req.body);
  // et avec URL on va ressortir juste ce qu on veut :
  const events = _.map(req.body, truc => {
    const pathname = new URL(truc.url).pathname;
    //avec path-parser, on va avec :nomDeCequonveut , extirper l info.
    const p = new Path('/api/surveys/:surveyId/:choice')
    console.log('Pathname', pathname);
    console.log('Pathname avec path parser', p.test(pathname));
  });
  console.log(events);
});


Pathname:  /api/surveys/59d3e642a014776a284b6ef4/yes
Pathname avec path parser: donne un obj parfaitement fait  { surveyId: '59d3e642a014776a284b6ef4', choice: 'yes' }



plus pousser :

app.post('/api/surveys/webhooks', (req, res) => {
  //    console.log(req.body);
  // et avec URL on va ressortir juste ce qu on veut :
  //const events = _.map(req.body, event => {
  const events = _.map(req.body, ({email, url}) => {

    const pathname = new URL(url).pathname;
    //avec path-parser, on va avec :nomDeCequonveut , extirper l info.
    const p = new Path('/api/surveys/:surveyId/:choice') //retourne { surveyId: '59d3e64f4', choice: 'yes' }
    const match = p.test(pathname); // genre { surveyId: '59d3e64f4', choice: 'yes' }
  //  console.log('Pathname', pathname);
  //  console.log( ` OBJ Pathname avec path parser `, p.test(pathname));
    if(match){ //on va se faire un obj avec tout ce qu on veut vraiment.
      return {email, surveyId: match.surveyId, choice: match.choice };
    }
  });
  console.log(events) //la seule chose qu on return de event , est si y a match, l obj qu on a construit.
});


events :
[ { email: 'benoitlafrance35@gmail.com',
[0]     surveyId: '59d3ffaf161ae36b99f655b7',
[0]     choice: 'yes' } ]


MAINTENANT SI JAMAIS DANS L ARRAY ON AVAIT DE LA CRAP, ON VA NETTOYER AVEC UNE FONCTION DE LODASH, _.COMPACT , prend un array et decrisse les undefined.
const compactEvents = _.compact(events);

ET LES DOUBLONS AVEC _.UNIQBY
//on passe l array, ensuite la ou les key a scanner.
  const uniqEvents = _.uniqBy(compactEvents, 'email', 'surveyId');




refactorer , parce qu en ce moment, on utilise 3 methode de lodash, on fait events avec map, on prend events et on fait compactedEvents avec, avec compactedEvents on fait uniqEvents. Tout ca en etape, mais y a moyen de faire mieux :  _.chain


 _.chain permet de tout faire avec une seule phrase, une avec plusieurs virgules, ca retourne toujours ce qu on veut mais on doit UNE FOIS LA CHAIN PARTIE ENLEVER LE _ DEVANT LES FONCTIONS:
ex: arr = [1,2,3]
_.chain(arr)
 .map(item => item * 2)
 .sort()
 .map( item => item / 2)
 .nimporteQuelLodahMethode()
 .value()

MAIS !!! _Chain DOIT SE TERMINER AVEC .VALUE()


DONC :
app.post('/api/surveys/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice'); //retourne { surveyId: '59d3e64f4', choice: 'yes' }
  const events = _.chain(req.body) //arr initiale
    .map(({ email, url }) => { //pas de _.map , juste map
      const match = p.test(new URL(url).pathname); // genre { surveyId: '59d3e64f4', choice: 'yes' }

      if (match) {
        //on va se faire un obj avec tout ce qu on veut vraiment.
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .value();
  console.log(events); /*[ { email:'benoitlafrance35@gmail.com',surveyId: '59d506bb20',choice: 'yes' } ]*/
  res.send({}); //pour dire que tout va.
});




/************************************ Enregistrer le data  ************************************/

notre _chain nous laisse en ce moement avec : { surveyId, email, choice }
[ { email:'benoitlafrance35@gmail.com',surveyId: '59d506htrhtrrwe4rbb20',choice: 'yes' } ]

--LA MAUVAISED FACON:
-amener tout local, et faire la logique ensuite n est pas la bonne facon

il faut faire attention de ne pas ramener le survey complet, pour dealer avec .
mettons qu on a ca :

Voici notre survey initial:

_id:59d50926363b7471c036bb20
title:"re"
subject:"test"
body:"tr"
_user:59c4448c4294470e747ddb25
dateSent:2017-10-04 12:15:34.613
no:0
yes:0
recipients:Array
0:Object
email:"benoitlafrance35@gmail.com"
_id:59d50926363b7471c036bb21
responded:false
__v:0


mais que le survey a 60000 recipients. Si on part avec :
let survey = Survey.findById(surveyId);

on ramene le survey et ces 60000 recipient dans notre code, ce qui va ralentir en sale notre affaire.

ensuite si on fait :
responder = survey.recipient.find(recipient => recipient.email === email )
on se retrouve a scanner 60000 email..

et la la fin survey.save() , on resave TOut tout tout.



--LA BONNE FACON
-faire le plus de logique possible du cote de la DB, mongo.

on veut regarder le id du survey,
on veut indiquer quel recipient a repondu (responded true ou false),
on veut ajaouter au oui ou au non .


DONC IL EST IMPORTANT SEULEMENT DE PROCEDER, DE COUVRIR UN SEUL SCENARIO:

LE SURVEYID EST LE BON, ET QUE DANS CELUI-CI, LE EMAIL DU RECIPIENT EST LE BON ET QUE SON RESPONDED EST A FALSE

le critere :    {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false } //ou juste email de es6.
          }

_chain(req.body).map(...).compact().uniqBy(...).each :


Bref:
Faire le update du Survey ici, sans avoir a ramener le survey local, on travaille avec le truc le plus precis possible pour eviter les lenteurs.
le critere :

.each(({ surveyId, email, choice }) => {
Survey.updateOne(
  //dans le premier obj arg, la recherche, le deuxieme, on le change .
  {
    _id: surveyId,
    recipients: {
      $elemMatch: { email: email, responded: false }
    }
  },
  {
    $inc: { [choice]: 1 }, // truc Mongo, interpolation, [choice] est oui ou non,  ajoute 1
    $set: { 'recipients.$.responded': true }, //$ veut dire celui precisement de $elemMatch
    lastResponded: new Date() //mets la date,
  }
).exec();

})   //fin du each
.value();

res.send({});

});


au final :
app.post('/api/surveys/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body) //le data arrive sur req.body
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId, //doit mettre _id
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    })  //fin du each
    .value();

  res.send({});
});


UN FOIS REPONDU ET ATTENDRE 5 MIN
DANS NOTRE MLABS , ON VERRA 1 A YES OU NON , TOUT DEPENDANT,



/************************* sortir les surveys fait dans l app ************************************/


Dans SurveyrRoute.js

AVec select on evite de tout ramener. encore la il faut faire attention a ce qu on pull.
Query Projection

mongoose fonctionne ainsi : Survey.find({ _user: req.user.id }) devient une class
ensuite on peut chainer des methodes specifique a mongoose, ici on va y aller avec select pour rapetisser ce que l on pull.
QUERYCLASS$select
notreClass.select()


select fait :

query.select('a b') pas de virgule, va seulement inclure a et b
query.select('-a -b') pas de virgule, va tout doner sauf a et b

app.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false  //onm sort que ceux qui on pas repondu.
  });

  res.send(surveys);
});



/************************************ presenter les stats ************************************/

apres avoir fait l action, et le reducers , on va au lieu de faire ca dnas dashbord, on va faire SurveyList.js et l importer dnas dashboard.

action
//va prendre l info sur l api/surveys et lke mettre dans le dispatch redux pour react
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
reducer :
import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}



SurveyList.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys(); //on va chercher le data des le depart
  }

  renderSurveys() {
    //reverse pour montrer dnas l ordre nouveau avant
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              {/* pour formater : sinon on a le HEX  .toLocaleDateString() */}
            </p>
          </div>
          <div className="card-action red">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}


//state.surveys devient { surveys } ajoute a this.props surveys
function mapStateToProps({ surveys }) {
  return { surveys };  //au lieu de surveys: state.surveys
}
//{ fetchSurveys } deuxieme arg est l action
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
