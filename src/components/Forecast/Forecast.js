import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Card, CardContent, CardMedia, SvgIcon
} from '@material-ui/core';

import './Forecast.scss';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    maxWidth: 335,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    // width: '100%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


function Forecast({ forecast }) {
  // const classes = useStyles();
  const { Headline, DailyForecasts } = forecast;

  const getDayOfTheWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date(date).getDay()];
  }

  return (
    <div className="forecastWrapper">
      <Typography style={{ textAlign: 'center' }} component="h4" variant="h4">
        {Headline.Text}
      </Typography>
      <div className="forecastDaysWrapper">
        {
          DailyForecasts.map(item => (
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
            // <Card className={classes.card} key={item.EpochDate}>
            //   <CardMedia
            //     className={classes.cover}
            //     component={SvgIcon}
            //     fontSie="large"
            //     viewBox="0 0 75 75"
            //     image={require(`../../weatherIcons/${item.Day.Icon}.svg`)}
            //     title={item.IconPhrase}
            //   />
            //   <div className={classes.details}>
            //     <CardContent className={classes.content}>
            //       <Typography component="h5" variant="h5">
            //         {item.Day.IconPhrase}
            //       </Typography>
            //       <Typography variant="subtitle1" color="textSecondary">
            //         {`${item.Temperature.Minimum.Value}º`}
            //       </Typography>
            //     </CardContent>
            //   </div>
            // </Card>
          ))
        }
      </div>
    </div>
  );
};

export default Forecast;