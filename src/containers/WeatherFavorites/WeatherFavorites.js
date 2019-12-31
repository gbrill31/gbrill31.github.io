import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Container, Button
} from '@material-ui/core';

import CurrentConditions from '../../components/CurrentConditions/CurrentConditions';

import './WeatherFavorites.scss';

import {
  loadFavorites,
} from './actions';
import {
  setSlectedCityName
} from '../WeatherForecast/actions';

const mapStateToProps = state => ({
  favorites: state.weatherFavorites.items,
  isSaved: state.weatherFavorites.isSaved
});

const mapDispathToProps = dispatch => ({
  loadFromFavorites: () => dispatch(loadFavorites()),
  setCityName: city => dispatch(setSlectedCityName(city))
});

function WeatherFavorites({
  loadFromFavorites, favorites, setCityName
}) {
  const history = useHistory();

  useEffect(() => {
    loadFromFavorites();

  }, [loadFromFavorites]);

  const handleFavoriteSelection = (city) => {
    setCityName(city.LocalizedName);
    history.push('/');
  }

  return favorites.length ? (
    <Container maxWidth="xl">
      <h1>Your Favorite Cities</h1>
      <div className="favoritesWrapper">
        {favorites.map(city => (
          <div key={city.Key} className="favoriteWrapper">
            <Button
              onClick={() => handleFavoriteSelection(city)}
              style={{ textTransform: 'none' }}
            >
              <CurrentConditions city={city} />
            </Button>
          </div>
        ))}
      </div>

    </Container>
  ) : null
}

export default connect(mapStateToProps, mapDispathToProps)(WeatherFavorites);