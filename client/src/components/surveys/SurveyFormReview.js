// SurveyFormReview montre la form finie avant de pitcher ca.

import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
  import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

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

return (


  <div>
    <h4>Svp confirmer si c'est bien cela</h4>
    {reviewFields}
    <button
      className="yellow darken-3 white-text btn-flat"
      onClick={onCancel}
      style={{marginTop: '20px'}}
    >
      Annuler
    </button>
    <button
        onClick={() => submitSurvey(formValues , history )}
      className="teal btn-flat right white-text"
      style={{marginTop: '20px'}}
    >
      Envoyer
      <i className="material-icons right">email</i>
    </button>
  </div>
);
};

function mapStateToProps(state) {
  //console.log(state)
  return { formValues: state.form.surveyForm.values };
}


export default connect(mapStateToProps, actions)(withRouter( SurveyFormReview ));
