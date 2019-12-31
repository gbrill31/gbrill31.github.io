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
  setSlectedCityName
} from '../WeatherForecast/actions';

const mapStateToProps = state => ({
  favorites: state.weatherFavorites.items,
  isSaved: state.weatherFavorites.isSaved
});

const mapDispathToProps = dispatch => ({
  loadFromFavorites: () => dispatch(loadFavorites()),
  clearAllFavorites: () => dispatch(clearFavorite()),
  setCityName: city => dispatch(setSlectedCityName(city))
});

function WeatherFavorites({
  loadFromFavorites, favorites, setCityName, clearAllFavorites
}) {
  const history = useHistory();
  const [isPrompt, setIsPrompt] = useState(false);

  useEffect(() => {
    loadFromFavorites();

  }, [loadFromFavorites]);

  const handleOpenPrompt = () => {
    setIsPrompt(true);
  }

  const handleClosePrompt = () => {
    setIsPrompt(false);
  }

  const handleFavoriteSelection = (city) => {
    setCityName(city.LocalizedName);
    history.push('/');
  }

  const hasFavorites = () => {
    return favorites.length > 0;
  }

  return (
    <Container maxWidth="xl">
      <h1>Your Favorite Cities</h1>
      <Button
        variant="contained"
        onClick={handleOpenPrompt}
        disabled={!hasFavorites()}
      >
        Clear Favorites
      </Button>
      <div className="favoritesWrapper">
        {hasFavorites() && favorites.map(city => (
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