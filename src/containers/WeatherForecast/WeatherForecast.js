import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  TextField, Container, CircularProgress, Paper
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrentConditions from '../../components/CurrentConditions/CurrentConditions';
import Forecast from '../../components/Forecast/Forecast';

import './WeatherForecast.scss';

import {
  searchCities,
  setSlectedCityName
} from './actions';

const mapStateToProps = state => ({
  isPending: state.autocomplete.isPending,
  citiesFound: state.autocomplete.cities,
  searchError: state.autocomplete.error,
  selectedCityName: state.autocomplete.selected,
  selectedCity: state.autocomplete.city,
});

const mapDispathToProps = dispatch => ({
  autocompleteSearch: name => dispatch(searchCities(name)),
  setCityName: city => dispatch(setSlectedCityName(city))
});

function WeatherForecast({
  citiesFound, isPending, autocompleteSearch, searchError, selectedCity,
  setCityName, selectedCityName
}) {

  useEffect(() => {
    if (selectedCityName === null) {
      setCityName('Tel Aviv');
      autocompleteSearch('Tel Aviv');
    }
    return () => { };
  }, [setCityName, selectedCity, selectedCityName, autocompleteSearch]);

  useEffect(() => {
    if (searchError) {
      toast.error(searchError);
    }

  }, [searchError]);


  return (
    <Fragment>
      <Container maxWidth="lg">
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