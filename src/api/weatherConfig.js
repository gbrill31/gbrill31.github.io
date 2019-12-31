const config = {
  key: 'Mq6mGm0TnqchjtFJCG6Xw396tS1gnnJr'
};

const apiRequests = {
  autocomplete: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`, //?apikey&q=city key
  currentConditions: `http://dataservice.accuweather.com/currentconditions/v1/`, //city key?apikey
  forecast: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/` //city key?apikey&metric=true
};

export {
  config,
  apiRequests
}