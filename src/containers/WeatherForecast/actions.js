import {
  ON_SET_SELECTED_CITY_DATA,
  ON_REQUEST_FORECAST_PENDING,
  ON_REQUEST_FORECAST_SUCCESS,
  ON_REQUEST_FORECAST_FAILED
} from './constants';

import { requestCitySearch, requestForecast } from '../../weatherapi/weatherService';


const getForecast = async (city, units, dispatch) => {
  dispatch({ type: ON_REQUEST_FORECAST_PENDING });
  try {
    const forecast = await requestForecast(city, units);
    if (!forecast.message && !forecast.Message) {
      dispatch({
        type: ON_REQUEST_FORECAST_SUCCESS,
        payload: forecast
      });
    } else {
      dispatch({
        type: ON_REQUEST_FORECAST_FAILED,
        payload: 'Could not find weather forecast'
      });
    }

  } catch (err) {
    dispatch({
      type: ON_REQUEST_FORECAST_FAILED,
      payload: 'No weather forcast found'
    });
  }
}

const setSelectedCity = async (city, dispatch) => {
  try {
    if (!(typeof city === 'object')) {
      const foundCity = await requestCitySearch(city);
      dispatch({
        type: ON_SET_SELECTED_CITY_DATA,
        payload: foundCity[0]
      });
    } else {
      dispatch({
        type: ON_SET_SELECTED_CITY_DATA,
        payload: city
      });
    }
  } catch (err) {

  }
}

const setSlectedCity = city => (dispatch) => {
  setSelectedCity(city, dispatch);
}

const getCityForecast = (city, units) => (dispatch) => {
  getForecast(city, units, dispatch);
}


export {
  setSlectedCity,
  getCityForecast
};
