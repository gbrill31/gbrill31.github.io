import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './CurrentConditions.scss';


import {
  getCityCurrentConditions
} from '../../containers/WeatherForecast/actions';

const mapStateToProps = state => ({
  currentConditions: state.weatherConditions.currentConditions,
  conditionsError: state.weatherConditions.error,
});

const mapDispathToProps = dispatch => ({
  getCurrentConditions: city => dispatch(getCityCurrentConditions(city))
});



const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    boxShadow: 'none'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150
  }
}));

function CurrentConditions({
  city, getCurrentConditions, currentConditions, conditionsError
}) {
  const classes = useStyles();

  useEffect(() => {
    getCurrentConditions(city);
  }, [getCurrentConditions, city]);

  useEffect(() => {
    if (conditionsError) {
      toast.error(conditionsError, { autoClose: false });
    }

  }, [conditionsError]);

  const getTemprature = () => {
    const units = currentConditions.Temperature.Metric.Unit === 'C' ? 'celsius' : 'fahrenheit';
    return `${currentConditions.Temperature.Metric.Value}º (${units})`;
  }

  return currentConditions && (
    <div className="currentConditionsWrapper">
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={require(`../../weatherIcons/${currentConditions.WeatherIcon}.svg`)}
          title={currentConditions.WeatherText}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h3" variant="h3">
              {city.LocalizedName}
            </Typography>
            <Typography component="h5" variant="h5">
              {getTemprature()}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentConditions.WeatherText}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  )
};

export default connect(mapStateToProps, mapDispathToProps)(CurrentConditions);