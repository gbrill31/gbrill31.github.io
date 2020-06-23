import React, { useCallback, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "react-toastify/dist/ReactToastify.css";
import { HttpInterceptors } from "./utils";
import WeatherForecast from "./views/WeatherForecast/WeatherForecast";
import WeatherFavorites from "./views/WeatherFavorites/WeatherFavorites";
import HeaderNav from "./components/HeaderNav/HeaderNav";

import "./App.scss";

import { setTempratureUnits, setDarkMode } from "./actions";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { units, isDarkModeOn } = useSelector((state) => state.global);

  const saveWeatherUnits = useCallback(
    (units) => dispatch(setTempratureUnits(units)),
    [dispatch]
  );
  const setDarkModeState = useCallback((isOn) => dispatch(setDarkMode(isOn)), [
    dispatch,
  ]);

  useEffect(() => {
    HttpInterceptors.initInterceptors(history);
    return () => {
      HttpInterceptors.clearInterceptors();
    };
  }, [history]);

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
