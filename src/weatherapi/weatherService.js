import { config, apiRequests } from './weatherConfig';

/** For local use */
import forecast from '../forecast.json';
import selectedCurrentConditions from '../currentWeather.json';
import autocompleteCities from '../autocomplete.json';


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


const requestForecast = async (city, units) => {
  // try {
  //   const res = await fetch(`${apiRequests.forecast}${city.Key}?apikey=${config.key}&metric=${units === 'C'}`);
  //   const data = await res.json();
  //   return data;
  // } catch (err) {
  //   return err;
  // }

  /**For local use */
  return forecast;

};

const requestCurrentConditions = async (city) => {
  // try {
  //   const res = await fetch(`${apiRequests.currentConditions}${city.Key}?apikey=${config.key}`)
  //   const data = await res.json();
  //   return data;
  // } catch (err) {
  //   return err;
  // }

  /**For local use */
  return selectedCurrentConditions;

};

const requestGeoLocation = async (lat, lan) => {
  try {
    const res = await fetch(`${apiRequests.geolocation}?apikey=${config.key}&q=${lat},${lan}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export {
  requestCitySearch,
  requestForecast,
  requestCurrentConditions,
  requestGeoLocation
}