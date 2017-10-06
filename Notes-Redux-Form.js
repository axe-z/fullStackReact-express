///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Redux-Form/////
///////////////////////////////////////////////////////////////////////////////////////////////
L INTERET D UTILISER REDUX-FORM EST QUAND ON A BESOIN AILLEUR , METTONS UN AUTRE COMPONENET , L INFO RECUILLIT PAR LA FORM ET LE METTRE DANS LE STORE

ICI ON VA FAIRE UN PREVIEW DE CE QUE L UTILIASTEUR VA ENTRER JUSTEMENT , ET AMENER L INFO PAR CONNECT

le point d utiliser redux-form, vs redux tout cour, c est qu on peut eviter bcp de boulot, sur les actions et reducers et le fait automatiquement !!

**notes - pour une form simple, c est un peu overkill.

en gros ca nous evite de faire tout nous meme, et aide a capturer dans le store le data, on fait les fields de data avec ca, et ceux sans infos, comem des boutons, normalement . ca fonctionne comme connect et ajoute des trucs, sur this.props //handleSubmit // validate //etc..

c est super bien documenté :
https://redux-form.com/7.0.4/

install:
npm install --save redux-form



//////////////niveau reducer
dans le rootreducer :

import { reducer as reduxForm } from 'redux-form';  //on peut pas changer le nom autrement  !!

const rootReducer = combineReducers({
  auth: authReducer,
  form: reduxForm                 //on DOIT utiliser form
});

//////////////niveau reducer

/************************************ le main component de la form ************************************/
notre main component, lui qui va gerer les autre component :
--SurveyNew.js

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';


//on viendra y mettre les components additionel .


/************************************ La form, dans Surveyform.js ************************************/
-FORME SIMPLE ET NON FINALE
--Surveyform.js
import React, { Component } from 'react';

REDUXFORM,  EST CE QUI COMMUNIQUE AVEC LE STORE. un peu comme connect de redux.
FIELD , EST UN HELPER DE REDUX-FORM, POUR RENDERER TOUS LES INPUTS HTML, BUTTON , TEXT FIELD, ETC...
DONC DANS LE REACT AU LIEU DE METTRE INPUT TYPE TEXT, ON UTILISE FIELD ...
import { reduxForm, Field } from 'redux-form';
//Exemple:  <Field type="text" name='test' component='input' />

import { Link } from 'react-router-dom';

class SurveyForm extends Component {

  render() {
    return (
      <div>
        <form  voir plus bas>
           <Field type="text" name='surveyTitle' component='input' />

LE NAME PEUT ETRE CE QUE L ON VEUT, SERA VU DANS LE STORE
COMPONENT, SERA LA MEME CHOSE QU EN HTML, INPUT, VEUT DIRE <INPUT />
LE TYPE EST COMME EN HTML
CECI EST L UTILISATION DE BASE, MAIS IL EST FREQUENT QU AU LIEU DE METTRE INPUT A COMPONENT, ON CREERA NOTRE PROPRE COMPONENET POUR LE METTRE A CET ENDROIT :  component={SurveyField}, DONC AU LIEU DE METTRE UN INPUT, IL VA METTRE ET GERER LE COMPONENT.
MAINTENANT ON VA VOULOIR SUBMITER L INFO , DONC ON LE WRAP DANS LE <FORM> TAG.
POUR QUE LA FORM EST LE DATA, IL FAUT FAIRE AINSI:
<form onSubmit={this.props.handleSubmit(values => console.log(values) )}>  //{surveyTitle: "test"}

  donc si on entre test, dans le input field et click sur le submit (suivant), on aura la valeur dans notre console.

  THIS.PROPS.HANDLESUBMIT est fourni par reduxForm, donc pas besoin de l ecrire nous meme. et l ajoute comme connect le fait, sur le this.props.



          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
//export comme connect
export default reduxForm({
 form: 'surveyForm', //form est le nom dans le rootreducer, et surveyForm, sera donc form.surveyForm dans le store.
})(SurveyForm);


DEJA JUSTE AVEC CA , ON A ACCES APRES CHAQUE TOUCHES DANS NOTRE STORE,DNAS FORM.SURVEYFORM.VALUE.surveyTitle A CE QU ON A TAPPÉ



/************************************ maper un input field  ************************************/
Maper un input field, parce qu ils sotn semblable;
On sait ici que notre form aura 4 input de tex avec des labels, les 4 sont du meme genre, alors au lieu des hard coder, on va les genrer :

dans le fichier formFields:
export default [
  { label: 'Campaign Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' }
];

est l array info sur lequel on va mapper , Mais avant, comment ca fonctionne ...

--SurveyField


// SurveyField contains la logique d un seul input et label
import React from 'react';

export default () => {
  return (
    <div>
       <input type="text" />
    </div>
  );
};



et dans le main container :
SurveyForm ,

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
       <Field type="text" name="title" component={SurveyField} />  //on passe le component la
      </div>
    );
  }

render() {
  return (
    <div>
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        ...


maintenant on voit le input comme avant. mais on le genere par un fonction au lieu de le hard coder.
  {this.renderFields()} |VS|  <Field type="text" name='surveyTitle' component='input' />



REVENONT A SURVEYFIELD QU ON VA UTILISER POUR PRODUIRE LES 4 INPUTS;
Quand on fait component={SurveyField} , redux-form pitch un paquet de props dans la fonction,
comme connect , ajoute a  react .
le  test  Si ca est dnas surveyform :
<Field type="text" label={formFields[0].label} name={formFields[0].name} component={SurveyField} /> :

export default (props ) => {
    console.log("les props: ", props) //bcp d affaire !! voir plus bas
    console.log("les props input: ",props.input) // juste les eventhandlers
  return (
    <div>
       <input type="text" />
    </div>
  );
};

LES PROPS LA DEDANS AJOUTE PAR REDUX FORM :

input:{name: "title", onBlur: ƒ, onChange: ƒ, onDragStart: ƒ, onDrop: ƒ, …}
label:"Campaign Title"
meta:{active: false, asyncValidating: false, autofilled: false, dirty: false, dispatch: ƒ, …}
type:"text"


/*************************  PART II Comment utiliser les props  ************************************/

COMMENT PASSER A NOTRE SIMPLE INPUT, TOUS LES PROPS QUI SONT DISPOS:

export default ( { input }  aka props.input ) => {
  return (
    <div>
       <input  {...input} /> //destructuer props.input ajoute tous les event handlers.... !!!
       equivaut onBlur={input.onBlur} onChange{...} etc..
    </div>
  );
};

ajout de label
export default ( { input, label }  aka props.input ) => {
  return (
    <div>
       <label>{label}</label>
       <input  {...input} /> //destructuer props.input ajoute tous les event handlers.... !!!
       equivaut onBlur={input.onBlur} onChange{...} etc..
    </div>
  );
};


ensuite dans SurveyForm.js

class SurveyForm extends Component {
  renderFields() {
  //  console.log(formFields[0].label) //Campaign Title
  return (
    <div>
      <Field type="text" label={formFields[0].label} name={formFields[0].name} component={SurveyField} />
       <Field type="text" label={formFields[1].label} name={formFields[1].name} component={SurveyField} />
       <Field type="text" label={formFields[2].label} name={formFields[2].name} component={SurveyField} />
       <Field type="text" label={formFields[3].label} name={formFields[3].name} component={SurveyField} />
    </div>
  );
}

DONC AU LIEU DE HARDCODER CHAQUE ON VA MAPPER le fromfields.
on doit retourner le resutat du map, etant donne qu on le met pas dans un variable et retourne la variable a la fin. il a choisi d utiliser lodash, j sais pas pourquoi... ca marche avec map.

import _ from 'lodash';

class SurveyForm extends Component {
  renderFields() {
  //  formFields.map( (item) => console.log(item.label));
  return _.map(formFields, ({ label, name }) => {  //on sort de chaque obj, le label et name
    return (
      <Field
        key={name}   //on doit mettre un keys, arr..
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    );
  });

  //OU MAP REGULIER:
  return formFields.map(({ label, name }) => {  //on sort de chaque obj, le label et name
    return (
      <Field
        key={name} //on doit mettre un keys, arr..
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    );
  });
  }


  <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
    va nous donner touyt ce qui est dnas les inputs.

/************************************ VALIDATION AVEC REDUX-FORM ************************************/


Pour ajouter la validation:
Dans Surveyform on ajoute en bas:



export default reduxForm({
  validate : validate (nom de notre function de validation),  //ou juste validate pour la function suivante
  form: 'surveyForm'
})(SurveyForm);


DE VALIDATE ON DOIT RETOURNER UN OBJ, C EST WEIRD MAIS DE MEME , ERRORS ICI .
SI L OBJ ( ERRORS), N EST PAS VIDE, LA FORM NE SE SUBMIT PAS ET BLOQUE.
BREF REDUX-FORM VA TOUJOURS VERIFIER SI LES CONDITIONS N ONT PAS RIEN PITCHER DANS LE ERRORS OBJ
NOUS DE NOTRE BORD, ON PITCH CE QUI DEVRAIT PAS FONCTIONNER DNAS ERRORS.
Mais ce n est pas aussi simple que vide ou pas.

Aussi, errors sera connecté aux proprietes meta des components.

function validate (values) {  //le values qu on a vu deja dans les handlers.
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

/// name est les keys {title: "efw", subject: "fe", body: "fe", recipients: "fe"}
formFields.forEach(({ name }) => {
      if (!values[name]) {
    errors[name] = 'Vous Devez Inserer Une Valeur';
  }
});

  return errors;  // si pas vide, ca submit pas.
}



Voici une liste des trucs que redux-form ajoute avec META:
META
:
active:false
asyncValidating:false
autofilled: false;
dirty: false;
dispatch: ƒ(action);
error: 'Vous Devez Inserer Une Valeur';  ///Donc ici va se logger ou pas une erreur.
form: 'surveyForm';   //le component en question
initial: undefined;
invalid: true;
pristine: true;
submitFailed: false;
submitting: false;
touched: false;   //veux dire qu on a ete dans le champs et p-e ressorti
valid: false;
visited: false;
warning: undefined;



Suite un peu apres. on doit ajuster avant SurveyField.js pour mieux gerer les meta=>

/************************************ Gerer le meta  ************************************/

SurveyField.js
export default ( { input, label,  meta } ) => {
   console.log("les props: ", meta.error  )
 ...
  AU reload, LES CHAMPS SONT VIDES , DONC CHACUN des fields RETOURNE L ERREUR QU ON A MIS DANS NOTRE FONCTION VALIDATE :  "VOUS DEVEZ INSERER UNE VALEUR"


si on met du data sur la form , meta.error devient undefined.


on ira encore plus loin :
SurveyField.js
export default ( { input, label, meta,   meta: { error, touched } } ) => {
  double destructuring.


  <div className="red-text" style={{ marginBottom: '20px', fontSize: '80%' }}>
     {touched && error}
   </div>

      {touched && error}  va mettre seulement a l ecran l avertissement "VOUS DEVEZ INSERER UNE VALEUR" une fois qu un utilisateur va dans le champs et en ressort sans rien y mettre

      ou ensuite si il submit avec des vides dans la form.
      donc au depart aucun warning n est visible.




/*********************   l elephant dans la piece, valider les emails **************************/


DABORD , ON VA DECIDER, DE LES SEPARER PAR UNE VIRGULE :

info@axe-z.com, benoitlafrance@gmail.com, benoitlafrance35@gmail.com

-faudra verifier si y a un domaine, si la forme du email est bonne donc.
on va faire un fonction qui va faire que ca valider un email, donc ca sera reutilisable.

Dans un folder Utils/validateEmail.js

http://emailregex.com

ON VA RETOURNER QUE LES COURRIELS INVALIDES..

//ca c est celle HTML5
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


//ca c est celle JS, mais donne la meme patente mais unti peu mieux. - pas un string
 // const re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;


  //FORMULE MAGIQUE REGEX, RE NE VERIFIE PAS SI Y A UN DOMAIN OU PAS , C EST PAS SUPER SUPER PRECIS.

export default (emails) => {
  const invalidEmails = emails
    .split(',')               //va faire un array
    .map(email => email.trim())   //va enlever le gras
    .filter(email => re.test(email) === false);  //fonction test de REGEX ,  retourne les mechants

  if (invalidEmails.length) {
    return `Ces courriels sont invalides: ${invalidEmails}`;
  }
  return ;  //ca va dans meta.error , return rien, est parfait
};


Maintenant dasn SurveyForm.js

function validate (values) {
  const errors = {};

//ON VA METTRE SUR ERROR LA VALIDATION, SI UNE ADRESSE FIT PAS, ELLE IRA DNAS LE MESSAGE, DONC EN ROUGE
// LE || '' EST LA PARCE QU AU DEPART, LA FORM EST VIDE. DONC CA VALIDE RIEN
   errors.recipients = validateEmails(values.recipients || '');

/// truc est les keys , le name de formFields {title: "efw", subject: "fe", body: "fe", recipients: "fe"}
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'Vous Devez Inserer Une Valeur';
    }
  });
  //console.log(errors)
  return errors;
}




/*******  ENVOYER LE FORM SUR UN NOUVEAU COMPONENT (POUR FAIRE UNE REVUE DES INFOS ENTREES)   *******/

SurveyFormReview.js

Create-React-App, cra, a un truc babel, qui permet de gerer les State autrement=>

class SurveyNew extends Component {
  //vieille maniere.
  constructor (props){
    super(props)

    this.state= {
      new : false
    }
  }


DEVIENT SIMPLEMENT et est equivalant
class SurveyNew extends Component {

  state = { showFormReview: false }; //that's it . pu besoin de constructor..



DONC

class SurveyNew extends Component {

  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm  //ON PASSE EN PROPS LA FONCTION QUI VA CHANGER LE STATE ICI
        onSurveySubmit={() => this.setState({ showFormReview: true })} donc ici on va passer ca au submit
      />
    );
  }

  render() {
    return (
      <div>
              <h4>Creation de formulaire</h4>
    {this.renderContent()}
      </div>
    );
  }
}


sur SurveyForm :

RECOIT LA PROPS.
{/* <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>  OU */}
CE QUI VA QUAND LES INFO SONT ENTRE , AFFICHER LE BON COMPONENT

<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> //PAS DE () SINON IL ROULE TOUT DE SUITE.




MEME CHOSE ICI POUR SurveyFormReview
ON SE RAPPELE ON PITCH SUR PROPS UN ONCANCEL
<SurveyFormReview
  onCancel={() => this.setState({ showFormReview: false })}
/>

DONC:
SurveyFormReview.JS

const SurveyFormReview = ({onCancel}) => {
  return (
    <div>
    <h2> Svp confirmer si c'est bien cela</h2>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel} //QUI VA METTRE LE STATE A FALSE, ET REMMETRE LA FORM A L ECRAN
      >
        Annuler
      </button>
    </div>
  )
};

/************************************ destroyOnUnmount ************************************/

LE TROUBLE MAINTENANT EST QUE SI L UTILISATEUR FAIT UNE ERREUR ET LE REALISE DANS LA REVIEW,
ET FAIT ANNULER (LE ONCANCEL QUI RAMENE LA FORM) , BIEN L INFO EST DISPARUE, DONC DOIT TOUT RECOMMENCER

en fait ceci est une FEATURE de redux-form ... destroyOnUnmount

/****************** Comment faire persister le data de form apres le submit    *****************/

puisque c est un feature, ils ont fait en sorte que ca soit simple en renverser et conserver le data .

la ou on configure la Form, dans Surveyform, dans le bas:
Surveyform.js
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false   //ici on dit de PAS destroyer !!!
})(SurveyForm);


DONC SI ON REVIENT LE DATA YT EST TOUJOURS.





/***************   PASSER LE DATA D UN COMPONENT A L AUTRE AVEC LE STORE ET CONNECT  *****************/


SurveyFormReview.js

on ajoute connect pour acceder au store le data est dans state.form.surveyForm.values.

import { connect } from 'react-redux';


et mapStateToProps :

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)( SurveyFormReview );

Donc dasn SurveyFormReview, on a maintenant sur le this.props formValues: this.props.formValues.




Maintenant on va les montrer (values) dnas le review:

const SurveyFormReview = ({onCancel, formValues}) => {
et on aura ca pour chaque ... title subject body recipients

  <div>
    <label> Titre du formulaire</label>
    <div>{formValues.title}</div>
  </div>

  al a place on va faire une fonction qui va generer ca :


  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

CECI VA GENERER CE QUE L ON VEUT AVEC LES VALUES INCLUSES.

/**************    comment enlever le data de la form quand il est utile  ********************/
en ce moement , dans le review, on peut revenir en arriere et le data en conserve, on peut faire des modif, aller et revenir sans probleme ( destroyOnUnmount: false )

si on veut parcontrer, aller ailleur, ou annuler, quand on est dans la form. c est pas possible.

le truc est de mettre dans surveyNew aussi le setting de redux-form, avec le meme nom, mais avec la fonctikon effacer a on ( par defaut, c est ca)

SurveyNew.js
import { reduxForm } from 'redux-form';

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);


VS
SurveyForm.js

export default reduxForm({
   validate,
 form: 'surveyForm',
 destroyOnUnmount: false
})(SurveyForm);

tres tricky..

/************************************  envoyer le data  ************************************/
on veut en cliquant Envoyer, sauvegarder le data et envoyer avec sendgrid

Le data on va l envoyer sur la route de surveyRoute.js du serveur express.

on aura besoin d une action, et d un dispatch,
on va importer dans SurveyFormReview nos actions
import * as actions from '../../actions';

et dnas connect, on va passer nos actions, pour pouvoir les utiliser :
export default connect(mapStateToProps, actions)( SurveyFormReview );

submitSurvey edvient donc par connect une props. donc on va l ajouter :

const SurveyFormReview = ({onCancel, formValues, submitSurvey}) => {
...




//pour etre sur que submitSurvey se lance pas , on va le mettre dans une fonction.

<button onClick={() => submitSurvey(formValues)}


on va aller dans nos actions,
index.js.


export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);  //va pitcher l object pour req.body

  dispatch({ type: FETCH_USER, payload: res.data });
};


le serveur, surveyRoute.js :
app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body; //ici recoit.

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });
... ici y a le mailer qui se fait avec le survey .






NOTRE ROUTER :

app.js
<BrowserRouter>
  <div className="container">
  <Header /> {/* va etre partout  */}
   <Route exact={true} path="/" component={Landing} /> {/*ou juste exact */}
  <Route exact path="/surveys" component={Dashboard} />   {/*on voit landing si pas EXACT / est dans le chemin  */}
  <Route path="/surveys/new" component={SurveyNew} /> {/*Dashboard est inclut si pas exact a Dashboard */}
  </div>
</BrowserRouter>




MAINTENANT MEME CHOSE, MAIS ON REDIRIGE VERS /SURVEYS
mais le probleme est le suivant dans notre react router, rien ne s occupe de surveyForReview :
/surveys/new donc SurveyForm lui gere SurveyFormReview par lui meme . Par consequent le router ne sait pas comment rerouter SurveyFormReview, il le connait pas et ne sait pas ou il est vraiment, pour ca on devra ajouter du stock... :

Dans SurveyFormReview:
import { withRouter } from 'react-router-dom';
nous donne acces a une props : history
withRouter fonctionne un peu comme connect, on wrap le export en bas de page .
export default connect(mapStateToProps, actions)( SurveyFormReview );
DEVIENT
export default connect(mapStateToProps, actions)(withRouter( SurveyFormReview ));


DONC AJOUTE LA PROPS :
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
...


ET POUR L APPEL DE NOTRE ACTION, ON LUI PASSE LA PROPS.
<button
    onClick={() => submitSurvey(formValues , history) }



export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys'); //doit un fois l envois des values de la form, on redirige sur /surveys
  dispatch({ type: FETCH_USER, payload: res.data });
};




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
