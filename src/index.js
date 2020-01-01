import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#272727',
      dark: '#83af83',
      light: '#fff',
      contrastText: '#fff'
    },
    secondary: {
      main: '#607d8b',
      dark: '#83af83',
      light: '#fff',
      contrastText: '#fff'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
