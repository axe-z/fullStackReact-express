import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import { reducer as reduxForm } from 'redux-form';
//import InitialReducer from './initialReducer'

const rootReducer = combineReducers({
  auth: authReducer,
//  initialState : InitialReducer
  form: reduxForm,
  surveys: surveysReducer
});

export default rootReducer;
