import { config, apiRequests } from './weatherConfig';
import autocompleteCities from '../autocomplete.json';

/** For local use */
// import forecast from '../forecast.json';
// import selectedCurrentConditions from '../currentWeather.json';

const requestCitySearch = async (cityName) => {
  // try {
  //   const res = await fetch(`${apiRequests.autocomplete}?apikey=${config.key}&q=${cityName}`);
  //   const data = await res.json();
  //   return data;
  // } catch (err) {
  //   return err;
  // }

  /**For local use */
  return autocompleteCities.filter(city => city.LocalizedName.toLowerCase().includes(cityName.toLowerCase()));
};


const requestForecast = async (city) => {
  try {
    const res = await fetch(`${apiRequests.forecast}${city.Key}?apikey=${config.key}&metric=true`);
    const data = await res.json();
    if (!data.message) {
      return data;
    } else {
      return data.message;
    }
  } catch (err) {
    return err;
  }

  /**For local use */
  // return forecast;

};

const requestCurrentConditions = async (city) => {
  try {
    const res = await fetch(`${apiRequests.currentConditions}${city.Key}?apikey=${config.key}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }

  /**For local use */
  // return selectedCurrentConditions[0];
};

export {
  requestCitySearch,
  requestForecast,
  requestCurrentConditions
}