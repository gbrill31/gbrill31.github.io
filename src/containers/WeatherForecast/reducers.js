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

import autocompleteCities from '../../autocomplete.json';

const INITIAL_STATE = {
  search: {
    isPending: false,
    cities: [],
    error: null,
    selected: null,
    city: null
  },
  weatherConditions: {
    isPending: false,
    currentConditions: null,
    error: null
  },
  weatherForecast: {
    isPending: false,
    forecast: null,
    error: null
  }
}

const autocomplete = (state = INITIAL_STATE.search, action = {}) => {
  switch (action.type) {
    case ON_AUTOCOMPLETE_PENDING:
      return { ...state, isPending: true };
    case ON_AUTOCOMPLETE_SUCCESS:
      return { ...state, isPending: false, cities: action.payload };
    case ON_AUTOCOMPLETE_FAILED:
      return { ...state, isPending: false, error: action.payload };
    case ON_AUTOCOMPLETE_SELECTED:
      return { ...state, selected: action.payload };
    case ON_AUTOCOMPLETE_SELECTED_DATA:
      const cityObj = autocompleteCities.find(city => city.LocalizedName.toLowerCase() === action.payload.toLowerCase());
      // const cityObj = state.cities.find(city => city.LocalizedName.toLowerCase() === action.payload.toLowerCase());
      return { ...state, city: cityObj };
    default:
      return state;
  }
};

const weatherConditions = (state = INITIAL_STATE.weatherConditions, action = {}) => {
  switch (action.type) {
    case ON_REQUEST_CURRENT_CONDITIONS_PENDING:
      return { ...state, isPending: true };
    case ON_REQUEST_CURRENT_CONDITIONS_SUCCESS:
      return { ...state, currentConditions: action.payload, isPending: false };
    case ON_REQUEST_CURRENT_CONDITIONS_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

const weatherForecast = (state = INITIAL_STATE.weatherForecast, action = {}) => {
  switch (action.type) {
    case ON_REQUEST_FORECAST_PENDING:
      return { ...state, isPending: true };
    case ON_REQUEST_FORECAST_SUCCESS:
      return { ...state, forecast: action.payload, isPending: false };
    case ON_REQUEST_FORECAST_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

export {
  autocomplete,
  weatherConditions,
  weatherForecast
}