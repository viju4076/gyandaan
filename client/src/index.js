import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Routes from './routes';
import store from './store';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}><Routes store={store}/></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)