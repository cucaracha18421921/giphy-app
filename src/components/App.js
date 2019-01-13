import React, { Component } from 'react';
import QueryUI from './QueryUI';
import './App.sass';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';

/*
* The App Component
* */
class App extends Component {
  render() {
    return (
      <div className="App">

        <Provider store = {configureStore()}>
          <header className="App-header">
            <p>
              Welcome to Giphy
            </p>
          </header>
          <QueryUI/>
        </Provider>
      </div>
    );
  }
}

export default App;
