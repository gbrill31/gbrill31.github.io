import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './CurrentConditions.scss';

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

function CurrentConditions({ city, currentConditions }) {
  const classes = useStyles();

  const getTemprature = () => {
    const units = currentConditions.Temperature.Metric.Unit === 'C' ? 'celsius' : 'fahrenheit';
    return `${currentConditions.Temperature.Metric.Value}º (${units})`;
  }

  return (
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

export default CurrentConditions;