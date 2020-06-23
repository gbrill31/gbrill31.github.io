import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, CircularProgress } from "@material-ui/core";

import "./Forecast.scss";

import { getCityForecast } from "../../actions";

function Forecast({ city, units, isDarkMode }) {
  const dispatch = useDispatch();

  const { data: forecast, isPending: isLoading } = useSelector(
    (state) => state.forecast
  );

  const getForecast = useCallback(
    (city, units) => dispatch(getCityForecast(city, units)),
    [dispatch]
  );

  useEffect(() => {
    getForecast(city);

    return () => {};
  }, [getForecast, city]);

  const getDayOfTheWeek = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(date).getDay()];
  };

  return forecast && !isLoading ? (
    <div className="forecastWrapper">
      <Typography className="forecastHeaderText" component="h4" variant="h4">
        {forecast.Headline.Text}
      </Typography>
      <div className="forecastDaysWrapper">
        {forecast.DailyForecasts.map((item) => (
          <div
            className="forecastDay"
            key={item.EpochDate}
            style={{
              backgroundColor: isDarkMode ? "#888" : "",
            }}
          >
            <h3>{getDayOfTheWeek(item.Date)}</h3>
            <img
              className="dayIcon"
              src={require(`../../weatherIcons/${item.Day.Icon}.svg`)}
              alt={item.IconPhrase}
              style={{
                filter: isDarkMode ? "invert(1)" : "",
              }}
            />
            <h4>{item.Day.IconPhrase}</h4>
            <h5 className="forecastDayTemp">{`Low: ${item.Temperature.Minimum.Value}º`}</h5>
            <h5 className="forecastDayTemp">{`High: ${item.Temperature.Maximum.Value}º`}</h5>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="forecastLoader">
      <h5>{`Loading ${city.LocalizedName} Weather Forecast ...`}</h5>
      <CircularProgress color="inherit" size={100} />
    </div>
  );
}

export default Forecast;
