import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Template create-react-app AXE-Z</h2>
        </div>
        <p className="App-intro">
          Fafa <code>client/src/App.js</code> est le point de depart.
        </p>
          <a href="/auth/google">Pour continuer</a>
      </div>
    );
  }
}

export default App;
