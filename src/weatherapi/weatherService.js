import axios from "axios";

/** For local use */
// import forecast from '../forecast.json';
// import selectedCurrentConditions from '../currentWeather.json';
// import autocompleteCities from '../autocomplete.json';

const requestCitySearch = async (cityName) => {
  console.log("serach");
  const { data } = await axios.get(`/weather/autocomplete?city=${cityName}`);
  return data;

  /**For local use */
  // return autocompleteCities.filter(city => city.LocalizedName.toLowerCase().includes(cityName.toLowerCase()));
};

const requestForecast = async (city, units) => {
  console.log("forecast request");
  const { data } = await axios.get(
    `/weather/forecast?citykey=${city.Key}&units=${units}`
  );
  return data;

  /**For local use */
  // return forecast;
};

const requestCurrentConditions = async (city) => {
  console.log("conditions request");
  const { data } = await axios.get(`/weather/conditions?citykey=${city.Key}`);
  return data;
  /**For local use */
  // return selectedCurrentConditions;
};

const requestGeoLocation = async (lat, lan) => {
  console.log("geolocation request");
  const { data } = await axios.get(
    `/weather/geolocation?lat=${lat}&lan=${lan}`
  );
  return data;
};

export {
  requestCitySearch,
  requestForecast,
  requestCurrentConditions,
  requestGeoLocation,
};
