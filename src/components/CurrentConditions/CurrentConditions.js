import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, CardMedia, Icon } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

import './CurrentConditions.scss';
import { config, apiRequests } from '../../api/weatherConfig';


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
  city, isInFavorites
}) {
  const classes = useStyles();
  const [currentConditions, setCurrentConditions] = useState(null);

  const requestCurrentConditions = useCallback(async (city) => {
    try {
      const res = await fetch(`${apiRequests.currentConditions}${city.Key}?apikey=${config.key}`);
      const data = await res.json();
      if (!data.message) {
        setCurrentConditions(data[0]);
      } else {
        toast.error(data.message, { autoClose: false });
      }
    } catch (err) {
      toast.error('No current weather conditions found', { autoClose: false });
    }
  }, []);

  useEffect(() => {
    requestCurrentConditions(city);
  }, [requestCurrentConditions, city]);

  const getTemprature = () => {
    const units = 'celsius';//currentConditions.Temperature.Metric.Unit === 'C' ? 'celsius' : 'fahrenheit';
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
              {
                isInFavorites && (
                  <Icon style={{ color: '#ab3f3f', marginLeft: '5px' }}>
                    <FavoriteIcon />
                  </Icon>
                )
              }
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