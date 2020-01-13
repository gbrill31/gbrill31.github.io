import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
  ON_TEMPRATURE_UNITS_UPDATE,
  ON_DARK_MODE_UPDATE
} from './constants';

import { requestCitySearch } from '../../weatherapi/weatherService';


const autocompleteSearch = async (cityName, dispatch) => {
  if (cityName.length) {
    dispatch({ type: ON_AUTOCOMPLETE_PENDING });
    try {
      const data = await requestCitySearch(cityName);
      if (!data.message && !data.Message) {
        dispatch({
          type: ON_AUTOCOMPLETE_SUCCESS,
          payload: data
        });
      } else {
        dispatch({
          type: ON_AUTOCOMPLETE_FAILED,
          payload: 'Could not find search results'
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

const searchCities = name => (dispatch) => {
  autocompleteSearch(name, dispatch);
};

const setTempratureUnits = units => (dispatch) => {
  dispatch({
    type: ON_TEMPRATURE_UNITS_UPDATE,
    payload: units
  })
}

const setDarkMode = isOn => (dispatch) => {
  dispatch({
    type: ON_DARK_MODE_UPDATE,
    payload: isOn
  })
}



export {
  searchCities,
  setTempratureUnits,
  setDarkMode
};
