import { FAVORITES } from "../consts";

const INITIAL_STATE = {
  favorites: {
    items: JSON.parse(localStorage.getItem("weather-favorites")) || [],
  },
};

const weatherFavorites = (state = INITIAL_STATE.favorites, action = {}) => {
  switch (action.type) {
    case FAVORITES.ON_FAVORITES_UPDATE:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export default weatherFavorites;
