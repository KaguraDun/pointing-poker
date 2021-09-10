import './styles/index.scss';
import './components/LoginForm/LoginForm.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@/components/App/App';

import LoginForm from './components/LoginForm/LoginForm';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <LoginForm />
    </Router>
  </Provider>,
  document.getElementById('root')
);
