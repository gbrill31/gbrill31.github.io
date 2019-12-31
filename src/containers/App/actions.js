import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
  ON_AUTOCOMPLETE_SELECTED,
  ON_AUTOCOMPLETE_SELECTED_DATA,
  ON_REQUEST_CURRENT_CONDITIONS_PENDING,
  ON_REQUEST_CURRENT_CONDITIONS_SUCCESS,
  ON_REQUEST_CURRENT_CONDITIONS_FAILED,
  ON_REQUEST_FORECAST_PENDING,
  ON_REQUEST_FORECAST_SUCCESS,
  ON_REQUEST_FORECAST_FAILED
} from './constants';

import { config, apiRequests } from '../../api/weatherConfig';
import autocompleteCities from '../../autocomplete.json';
import selectedCurrentConditions from '../../currentWeather.json';
import forecast from '../../forecast.json';


const autocompleteSearch = async (name, dispatch) => {
  const foundCities = name.length && autocompleteCities.filter(city => city.LocalizedName.toLowerCase().includes(name.toLowerCase()));
  dispatch({
    type: ON_AUTOCOMPLETE_SUCCESS,
    payload: foundCities || []
  });

  // if (name.length) {
  //   try {
  //     dispatch({ type: ON_AUTOCOMPLETE_PENDING });
  //     const res = await fetch(`${apiRequests.autocomplete}?apikey=${config.key}&q=${name}`);
  //     const data = await res.json();
  //     dispatch({
  //       type: ON_AUTOCOMPLETE_SUCCESS,
  //       payload: data
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: ON_AUTOCOMPLETE_FAILED,
  //       payload: err.Message
  //     });
  //   }
  // } else {
  //   dispatch({
  //     type: ON_AUTOCOMPLETE_SUCCESS,
  //     payload: []
  //   });
  // }
}

const requestCurrentConditions = async (city, dispatch) => {
  // try {
  //   dispatch({ type: ON_REQUEST_CURRENT_CONDITIONS_PENDING });
  //   const res = await fetch(`${apiRequests.currentConditions}${city.Key}?apikey=${config.key}`);
  //   const data = await res.json();
  //   dispatch({
  //     type: ON_REQUEST_CURRENT_CONDITIONS_SUCCESS,
  //     payload: data[0]
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: ON_REQUEST_CURRENT_CONDITIONS_FAILED,
  //     payload: err.Message
  //   });
  // }

  dispatch({
    type: ON_REQUEST_CURRENT_CONDITIONS_SUCCESS,
    payload: selectedCurrentConditions[0]
  });
}

const requestForecast = async (city, dispatch) => {
  // try {
  //   dispatch({ type: ON_REQUEST_FORECAST_PENDING });
  //   const res = await fetch(`${apiRequests.forecast}${city.Key}?apikey=${config.key}&metric=true`);
  //   const data = await res.json();
  //   dispatch({
  //     type: ON_REQUEST_FORECAST_SUCCESS,
  //     payload: data
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: ON_REQUEST_FORECAST_FAILED,
  //     payload: err.Message
  //   });
  // }
  dispatch({
    type: ON_REQUEST_FORECAST_SUCCESS,
    payload: forecast
  });
}

const setSlectedCity = (name, dispatch) => {
  const cityObj = autocompleteCities.find(city => city.LocalizedName.toLowerCase() === name.toLowerCase());
  dispatch({
    type: ON_AUTOCOMPLETE_SELECTED_DATA,
    payload: cityObj
  });
}

const setSlectedCityName = cityName => (dispatch) => {
  dispatch({
    type: ON_AUTOCOMPLETE_SELECTED,
    payload: cityName
  });
  setSlectedCity(cityName, dispatch);
}

const searchCities = name => (dispatch) => {
  autocompleteSearch(name, dispatch);
};

const getCityCurrentConditions = city => (dispatch) => {
  requestCurrentConditions(city, dispatch);
}

const getCityForecast = city => (dispatch) => {
  requestForecast(city, dispatch);
}

export {
  searchCities,
  setSlectedCityName,
  getCityCurrentConditions,
  getCityForecast
};
