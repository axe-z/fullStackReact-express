////Action creator

import axios from 'axios';
import { FETCH_USER, /*FETCH_SURVEYS*/ } from './types';



//avec thunk

//action pour verifier si utilisateur actuel // retourne null, le user, ou false dans le reducer.
export const fetchUser = (truc) => async (dispatch) => { //retourne directement la deuxieme fn
  const res = await axios.get('/api/utilisateur_actuel');
  console.log('fetch :', truc) //App.js
  dispatch({ type: FETCH_USER, payload: res.data });
};


///va prendre le token qui revient de Stripe checkout ET LE POSTER , on recoit le token au moment de payer l ajout de credit.
export const handleToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};


//
// export const submitSurvey = (values, history) => async (dispatch) => {
//   const res = await axios.post('/api/surveys', values);
//
//   history.push('/surveys');
//   dispatch({ type: FETCH_USER, payload: res.data });
// };
//
// export const fetchSurveys = () => async (dispatch) => {
//   const res = await axios.get('/api/surveys');
//
//   dispatch({ type: FETCH_SURVEYS, payload: res.data });
// };
