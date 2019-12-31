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
  setSlectedCityName
} from '../../containers/App/actions';

const mapStateToProps = state => ({
  isPending: state.autocompleteSearch.isPending,
  citiesFound: state.autocompleteSearch.cities,
  requestError: state.autocompleteSearch.error,
  selectedCityName: state.autocompleteSelect.selected,
  selectedCity: state.autocompleteSelect.data,
});

const mapDispathToProps = dispatch => ({
  autocompleteSearch: name => dispatch(searchCities(name)),
  setCityName: city => dispatch(setSlectedCityName(city))
});

function WeatherForecast({
  citiesFound, isPending, autocompleteSearch, requestError, selectedCity,
  setCityName, selectedCityName
}) {

  useEffect(() => {
    if (selectedCityName === '') {
      setCityName('Tel Aviv');
    }
    return () => { };
  }, [setCityName, selectedCity, selectedCityName]);

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
              <CurrentConditions city={selectedCity} />
              <Forecast city={selectedCity} />
            </Paper>
          )
        }
      </Container>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispathToProps)(WeatherForecast);