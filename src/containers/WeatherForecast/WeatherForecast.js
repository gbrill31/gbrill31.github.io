import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  TextField, Container, CircularProgress, Paper, Button
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FavoriteIcon from '@material-ui/icons/Favorite';


import CurrentConditions from '../../components/CurrentConditions/CurrentConditions';
import Forecast from '../../components/Forecast/Forecast';

import './WeatherForecast.scss';

import {
  searchCities,
  setSlectedCityName
} from './actions';

import {
  saveFavorite
} from '../WeatherFavorites/actions';

const mapStateToProps = state => ({
  isPending: state.autocomplete.isPending,
  citiesFound: state.autocomplete.cities,
  searchError: state.autocomplete.error,
  selectedCityName: state.autocomplete.selected,
  selectedCity: state.autocomplete.city,
  favorites: state.weatherFavorites.items
});

const mapDispathToProps = dispatch => ({
  autocompleteSearch: name => dispatch(searchCities(name)),
  setCityName: city => dispatch(setSlectedCityName(city)),
  saveToFavorites: city => dispatch(saveFavorite(city))
});

const DEFAULT_CITY = 'Tel Aviv';

function WeatherForecast({
  citiesFound, isPending, autocompleteSearch, searchError, selectedCity,
  setCityName, selectedCityName, saveToFavorites, favorites
}) {

  useEffect(() => {
    if (selectedCityName === null) {
      setCityName(DEFAULT_CITY);
      autocompleteSearch(DEFAULT_CITY);
    }
    return () => { };
  }, [setCityName, selectedCity, selectedCityName, autocompleteSearch]);

  useEffect(() => {
    if (searchError) {
      toast.error(searchError);
    }

  }, [searchError]);

  const isInFavorites = () => {
    const isSaved = typeof favorites.find(city => city.Key === selectedCity.Key) === 'object';
    return isSaved;
  }


  return (
    <Fragment>
      <Container maxWidth="xl">
        <Autocomplete
          freeSolo
          id="weather-autocomplete-search"
          className="autocompleteField"
          options={citiesFound.map(city => city.LocalizedName)}
          loading={isPending}
          clearOnEscape
          noOptionsText="No cities found..."
          onFocus={() => {
            autocompleteSearch('');
          }}
          onChange={(event, city) => {
            if (city) {
              setCityName(city);
              autocompleteSearch('');
            }
          }}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label="Search City"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  autocompleteSearch(event.target.value);
                }}
                InputProps={{
                  ...params.InputProps,
                  type: 'text',
                  endAdornment: (
                    <Fragment>
                      {isPending ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  )
                }}
              />
            )
          }}
        />
        {
          selectedCity && (
            <Paper elevation={0} variant="outlined" className="forecastWrapper">
              <div className="forecastHeader">
                <CurrentConditions className="currentConditions" city={selectedCity} isInFavorites={isInFavorites()} />
                <Button
                  onClick={() => {
                    saveToFavorites(selectedCity);
                  }}
                  variant="contained"
                  className="addToFavoritesBtn"
                  disabled={isInFavorites()}
                  startIcon={<FavoriteIcon />}
                >
                  Save To Favorites
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