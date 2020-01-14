const config = {
  key: 'rNISfoWAf49G1IJ5Xt2CaJ2DJdvleiAf'
};

const apiRequests = {
  autocomplete: `https://dataservice.accuweather.com/locations/v1/cities/autocomplete`, //?apikey&q=city key
  currentConditions: `https://dataservice.accuweather.com/currentconditions/v1/`, //city key?apikey
  forecast: `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`, //city key?apikey&metric=true
  geolocation: 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search'//?apikey&q=lat,lan
};

export {
  config,
  apiRequests
}