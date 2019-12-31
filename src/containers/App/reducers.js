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

const INITIAL_STATE = {
  search: {
    isPending: false,
    cities: [],
    error: ''
  },
  city: {
    selected: '',
    data: null
  },
  weatherConditions: {
    isPending: false,
    currentConditions: null,
    error: ''
  },
  weatherForecast: {
    isPending: false,
    forecast: null,
    error: ''
  }
}

const autocompleteSearch = (state = INITIAL_STATE.search, action = {}) => {
  switch (action.type) {
    case ON_AUTOCOMPLETE_PENDING:
      return { ...state, isPending: true };
    case ON_AUTOCOMPLETE_SUCCESS:
      return { ...state, isPending: false, cities: action.payload };
    case ON_AUTOCOMPLETE_FAILED:
      return { ...state, isPending: false, error: action.payload };
    default:
      return state;
  }
};

const autocompleteSelect = (state = INITIAL_STATE.city, action = {}) => {
  switch (action.type) {
    case ON_AUTOCOMPLETE_SELECTED:
      return { ...state, selected: action.payload };
    case ON_AUTOCOMPLETE_SELECTED_DATA:
      return { ...state, data: action.payload };
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
  autocompleteSearch,
  autocompleteSelect,
  weatherConditions,
  weatherForecast
}