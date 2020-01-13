import React, { Fragment, useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  TextField, CircularProgress
} from '@material-ui/core';

import './SearchCitiesInput.scss';

import {
  searchCities
} from '../../containers/App/actions';

const mapStateToProps = state => ({
  isSearchPending: state.autocomplete.isPending,
  citiesFound: state.autocomplete.cities,
  searchError: state.autocomplete.error,
});

const mapDispatchToProps = dispatch => ({
  autocompleteSearch: name => dispatch(searchCities(name))
});


function SearchCitiesInput({
  isSearchPending, citiesFound, searchError,
  autocompleteSearch, setSelectedCity, isDarkMode
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
    if (/^[a-zA-Z_ ]*$/g.test(event.target.value)) {
      setSearchInput(event.target.value);
      autocompleteSearch(event.target.value);
      setIsSearchInputError(false);
    } else {
      setIsSearchInputError(true);
    }
  }

  const handleSearchSelection = (event, cityName) => {
    if (cityName) {
      const cityObj = citiesFound.find(city => city.LocalizedName.toLowerCase() === cityName.toLowerCase());
      setSelectedCity(cityObj);
      autocompleteSearch('');
      setSearchInput('');
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
      disableClearable
      noOptionsText="No cities found..."
      onFocus={() => {
        autocompleteSearch('');
      }}
      onBlur={() => setIsSearchInputError(false)}
      onChange={handleSearchSelection}
      renderInput={params => {
        return (
          <TextField
            {...params}
            style={{
              backgroundColor: isDarkMode ? 'rgba(0 ,0 ,0, 0.7)' : 'rgba(250 ,250 ,250, 0.7)'
            }}
            label={`Search City ${isSearchInputError ? '(*English characters only)' : ''}`}
            margin="normal"
            variant="filled"
            // color="secondary"
            error={isSearchInputError}
            fullWidth
            onChange={handleSearchChange}
            InputProps={{
              ...params.InputProps,
              type: 'search',
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchCitiesInput);