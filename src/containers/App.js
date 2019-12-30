import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import WeatherFavorites from '../components/WeatherFavorites/WeatherFavorites';

import './App.scss';

function App() {
  return (
    <div>
      <HeaderNav />
      <main>
        <Switch>
          <Route exact path="/" component={WeatherForecast} />
          <Route exact path="/favorites" component={WeatherFavorites} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
