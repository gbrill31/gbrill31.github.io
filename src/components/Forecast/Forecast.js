import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Typography, CircularProgress
} from '@material-ui/core';

import './Forecast.scss';

import {
  getCityForecast
} from '../../containers/WeatherForecast/actions';

const mapStateToProps = state => ({
  forecast: state.weatherForecast.forecast,
  isLoading: state.weatherForecast.isPending,
  forecastError: state.weatherForecast.error,
  units: state.tempratureUnits.units
});

const mapDispathToProps = dispatch => ({
  getForecast: (city, units) => dispatch(getCityForecast(city, units))
});


function Forecast({
  city, forecast, getForecast, forecastError, isLoading, units
}) {

  const getCityForecast = useCallback((cityData) => {
    getForecast(cityData, units);
  }, [getForecast, units]);

  useEffect(() => {
    getCityForecast(city);

    return () => { };
  }, [getCityForecast, city]);

  useEffect(() => {
    if (forecastError) {
      toast.error(forecastError, { autoClose: false });
    }

  }, [forecastError]);


  const getDayOfTheWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
  }

  return forecast && !isLoading ? (
    <div className="forecastWrapper">
      <Typography className="forecastHeaderText" component="h4" variant="h4">
        {forecast.Headline.Text}
      </Typography>
      <div className="forecastDaysWrapper">
        {
          forecast.DailyForecasts.map(item => (
            <div className="forecastDay" key={item.EpochDate}>
              <h3>{getDayOfTheWeek(item.Date)}</h3>
              <img
                className="dayIcon"
                src={require(`../../weatherIcons/${item.Day.Icon}.svg`)}
                alt={item.IconPhrase}
              />
              <h4>{item.Day.IconPhrase}</h4>
              <h5 className="forecastDayTemp">{`Low: ${item.Temperature.Minimum.Value}º`}</h5>
              <h5 className="forecastDayTemp">{`High: ${item.Temperature.Maximum.Value}º`}</h5>
            </div>
          ))
        }
      </div>
    </div>
  ) : (
      <div className="forecastLoader">
        <h5>{`Loading ${city.LocalizedName} Weather Forecast ...`}</h5>
        <CircularProgress color="inherit" size={100} />
      </div>
    )
};

export default connect(mapStateToProps, mapDispathToProps)(Forecast);