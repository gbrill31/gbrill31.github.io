import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Container, Button
} from '@material-ui/core';

import CurrentConditions from '../../components/CurrentConditions/CurrentConditions';
import PromptDialog from '../../components/PromptDialog/PromptDialog';

import './WeatherFavorites.scss';

import {
  loadFavorites,
  clearFavorite
} from './actions';
import {
  setSlectedCity
} from '../WeatherForecast/actions';

const mapStateToProps = state => ({
  favorites: state.weatherFavorites.items,
  isSaved: state.weatherFavorites.isSaved,
  tempratureUnits: state.tempratureUnits.units,
  isDarkMode: state.darkMode.isOn
});

const mapDispathToProps = dispatch => ({
  loadFromFavorites: () => dispatch(loadFavorites()),
  clearAllFavorites: () => dispatch(clearFavorite()),
  setForecastCity: city => dispatch(setSlectedCity(city))
});

function WeatherFavorites({
  loadFromFavorites, favorites, setForecastCity, clearAllFavorites, tempratureUnits,
  isDarkMode
}) {
  const history = useHistory();
  const [isPrompt, setIsPrompt] = useState(false);

  useEffect(() => {
    loadFromFavorites();

    return () => { }

  }, [loadFromFavorites]);

  const handleOpenPrompt = () => {
    setIsPrompt(true);
  }

  const handleClosePrompt = () => {
    setIsPrompt(false);
  }

  const handleFavoriteSelection = (city) => {
    setForecastCity(city);
    history.push('/');
  }

  const hasFavorites = () => {
    return favorites.length > 0;
  }

  return (
    <Container
      maxWidth="xl"
      className="favoritesContainer"
      style={{
        backgroundColor: isDarkMode ? '#333' : ''
      }}
    >
      <h1
        style={{
          color: isDarkMode ? '#fff' : ''
        }}
      >
        Your Favorite Cities
      </h1>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenPrompt}
        disabled={!hasFavorites()}
      >
        Clear Favorites
      </Button>
      <div className="favoritesWrapper">
        {hasFavorites() && favorites.map(city => (
          <div
            key={city.Key}
            className="favoriteWrapper"
            style={{
              backgroundColor: isDarkMode ? '#888' : ''
            }}
          >
            <Button
              onClick={() => handleFavoriteSelection(city)}
              style={{
                textTransform: 'none',
                border: '1px solid black'
              }}
            >
              <CurrentConditions
                city={city}
                tempratureUnits={tempratureUnits}
                isDarkMode={isDarkMode}
              />
            </Button>
          </div>
        ))}
      </div>
      <PromptDialog
        isOpen={isPrompt}
        title="Clear Favorites"
        content="Are you sure you want to delete all your favorites ?"
        handleConfirm={clearAllFavorites}
        handleClose={handleClosePrompt}
      />
    </Container>
  )
}

export default connect(mapStateToProps, mapDispathToProps)(WeatherFavorites);