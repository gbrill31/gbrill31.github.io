import { FORECAST } from "../consts";

const INITIAL_STATE = {
  isPending: false,
  city: null,
  data: null,
  error: null,
};

const weatherForecast = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FORECAST.ON_REQUEST_FORECAST_PENDING:
      return { ...state, isPending: true };
    case FORECAST.ON_REQUEST_FORECAST_SUCCESS:
      return { ...state, data: action.payload, isPending: false };
    case FORECAST.ON_REQUEST_FORECAST_FAILED:
      return { ...state, error: action.payload, isPending: false };
    case FORECAST.ON_SET_SELECTED_CITY_DATA:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};

export default weatherForecast;
