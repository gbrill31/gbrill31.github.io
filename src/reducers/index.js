import { combineReducers } from "redux";

import weatherForecast from "./forecastReducer";
import favoritesReducer from "./favoritesReducer";
import global from "./globalReducer";

const rootReducer = combineReducers({
  forecast: weatherForecast,
  favorites: favoritesReducer,
  global,
});

export default rootReducer;
