import React, { useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "react-toastify/dist/ReactToastify.css";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import WeatherFavorites from "../WeatherFavorites/WeatherFavorites";

import "./App.scss";

import { setTempratureUnits, setDarkMode } from "../../actions";

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.BOTTOM_LEFT,
});

function App() {
  const dispatch = useDispatch();

  const { units, isDarkModeOn } = useSelector((state) => state.global);

  const saveWeatherUnits = useCallback(
    (units) => dispatch(setTempratureUnits(units)),
    [dispatch]
  );
  const setDarkModeState = useCallback((isOn) => dispatch(setDarkMode(isOn)), [
    dispatch,
  ]);

  const theme = createMuiTheme({
    palette: {
      type: isDarkModeOn ? "dark" : "light",
      primary: {
        main: "#272727",
        dark: "#09608e",
        light: "#e8e8e8",
        contrastText: "#fff",
      },
      secondary: {
        main: "#607d8b",
        dark: "#09608e",
        light: "#e8e8e8",
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="appRoot">
        <HeaderNav
          saveWeatherUnits={saveWeatherUnits}
          units={units}
          isDarkMode={isDarkModeOn}
          setIsDarkMode={setDarkModeState}
        />

        <main className="mainWrapper">
          <Switch>
            <Route exact path="/" component={WeatherForecast} />
            <Route exact path="/favorites" component={WeatherFavorites} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
