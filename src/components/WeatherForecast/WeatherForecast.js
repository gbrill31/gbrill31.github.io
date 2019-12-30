import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TextField, Container, CircularProgress, Paper
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrentConditions from '../CurrentConditions/CurrentConditions';
import Forecast from '../Forecast/Forecast';

import './WeatherForecast.scss';

import {
  searchCities,
  setSlectedCity
} from '../../containers/App/actions';

const mapStateToProps = state => ({
  isPending: state.autocompleteSearch.isPending,
  citiesFound: state.autocompleteSearch.cities,
  requestError: state.autocompleteSearch.error,
  selectedCity: state.autocompleteSelect.selected,
  currentConditions: state.autocompleteSelect.currentConditions,
  forecast: state.autocompleteSelect.forecast
});

const mapDispathToProps = dispatch => ({
  autocompleteSearch: name => dispatch(searchCities(name)),
  setForecastCity: city => dispatch(setSlectedCity(city))
});

function WeatherForecast({
  citiesFound, isPending, autocompleteSearch, requestError, selectedCity,
  setForecastCity, currentConditions, forecast
}) {

  useEffect(() => {
    setForecastCity('Tel Aviv');
    return () => {
      setForecastCity('');
    };
  }, [setForecastCity]);

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Autocomplete
          freeSolo
          id="weather-autocomplete-search"
          className="autocompleteField"
          open={citiesFound.length > 0}
          options={citiesFound.map(city => city.LocalizedName)}
          loading={isPending}
          blurOnSelect
          clearOnEscape
          noOptionsText="No cities found..."
          onChange={(event, city) => {
            if (city) {
              setForecastCity(city);
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
                  type: 'search',
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
            <Paper elevation={0} variant="outlined" className="forcastWrapper">
              <CurrentConditions city={selectedCity} currentConditions={currentConditions} />
              <Forecast forecast={forecast} />
            </Paper>
          )
        }
      </Container>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispathToProps)(WeatherForecast);