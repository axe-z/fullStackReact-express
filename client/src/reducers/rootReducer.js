import { combineReducers } from 'redux';
import authReducer from './authReducer';
//import InitialReducer from './initialReducer'

const rootReducer = combineReducers({
  auth: authReducer,
//  initialState : InitialReducer
});

export default rootReducer;
