import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Typography
} from '@material-ui/core';

import './Forecast.scss';

import {
  getCityForecast
} from '../../containers/WeatherForecast/actions';

const mapStateToProps = state => ({
  forecast: state.weatherForecast.forecast,
  forecastError: state.weatherForecast.error,
});

const mapDispathToProps = dispatch => ({
  getForecast: city => dispatch(getCityForecast(city))
});


function Forecast({ city, forecast, getForecast, forecastError }) {

  useEffect(() => {
    getForecast(city);
  }, [getForecast, city]);

  useEffect(() => {
    if (forecastError) {
      toast.error(forecastError, { autoClose: false });
    }

  }, [forecastError]);


  const getDayOfTheWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
  }

  return forecast && (
    <div className="forecastWrapper">
      <Typography style={{ textAlign: 'center' }} component="h4" variant="h4">
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
              <h5>{`Low: ${item.Temperature.Minimum.Value}º`}</h5>
              <h5>{`High: ${item.Temperature.Maximum.Value}º`}</h5>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispathToProps)(Forecast);