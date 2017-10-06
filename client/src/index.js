////CLIENT

import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer.js';

//enelever une fois le dev fait
import axios from 'axios';
window.axios = axios;

const { render } = ReactDOM;

const store = createStore(rootReducer, { }, applyMiddleware(reduxThunk));

// eslint-disable-next-line
let unsubscribe = store.subscribe(() => {
  var state = store.getState();
   console.log('Nouveau state >', state); //sort a chaque changement
});


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

//console.log("NOTRE KEY EST", process.env.REACT_APP_STRIPE_KEY )
//console.log('notre environement actuelle est:', process.env.NODE_ENV)
