import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Card, CardContent, Typography, CardMedia, Icon, LinearProgress
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { requestCurrentConditions } from '../../weatherapi/weatherService';

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
    padding: '16px 16px 0 0'
  },
  cover: {
    width: 150
  }
}));



function CurrentConditions({
  city, isInFavorites, tempratureUnits
}) {
  const classes = useStyles();
  const [currentConditions, setCurrentConditions] = useState(null);
  const [isLoadingConditions, setIsLoadingConditions] = useState(false);


  useEffect(() => {
    let isRequestCancelled = false;
    const getCurrentConditions = async () => {
      try {
        setIsLoadingConditions(true);
        const data = await requestCurrentConditions(city);
        if (!isRequestCancelled) {
          if (!data.message) {
            setCurrentConditions(data[0]);
            setIsLoadingConditions(false);
          } else {
            toast.error(data.message, { autoClose: false });
            setIsLoadingConditions(false);
          }
        }
      } catch (err) {
        if (!isRequestCancelled) {
          toast.error('No current weather conditions found', { autoClose: false });
          setIsLoadingConditions(false);
        }
      }
    };

    getCurrentConditions();

    return () => {
      isRequestCancelled = true;
    }
  }, [city, city.Key]);

  const getTemprature = () => {
    const isCelsuis = tempratureUnits === 'C';
    return `${currentConditions.Temperature[isCelsuis ? 'Metric' : 'Imperial'].Value}º (${tempratureUnits})`;
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
              <h5>{`Loading ${city.LocalizedName} Weather Conditions ...`}</h5>
              <LinearProgress color="secondary" style={{ width: '100%' }} />
            </div>
          )
      }
    </div>

  )
};

export default CurrentConditions;