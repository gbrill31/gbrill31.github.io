import {
  ON_SET_SELECTED_CITY_DATA,
  ON_REQUEST_FORECAST_PENDING,
  ON_REQUEST_FORECAST_SUCCESS,
  ON_REQUEST_FORECAST_FAILED

} from './constants';

const INITIAL_STATE = {
  weatherForecast: {
    isPending: false,
    city: null,
    forecast: null,
    error: null
  }
}

const weatherForecast = (state = INITIAL_STATE.weatherForecast, action = {}) => {
  switch (action.type) {
    case ON_REQUEST_FORECAST_PENDING:
      return { ...state, isPending: true };
    case ON_REQUEST_FORECAST_SUCCESS:
      return { ...state, forecast: action.payload, isPending: false };
    case ON_REQUEST_FORECAST_FAILED:
      return { ...state, error: action.payload, isPending: false };
    case ON_SET_SELECTED_CITY_DATA:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};

export {
  weatherForecast
}