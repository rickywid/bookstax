import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import App from './App';
// import configureStore from './store';
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const token = localStorage.getItem('token');
const store = createStoreWithMiddleware(rootReducer);

if (token) {
  store.dispatch({ type: 'IS_AUTH', payload: true });

  fetch('http://localhost:3001/user/1', {
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Credentials': true,
    },
  }).then(res => res.json()).then((data) => {
    // set user profile to global application state
    store.dispatch({
      type: 'GET_USER',
      payload: data[0],
    });
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// registerServiceWorker();
