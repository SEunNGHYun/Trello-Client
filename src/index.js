import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import reducer from './redux/actions';

const Store = createStore(reducer);
console.log("store", Store.getState())

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
