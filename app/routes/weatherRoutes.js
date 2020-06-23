const router = require("express").Router();
const axios = require("axios");
const weatherAPI = require("../config/weather");

router.get("/autocomplete", (req, res) => {
  const { city } = req.query;
  axios
    .get(
      `${weatherAPI.autocomplete}?apikey=${process.env.WEATHER_KEY}&q=${city}`
    )
    .then(({ data }) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.sendStatus(403);
    });
});

router.get("/conditions", (req, res) => {
  const { citykey } = req.query;
  axios
    .get(
      `${weatherAPI.currentConditions}${citykey}?apikey=${process.env.WEATHER_KEY}`
    )
    .then(({ data }) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.sendStatus(403);
    });
});

router.get("/forecast", (req, res) => {
  const { citykey, units } = req.query;
  const isMetric = units === "C";
  axios
    .get(
      `${weatherAPI.forecast}${citykey}?apikey=${process.env.WEATHER_KEY}&metric=${isMetric}`
    )
    .then(({ data }) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.sendStatus(403);
    });
});

router.get("/geolocation", (req, res) => {
  const { lat, lan } = req.query;
  axios
    .get(
      `${weatherAPI.geolocation}?apikey=${process.env.WEATHER_KEY}&q=${lat},${lan}`
    )
    .then(({ data }) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      res.sendStatus(403);
    });
});

module.exports = router;
