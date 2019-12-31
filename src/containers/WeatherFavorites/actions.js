import {
  ON_FAVORITES_SAVE,
  ON_FAVORITES_LOAD
} from './constants';

const loadStorageFavorites = () => {
  return JSON.parse(localStorage.getItem('weather-favorites')) || [];
}

const saveCityToStorage = (city) => {
  const saved = loadStorageFavorites();
  saved.push(city);
  localStorage.setItem('weather-favorites', JSON.stringify(saved));
  return saved;
}

const loadFavorites = () => (dispatch) => {
  dispatch({
    type: ON_FAVORITES_LOAD,
    payload: loadStorageFavorites()
  });
}

const saveFavorite = city => (dispatch) => {
  const updatedFavorites = saveCityToStorage(city);
  dispatch({
    type: ON_FAVORITES_SAVE,
    payload: updatedFavorites
  });
};

export {
  saveFavorite,
  loadFavorites
};
