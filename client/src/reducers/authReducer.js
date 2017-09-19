 //authReducer
 import { FETCH_USER } from '../actions/types.js'

//on le part a null, comme ca si le request marche pas ou chie, on retourne fuck all nifaux ni vrai .
//on retourne le res.data, ou false(pas loguer, payload est la mais vide). ca s en va sur le state.auth

 export default function(state = null, action) {
   switch (action.type) {
     case FETCH_USER:
       return  action.payload  || false;
     default:
       return state;
   }
 }
