import { GLOBAL } from "../consts";

import { requestCitySearch } from "../weatherapi";

const autocompleteSearch = async (cityName, dispatch) => {
  if (cityName.length) {
    dispatch({ type: GLOBAL.ON_AUTOCOMPLETE_PENDING });
    try {
      const data = await requestCitySearch(cityName);
      dispatch({
        type: GLOBAL.ON_AUTOCOMPLETE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: GLOBAL.ON_AUTOCOMPLETE_FAILED,
        payload: err.Message,
      });
    }
  } else {
    dispatch({
      type: GLOBAL.ON_AUTOCOMPLETE_SUCCESS,
      payload: [],
    });
  }
};

const searchCities = (name) => (dispatch) => {
  autocompleteSearch(name, dispatch);
};

const setTempratureUnits = (units) => (dispatch) => {
  dispatch({
    type: GLOBAL.ON_TEMPRATURE_UNITS_UPDATE,
    payload: units,
  });
};

const setDarkMode = (isOn) => (dispatch) => {
  dispatch({
    type: GLOBAL.ON_DARK_MODE_UPDATE,
    payload: isOn,
  });
};

export { searchCities, setTempratureUnits, setDarkMode };
