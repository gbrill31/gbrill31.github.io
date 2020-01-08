const config = {
  key: 'DQ0lupv9XxAZIslYBMNzjSrA3VcPJ9Yu'
};

const apiRequests = {
  autocomplete: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`, //?apikey&q=city key
  currentConditions: `http://dataservice.accuweather.com/currentconditions/v1/`, //city key?apikey
  forecast: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/`, //city key?apikey&metric=true
  geolocation: 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'//?apikey&q=lat,lan
};

export {
  config,
  apiRequests
}