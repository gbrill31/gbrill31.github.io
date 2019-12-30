import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
  ON_AUTOCOMPLETE_SELECTED,
  ON_SELECTED_CURRENT_CONDITIONS,
  ON_SELECTED_CURRENT_FORECAST
} from './constants';

import { config, apiRequests } from '../../api/weatherConfig';
import autocompleteCities from '../../autocomplete.json';
import selectedCurrentConditions from '../../currentWeather.json';
import forecast from '../../forecast.json';

// const isDevEnv = process.env.NODE_ENV === 'development';
// console.log(isDevEnv);

const autocompleteSearch = async (name, dispatch) => {
  const foundCities = name.length && autocompleteCities.filter(city => city.LocalizedName.toLowerCase().includes(name.toLowerCase()));
  dispatch({
    type: ON_AUTOCOMPLETE_SUCCESS,
    payload: foundCities || []
  });

  // try {
  //   dispatch({ type: ON_AUTOCOMPLETE_PENDING });
  //   const res = await fetch(`${apiRequests.autocomplete}?apikey=${config.key}&q=${name}`);
  //   const data = await res.json();
  //   dispatch({
  //     type: ON_AUTOCOMPLETE_SUCCESS,
  //     payload: name.length ? data : []
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: ON_AUTOCOMPLETE_FAILED,
  //     payload: err.Message
  //   });
  // }
}

const setSlectedCity = citySelected => (dispatch) => {
  const cityObj = autocompleteCities.find(city => city.LocalizedName.toLowerCase() === citySelected.toLowerCase());
  const data = selectedCurrentConditions[0];
  dispatch({
    type: ON_AUTOCOMPLETE_SELECTED,
    payload: cityObj
  });
  dispatch({
    type: ON_SELECTED_CURRENT_CONDITIONS,
    payload: data
  });
  dispatch({
    type: ON_SELECTED_CURRENT_FORECAST,
    payload: forecast
  });

  // try {
  //   dispatch({ type: ON_AUTOCOMPLETE_PENDING });
  //   const res = await fetch(`${apiRequests.currentConditions}/${citySelected.Key}?apikey=${config.key}`);
  //   const data = await res.json();
  //   dispatch({
  //     type: ON_AUTOCOMPLETE_SELECTED,
  //     payload: data
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: ON_AUTOCOMPLETE_FAILED,
  //     payload: err.Message
  //   });
  // }
}

const searchCities = name => (dispatch) => {
  autocompleteSearch(name, dispatch);
};

export {
  searchCities,
  setSlectedCity
};
