import {
  ON_FAVORITES_UPDATE
} from './constants';

const INITIAL_STATE = {
  favorites: {
    items: JSON.parse(localStorage.getItem('weather-favorites')) || []
  }
}


const weatherFavorites = (state = INITIAL_STATE.favorites, action = {}) => {
  switch (action.type) {
    case ON_FAVORITES_UPDATE:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export {
  weatherFavorites
}