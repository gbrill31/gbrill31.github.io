import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

import {
  autocomplete,
  weatherForecast
} from './containers/WeatherForecast/reducers';

import {
  weatherFavorites
} from './containers/WeatherFavorites/reducers';

const rootReducer = combineReducers({
  autocomplete, weatherForecast, weatherFavorites
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
