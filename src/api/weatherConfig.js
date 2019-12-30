const config = {
  key: 'ZkGkoUAQQ2TbiQnAFghvfXctA1cDsxTT'
};

const apiRequests = {
  autocomplete: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`, //?apikey&q=city key
  currentConditions: `http://dataservice.accuweather.com/currentconditions/v1/`, //city key?apikey
  forcast: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/` //city key?apikey&metric=true
};

export {
  config,
  apiRequests
}