import {
  ON_AUTOCOMPLETE_PENDING,
  ON_AUTOCOMPLETE_SUCCESS,
  ON_AUTOCOMPLETE_FAILED,
} from './constants';

import { requestCitySearch } from '../../weatherapi/weatherService';


const autocompleteSearch = async (cityName, dispatch) => {
  if (cityName.length) {
    dispatch({ type: ON_AUTOCOMPLETE_PENDING });
    try {
      const data = await requestCitySearch(cityName);
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

const searchCities = name => (dispatch) => {
  autocompleteSearch(name, dispatch);
};



export {
  searchCities
};
