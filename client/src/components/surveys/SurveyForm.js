// SurveyForm est le component qui recoit les inputs
//import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
  //  formFields.map( (item) => console.log(item.label));
  return formFields.map(({ label, name }) => {  //on sort de chaque obj, le label et name
    return (
      <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    );
  });
  }

  render() {
    return (
      <div>
        <h4>Creation de formulaire</h4>

        {/* <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>  OU */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className="red btn-flat white-text">
            Annuler
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Suivant
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}


function validate (values) {
  const errors = {};

   errors.recipients = validateEmails(values.recipients || '' );

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'Vous Devez Inserer Une Valeur';
    }
  });
  //console.log(errors)
  return errors;
}


export default reduxForm({
 validate,
 form: 'surveyForm',
 destroyOnUnmount: false
})(SurveyForm);
