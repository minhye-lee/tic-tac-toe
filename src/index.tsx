import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';
import App from './App';
import './index.css';

const composeEnhancer : any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store : Store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(reduxThunk)),
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

