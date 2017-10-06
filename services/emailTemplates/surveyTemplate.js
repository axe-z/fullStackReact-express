const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Nous avons besoin de votre opinion!</h3>
          <p>Merci de reprondre a notre question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Oui</a>
            </div>
            <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">Non</a>
          </div>
        </div>
      </body>
    </html>
  `;
};

/* <a href="${keys.redirectDomain}/api/surveys/merci">Oui</a>
</div>
<div>
<a href="${keys.redirectDomain}/api/surveys/merci">Non</a> */
