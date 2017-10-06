
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //de node.
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const { Survey } = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');






module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });



  app.get('/api/surveys/merci', (req, res) => {
    res.send(`<h1>Merci pour la reponse</h1>`);
    console.log('Merci pour la reponse');
  });



  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('<h1>Merci! pour le vote</h1>');
  });

//de sendgrid.
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
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec(); //pour l envoyer
      })  //fin du each
      .value();

    res.send({});
  });

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
      //console.log('user:', req.user);
      const user = await req.user.save();

      res.send(user);  // en renvoit le user updater avec un credit en moins.
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
