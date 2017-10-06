const sendgrid = require('sendgrid');
const helper = sendgrid.mail;  //helper a pleins d affaires
const keys = require('../config/keys');

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
