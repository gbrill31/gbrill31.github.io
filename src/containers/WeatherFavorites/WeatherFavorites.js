import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";

import CurrentConditions from "../../components/CurrentConditions/CurrentConditions";
import PromptDialog from "../../components/PromptDialog/PromptDialog";

import "./WeatherFavorites.scss";

import { setSlectedCity, loadFavorites, clearFavorite } from "../../actions";

function WeatherFavorites() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isPrompt, setIsPrompt] = useState(false);

  const { items: favorites } = useSelector((state) => state.favorites);

  const { units: tempratureUnits, isDarkModeOn } = useSelector(
    (state) => state.global
  );

  const loadFromFavorites = useCallback(() => dispatch(loadFavorites()), [
    dispatch,
  ]);
  const clearAllFavorites = useCallback(() => dispatch(clearFavorite()), [
    dispatch,
  ]);
  const setForecastCity = useCallback(
    (city) => dispatch(setSlectedCity(city)),
    [dispatch]
  );

  useEffect(() => {
    loadFromFavorites();

    return () => {};
  }, [loadFromFavorites]);

  const handleOpenPrompt = () => {
    setIsPrompt(true);
  };

  const handleClosePrompt = () => {
    setIsPrompt(false);
  };

  const handleFavoriteSelection = (city) => {
    setForecastCity(city);
    history.push("/");
  };

  const hasFavorites = () => {
    return favorites.length > 0;
  };

  return (
    <Container
      maxWidth="xl"
      className="favoritesContainer"
      style={{
        backgroundColor: isDarkModeOn ? "#333" : "",
      }}
    >
      <h1
        style={{
          color: isDarkModeOn ? "#fff" : "",
        }}
      >
        Your Favorite Cities
      </h1>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenPrompt}
        disabled={!hasFavorites()}
      >
        Clear Favorites
      </Button>
      <div className="favoritesWrapper">
        {hasFavorites() &&
          favorites.map((city) => (
            <div
              key={city.Key}
              className="favoriteWrapper"
              style={{
                backgroundColor: isDarkModeOn ? "#888" : "",
              }}
            >
              <Button
                onClick={() => handleFavoriteSelection(city)}
                style={{
                  textTransform: "none",
                  border: "1px solid black",
                }}
              >
                <CurrentConditions
                  city={city}
                  tempratureUnits={tempratureUnits}
                  isDarkMode={isDarkModeOn}
                />
              </Button>
            </div>
          ))}
      </div>
      <PromptDialog
        isOpen={isPrompt}
        title="Clear Favorites"
        content="Are you sure you want to delete all your favorites ?"
        handleConfirm={clearAllFavorites}
        handleClose={handleClosePrompt}
      />
    </Container>
  );
}

export default WeatherFavorites;
