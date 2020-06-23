import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Unsplash from "unsplash-js";
import { Container, Paper, Button, Fab } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import { useGeolocation } from "../../hooks/useGeolocation";
import SearchCitiesInput from "../../components/SearchCitiesInput/SearchCitiesInput";
import CurrentConditions from "../../components/CurrentConditions/CurrentConditions";
import Forecast from "../../components/Forecast/Forecast";

import { requestGeoLocation } from "../../weatherapi/weatherService";

import { saveFavorite, setSlectedCity } from "../../actions";

import "./WeatherForecast.scss";

const unsplash = new Unsplash({
  accessKey: "07b05aadc071c805fe2fe28c70c0666509b1690d3b7d23cb080af1b2fa530899",
  headers: {
    SameSite: "None",
    "Set-Cookie": "promo_shown=1; Max- Age=2600000; Secure",
  },
});

const DEFAULT_CITY = "Tel Aviv";

function WeatherForecast() {
  const dispatch = useDispatch();

  const [bgPhoto, setBgPhoto] = useState("");
  const { latitude, longitude, geoError } = useGeolocation();

  const { city: selectedCity, items: favorites } = useSelector(
    (state) => state.favorites
  );

  const { units: tempratureUnits, isDarkModeOn } = useSelector(
    (state) => state.global
  );

  const saveToFavorites = useCallback((city) => dispatch(saveFavorite(city)), [
    dispatch,
  ]);
  const setForecastCity = useCallback(
    (city) => dispatch(setSlectedCity(city)),
    [dispatch]
  );

  const loadBgImage = useCallback(({ results }) => {
    let path = require("../../images/default_bg.jpg");
    if (results.length) {
      path = results[0].urls.full;
    }
    const img = new Image();
    img.onload = () => {
      setBgPhoto(path);
    };
    img.src = path;
  }, []);

  const setSelectedCity = useCallback(
    (city) => {
      setForecastCity(city);
    },
    [setForecastCity]
  );

  useEffect(() => {
    let isRequestCancelled = false;
    const getGeolocationCity = async () => {
      try {
        const city = await requestGeoLocation(latitude, longitude);
        if (!isRequestCancelled) {
          if (!city.message && !city.Message) {
            setSelectedCity(city);
          } else {
            setSelectedCity(DEFAULT_CITY);
          }
        }
      } catch (err) {
        setSelectedCity(DEFAULT_CITY);
      }
    };
    getGeolocationCity();

    return () => {
      isRequestCancelled = true;
    };
  }, [geoError, latitude, longitude, setSelectedCity]);

  useEffect(() => {
    if (selectedCity) {
      unsplash.search
        .photos(selectedCity.LocalizedName, 1, 3, { orientation: "landscape" })
        .then((res) => res.json())
        .then((data) => {
          loadBgImage(data);
        })
        .catch((err) => console.log(err));
    }

    return () => {};
  }, [loadBgImage, selectedCity]);

  const isInFavorites = () => {
    const isSaved =
      typeof favorites.find((city) => city.Key === selectedCity.Key) ===
      "object";
    return isSaved;
  };

  return (
    <Fragment>
      <Container
        maxWidth="xl"
        className="forecastContainer"
        style={{
          backgroundImage: `url(${bgPhoto})`,
        }}
      >
        <div className="forecastSearch">
          <SearchCitiesInput
            setSelectedCity={setSelectedCity}
            isDarkMode={isDarkModeOn}
          />
          <Fab
            color="secondary"
            aria-label="current location"
            size="medium"
            onClick={async () => {
              try {
                const city = await requestGeoLocation(latitude, longitude);
                setSelectedCity(city);
              } catch (err) {}
            }}
            style={{
              transform: "translate(0, 3px)",
            }}
          >
            <MyLocationIcon />
          </Fab>
        </div>
        {selectedCity && (
          <Paper
            elevation={0}
            variant="outlined"
            className="forecastPaperWrapper"
            style={{
              backgroundColor: isDarkModeOn
                ? "rgba(0,0,0,0.7)"
                : "rgba(255,255,255,0.7)",
            }}
          >
            <div className="forecastHeader">
              <CurrentConditions
                className="justifyLeft"
                city={selectedCity}
                tempratureUnits={tempratureUnits}
                isInFavorites={isInFavorites()}
                isDarkMode={isDarkModeOn}
              />
              <Button
                onClick={() => {
                  saveToFavorites(selectedCity);
                }}
                variant="contained"
                color="secondary"
                className="addToFavoritesBtn"
                disabled={isInFavorites()}
                startIcon={<FavoriteIcon />}
              >
                Add To Favorites
              </Button>
            </div>
            <Forecast
              city={selectedCity}
              units={tempratureUnits}
              isDarkMode={isDarkModeOn}
            />
          </Paper>
        )}
      </Container>
    </Fragment>
  );
}

export default WeatherForecast;
