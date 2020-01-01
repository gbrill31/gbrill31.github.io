import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Card, CardContent, Typography, CardMedia, Icon, LinearProgress
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

import './CurrentConditions.scss';
import { config, apiRequests } from '../../api/weatherConfig';
import selectedCurrentConditions from '../../currentWeather.json';


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
    padding: '16px 16px 0 0'
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
  const [isLoadingConditions, setIsLoadingConditions] = useState(false);


  useEffect(() => {
    let isRequestCancelled = false;
    const requestCurrentConditions = async () => {
      // try {
      //   setIsLoadingConditions(true);
      //   const res = await fetch(`${apiRequests.currentConditions}${city.Key}?apikey=${config.key}`);
      //   const data = await res.json();
      //   if (!data.message && !isRequestCancelled) {
      //     setCurrentConditions(data[0]);
      //     setIsLoadingConditions(false);
      //   } else if(!isRequestCancelled) {
      //     toast.error(data.message, { autoClose: false });
      //     setIsLoadingConditions(false);
      //   }
      // } catch (err) {
      //    if (!isRequestCancelled) {
      //      toast.error('No current weather conditions found', { autoClose: false });
      //      setIsLoadingConditions(false);
      //    }

      // }

      /**For local use */

      setIsLoadingConditions(true);
      setTimeout(() => {
        if (!isRequestCancelled) {
          setIsLoadingConditions(false);
          setCurrentConditions(selectedCurrentConditions[0]);
        }
      }, 2000);
    };
    if (!currentConditions) {
      requestCurrentConditions();
    }

    return () => {
      isRequestCancelled = true;
    }
  }, [city, currentConditions]);

  const getTemprature = () => {
    const units = 'celsius';//currentConditions.Temperature.Metric.Unit === 'C' ? 'celsius' : 'fahrenheit';
    return `${currentConditions.Temperature.Metric.Value}º (${units})`;
  }

  return (

    <div className="currentConditionsWrapper">
      {
        currentConditions && !isLoadingConditions ? (
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={require(`../../weatherIcons/${currentConditions.WeatherIcon}.svg`)}
              title={currentConditions.WeatherText}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography className="cityNameHeader" component="h3" variant="h3">
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
        ) : (
            <div className="conditionsLoader">
              {`Loading ${city.LocalizedName} Weather Conditions...`}
              <LinearProgress color="secondary" style={{ width: '100%' }} />
            </div>
          )
      }
    </div>

  )
};

export default CurrentConditions;