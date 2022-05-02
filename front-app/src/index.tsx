import React from 'react';
import ReactDOM from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.css';
import 'react-calendar/dist/Calendar.css'
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { store, StoreContext } from './app/stores/store';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
