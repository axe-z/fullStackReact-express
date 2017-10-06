////Action creator

import axios from 'axios';
import { FETCH_USER,  FETCH_SURVEYS  } from './types';

/*les actions, sont la pour nous aider a amener l info d une place a l autre, pour enregistrer dans la db . */

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
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
  //console.log('res de submitSurvey values',  values )
  //values //{title: "gg", subject: "gg", body: "gg", recipients: "benoitlafrance35@gmail.com"}
  //console.log('res de submitSurvey values',  res.data )
  //res.data//{_id: "59c4448c4294470e747ddb25", googleId: "108399082281546274727", __v: 0, credits: 2}
};


//va prendre l info sur l api/surveys et lke mettre dans le dispatch redux pour react
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
