import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import WeatherFavorites from '../WeatherFavorites/WeatherFavorites';

import './App.scss';

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.BOTTOM_LEFT
});

function App() {

  return (
    <div className="appRoot">
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
