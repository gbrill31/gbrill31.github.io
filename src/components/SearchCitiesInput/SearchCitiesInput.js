import React, { useState, useCallback } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { debounce } from "debounce";
import { useSelector, useDispatch } from "react-redux";
import { TextField, CircularProgress } from "@material-ui/core";

import "./SearchCitiesInput.scss";

import { searchCities } from "../../actions";

function SearchCitiesInput({ setSelectedCity, isDarkMode }) {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [isSearchInputError, setIsSearchInputError] = useState(false);

  const { isSearchPending, foundCities } = useSelector((state) => state.global);

  const autocompleteSearch = useCallback(
    (name) => dispatch(searchCities(name)),
    [dispatch]
  );

  const searchAutocomplete = useCallback((val) => autocompleteSearch(val), [
    autocompleteSearch,
  ]);
  const getSearchAutocomplete = useCallback(debounce(searchAutocomplete, 500), [
    searchAutocomplete,
  ]);

  const handleSearchChange = (e) => {
    if (e.target.value !== "" && /^[a-zA-Z_ ]*$/g.test(e.target.value)) {
      setSearchInput(e.target.value);
      getSearchAutocomplete(e.target.value);
      setIsSearchInputError(false);
    } else {
      setIsSearchInputError(true);
    }
  };

  const handleSearchSelection = (event, cityName) => {
    if (cityName) {
      const cityObj = foundCities.find(
        (city) => city.LocalizedName.toLowerCase() === cityName.toLowerCase()
      );
      setSelectedCity(cityObj);
      autocompleteSearch("");
      setSearchInput("");
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="weather-autocomplete-search"
      className="autocompleteField"
      inputValue={searchInput}
      options={foundCities.map((city) => city.LocalizedName)}
      loading={isSearchPending}
      blurOnSelect
      clearOnEscape
      disableClearable
      noOptionsText="No cities found..."
      onFocus={() => {
        autocompleteSearch("");
      }}
      onBlur={() => setIsSearchInputError(false)}
      onChange={handleSearchSelection}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            style={{
              backgroundColor: isDarkMode
                ? "rgba(0 ,0 ,0, 0.7)"
                : "rgba(250 ,250 ,250, 0.7)",
            }}
            label={`Search City ${
              isSearchInputError ? "(*English characters only)" : ""
            }`}
            margin="normal"
            variant="filled"
            // color="secondary"
            error={isSearchInputError}
            fullWidth
            onChange={handleSearchChange}
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: (
                <>
                  {isSearchPending ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
}

export default SearchCitiesInput;
