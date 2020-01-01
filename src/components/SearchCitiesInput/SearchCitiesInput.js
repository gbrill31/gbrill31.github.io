import React, { Fragment, useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  TextField, CircularProgress
} from '@material-ui/core';

import {
  searchCities
} from '../../containers/WeatherForecast/actions';

const mapStateToProps = state => ({
  isSearchPending: state.autocomplete.isPending,
  citiesFound: state.autocomplete.cities,
  searchError: state.autocomplete.error,
});

const mapDispathToProps = dispatch => ({
  autocompleteSearch: name => dispatch(searchCities(name))
});


function SearchCitiesInput({
  isSearchPending, citiesFound, searchError,
  autocompleteSearch, setCityName
}) {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchInputError, setIsSearchInputError] = useState(false);

  useEffect(() => {
    if (searchError) {
      toast.error(searchError);
    }
    return () => { };
  }, [searchError]);

  const handleSearchChange = (event) => {
    if (/^[a-zA-Z]*$/g.test(event.target.value)) {
      setSearchInput(event.target.value);
      autocompleteSearch(event.target.value);
      setIsSearchInputError(false);
    } else {
      setIsSearchInputError(true);
    }
  }

  return (
    <Autocomplete
      freeSolo
      id="weather-autocomplete-search"
      className="autocompleteField"
      inputValue={searchInput}
      options={citiesFound.map(city => city.LocalizedName)}
      loading={isSearchPending}
      blurOnSelect
      clearOnEscape
      noOptionsText="No cities found..."
      onFocus={() => {
        autocompleteSearch('');
      }}
      onChange={(event, city) => {
        if (city) {
          setCityName(city);
          autocompleteSearch('');
          setSearchInput('');
        }
      }}
      renderInput={params => {
        return (
          <TextField
            {...params}
            label={`
                  Search City ${isSearchInputError ? '(*English characters only)' : ''}
                `}
            style={{
              backgroundColor: '#fff'
            }}
            margin="normal"
            variant="filled"
            color="secondary"
            error={isSearchInputError}
            fullWidth
            onChange={handleSearchChange}
            InputProps={{
              ...params.InputProps,
              type: 'text',
              endAdornment: (
                <Fragment>
                  {isSearchPending ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )
      }}
    />
  )
}

export default connect(mapStateToProps, mapDispathToProps)(SearchCitiesInput);