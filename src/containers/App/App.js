import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import WeatherFavorites from '../WeatherFavorites/WeatherFavorites';

import './App.scss';

import {
  setTempratureUnits
} from './actions';

const mapStateToProps = state => ({
  units: state.tempratureUnits.units
});

const mapDispathToProps = dispatch => ({
  saveWeatherUnits: units => dispatch(setTempratureUnits(units))
});

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.BOTTOM_LEFT
});

function App({
  saveWeatherUnits, units
}) {

  return (
    <div className="appRoot">
      <HeaderNav
        saveWeatherUnits={saveWeatherUnits}
        units={units}
      />

      <main className="mainWrapper">
        <Switch>
          <Route exact path="/" component={WeatherForecast} />
          <Route exact path="/favorites" component={WeatherFavorites} />
        </Switch>
      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispathToProps)(App);
