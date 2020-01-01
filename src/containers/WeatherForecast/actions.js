import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
  ON_AUTOCOMPLETE_SELECTED,
  ON_SET_SELECTED_CITY_DATA,
  ON_REQUEST_FORECAST_PENDING,
  ON_REQUEST_FORECAST_SUCCESS,
  ON_REQUEST_FORECAST_FAILED
} from './constants';

import { config, apiRequests } from '../../api/weatherConfig';
import autocompleteCities from '../../autocomplete.json';
import forecast from '../../forecast.json';


const requestCitySearch = async (name) => {
  // try {
  //   const res = await fetch(`${apiRequests.autocomplete}?apikey=${config.key}&q=${name}`);
  //   const data = await res.json();
  //   return data;
  // } catch (err) {
  //   return err;
  // }

  /**For local use */
  return autocompleteCities.filter(city => city.LocalizedName.toLowerCase().includes(name.toLowerCase()));
}


const autocompleteSearch = async (name, dispatch) => {
  if (name.length) {
    dispatch({ type: ON_AUTOCOMPLETE_PENDING });
    try {
      const data = await requestCitySearch(name);
      if (!data.message) {
        dispatch({
          type: ON_AUTOCOMPLETE_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: ON_AUTOCOMPLETE_FAILED,
          payload: data.message
        });
      }

    } catch (err) {
      dispatch({
        type: ON_AUTOCOMPLETE_FAILED,
        payload: err.Message
      });
    }

  } else {
    dispatch({
      type: ON_AUTOCOMPLETE_SUCCESS,
      payload: []
    });
  }
}

const requestForecast = async (city, dispatch) => {
  // try {
  //   dispatch({ type: ON_REQUEST_FORECAST_PENDING });
  //   const res = await fetch(`${apiRequests.forecast}${city.Key}?apikey=${config.key}&metric=true`);
  //   const data = await res.json();
  //   if (!data.message) {
  //     dispatch({
  //       type: ON_REQUEST_FORECAST_SUCCESS,
  //       payload: data
  //     });
  //   } else {
  //     dispatch({
  //       type: ON_REQUEST_FORECAST_FAILED,
  //       payload: data.message
  //     });
  //   }
  // } catch (err) {
  //   dispatch({
  //     type: ON_REQUEST_FORECAST_FAILED,
  //     payload: 'No weather forcast found'
  //   });
  // }

  /**For local use */
  dispatch({ type: ON_REQUEST_FORECAST_PENDING });
  setTimeout(() => {
    dispatch({
      type: ON_REQUEST_FORECAST_SUCCESS,
      payload: forecast
    });
  }, 2000);

}

const setSelectedCity = async (name, dispatch) => {
  try {
    const data = await requestCitySearch(name);
    dispatch({
      type: ON_AUTOCOMPLETE_SUCCESS,
      payload: data
    });
    dispatch({
      type: ON_SET_SELECTED_CITY_DATA,
      payload: name
    })
  } catch (err) {
    dispatch({
      type: ON_AUTOCOMPLETE_FAILED,
      payload: err.Message
    });
  }
}

const setSlectedCityName = cityName => (dispatch) => {
  dispatch({
    type: ON_AUTOCOMPLETE_SELECTED,
    payload: cityName
  });
  setSelectedCity(cityName, dispatch);
}

const searchCities = name => (dispatch) => {
  autocompleteSearch(name, dispatch);
};

const getCityForecast = city => (dispatch) => {
  requestForecast(city, dispatch);
}


export {
  searchCities,
  setSlectedCityName,
  getCityForecast
};
