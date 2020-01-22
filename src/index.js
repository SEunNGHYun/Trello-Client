import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import 'antd/dist/antd.css';
import './App.css';
import reducer from './redux/actions';

const Store = createStore(reducer);

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
