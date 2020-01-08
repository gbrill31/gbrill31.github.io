import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Unsplash from 'unsplash-js';
import {
  Container, Paper, Button
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useGeolocation } from '../../hooks/useGeolocation';
import SearchCitiesInput from '../../components/SearchCitiesInput/SearchCitiesInput';
import CurrentConditions from '../../components/CurrentConditions/CurrentConditions';
import Forecast from '../../components/Forecast/Forecast';

import { requestGeoLocation } from '../../weatherapi/weatherService';

import './WeatherForecast.scss';

import {
  setSlectedCity
} from './actions';

import {
  saveFavorite
} from '../WeatherFavorites/actions';
import { toast } from 'react-toastify';

const unsplash = new Unsplash({
  accessKey: '07b05aadc071c805fe2fe28c70c0666509b1690d3b7d23cb080af1b2fa530899',
  headers: {
    'SameSite': 'None',
    'Set-Cookie': 'promo_shown=1; Max- Age=2600000; Secure'
  }
});

const mapStateToProps = state => ({
  selectedCity: state.weatherForecast.city,
  favorites: state.weatherFavorites.items,
  tempratureUnits: state.tempratureUnits.units,
  isDarkMode: state.darkMode.isOn
});

const mapDispathToProps = dispatch => ({
  saveToFavorites: city => dispatch(saveFavorite(city)),
  setForecastCity: city => dispatch(setSlectedCity(city))
});

const DEFAULT_CITY = 'Tel Aviv';

function WeatherForecast({
  selectedCity, saveToFavorites, favorites, setForecastCity, tempratureUnits,
  isDarkMode
}) {

  const [bgPhoto, setBgPhoto] = useState('../../images/default_bg.jpg');
  const { latitude, longitude, geoError } = useGeolocation();

  const loadBgImage = useCallback(({ results }) => {
    if (results.length) {
      const path = results[0].urls.full;
      if (path !== bgPhoto) {
        const img = new Image();
        img.onload = () => {
          setBgPhoto(path);
        }
        img.src = path;
      }
    }
  }, [bgPhoto]);

  const setSelectedCity = useCallback((city) => {
    setForecastCity(city);
  }, [setForecastCity]);

  useEffect(() => {
    let isRequestCancelled = false;
    const getCityByGeolocation = async () => {
      try {
        const city = await requestGeoLocation(latitude, longitude);
        if (!isRequestCancelled) {
          setSelectedCity(city);
        }
      } catch (err) {
        toast.error(err, { autoClose: false });
      }
    }

    if (!selectedCity) {
      !geoError ? getCityByGeolocation() : setSelectedCity(DEFAULT_CITY);
    }

    return () => {
      isRequestCancelled = true;
    }
  }, [geoError, latitude, longitude, selectedCity, setSelectedCity]);

  useEffect(() => {
    if (selectedCity) {
      unsplash.search.photos(selectedCity.LocalizedName, 1, 3, { orientation: "landscape" })
        .then(res => res.json())
        .then(data => {
          loadBgImage(data);
        });
    }

    return () => { };
  }, [loadBgImage, selectedCity]);

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
          setSelectedCity={setSelectedCity}
          isDarkMode={isDarkMode}
        />
        {
          selectedCity && (
            <Paper
              elevation={0}
              variant="outlined"
              className="forecastPaperWrapper"
              style={{
                backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'
              }}
            >
              <div className="forecastHeader">
                <CurrentConditions
                  className="justifyLeft"
                  city={selectedCity}
                  tempratureUnits={tempratureUnits}
                  isInFavorites={isInFavorites()}
                  isDarkMode={isDarkMode}
                />
                <Button
                  onClick={() => {
                    saveToFavorites(selectedCity);
                  }}
                  variant="contained"
                  color="secondary"
                  className="addToFavoritesBtn"
                  disabled={isInFavorites()}
                  startIcon={<FavoriteIcon />}
                >
                  Add To Favorites
                </Button>
              </div>
              <Forecast
                city={selectedCity}
                units={tempratureUnits}
                isDarkMode={isDarkMode}
              />
            </Paper>
          )
        }
      </Container>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispathToProps)(WeatherForecast);