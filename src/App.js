
import firebase from 'firebase';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import Router from './Router';
import reducers from './reducers';

class App extends Component {
  componentWillMount() {	  
    // Initialize Firebase
	const config = {
	apiKey: 'AIzaSyBbSBiN1BIPdvxqxLadb4na3nbpqocKzws',
	authDomain: 'pokerincome-69774.firebaseapp.com',
	databaseURL: 'https://pokerincome-69774.firebaseio.com',
	storageBucket: 'pokerincome-69774.appspot.com',
	messagingSenderId: '320684534747'
	};
	firebase.initializeApp(config);
  }


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
