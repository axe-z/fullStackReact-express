////CLIENT
import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js'

const { render } = ReactDOM;

const store = createStore(rootReducer, {}, applyMiddleware());

// eslint-disable-next-line
let unsubscribe = store.subscribe(() => {
 var state = store.getState();
 console.log('Nouveau state >', state);  //sort a chaque changement
});

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
  )
