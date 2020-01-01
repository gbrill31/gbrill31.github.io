import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Unsplash from 'unsplash-js';
import {
  Container, Paper, Button
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import SearchCitiesInput from '../../components/SearchCitiesInput/SearchCitiesInput';
import CurrentConditions from '../../components/CurrentConditions/CurrentConditions';
import Forecast from '../../components/Forecast/Forecast';

import './WeatherForecast.scss';

import {
  setSlectedCityName
} from './actions';

import {
  saveFavorite
} from '../WeatherFavorites/actions';

const unsplash = new Unsplash({
  accessKey: '07b05aadc071c805fe2fe28c70c0666509b1690d3b7d23cb080af1b2fa530899',
  headers: {
    'SameSite': 'none',
    'Set-Cookie': 'promo_shown=1; Max- Age=2600000; Secure'
  }
});

const mapStateToProps = state => ({
  selectedCityName: state.autocomplete.selected,
  selectedCity: state.autocomplete.city,
  favorites: state.weatherFavorites.items
});

const mapDispathToProps = dispatch => ({
  saveToFavorites: city => dispatch(saveFavorite(city)),
  setCityName: city => dispatch(setSlectedCityName(city))
});

const DEFAULT_CITY = 'Tel Aviv';

function WeatherForecast({
  selectedCity, saveToFavorites, favorites, setCityName, selectedCityName
}) {

  const [bgPhoto, setBgPhoto] = useState('');

  const loadBgImage = ({ results }) => {
    let path = require('../../images/default_bg.jpg');
    if (results.length) {
      path = results[0].urls.full;
    }
    const img = new Image();
    img.onload = () => {
      setBgPhoto(path);
    }
    img.src = path;
  }

  const setSelectedCity = useCallback((cityName) => {
    setCityName(cityName);
  }, [setCityName]);

  useEffect(() => {
    if (!selectedCityName) {
      setSelectedCity(DEFAULT_CITY);
    }
  }, [selectedCityName, setSelectedCity]);

  useEffect(() => {
    if (selectedCity) {
      unsplash.search.photos(selectedCity.LocalizedName, 1, 3, { orientation: "landscape" })
        .then(res => res.json())
        .then(data => {
          loadBgImage(data);
        });
    }
    return () => { };
  }, [bgPhoto, selectedCity]);

  const isInFavorites = () => {
    const isSaved = typeof favorites.find(city => city.Key === selectedCity.Key) === 'object';
    return isSaved;
  }


  return (
    <Fragment>
      <Container
        maxWidth="xl"
        className="forecastContainer"
        style={{
          backgroundImage: `url(${bgPhoto})`
        }}
      >
        <SearchCitiesInput
          setCityName={setSelectedCity}
        />
        {
          selectedCity && (
            <Paper elevation={0} variant="outlined" className="forecastPaperWrapper">
              <div className="forecastHeader">
                <CurrentConditions
                  className="justifyLeft"
                  city={selectedCity}
                  isInFavorites={isInFavorites()}
                />
                <Button
                  onClick={() => {
                    saveToFavorites(selectedCity);
                  }}
                  variant="contained"
                  className="addToFavoritesBtn"
                  disabled={isInFavorites()}
                  startIcon={<FavoriteIcon />}
                >
                  Add To Favorites
                </Button>
              </div>
              <Forecast city={selectedCity} />
            </Paper>
          )
        }
      </Container>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispathToProps)(WeatherForecast);