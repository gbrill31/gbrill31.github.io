const router = require("express").Router();
const axios = require("axios");
const weatherAPI = require("../config/weather");

router.get("/autocomplete", (req, res) => {
  const { city } = req.query;
  axios
    .get(
      `${weatherAPI.autocomplete}?apikey=${process.env.WEATHER_KEY}&q=${city}`
    )
    .then(
      ({ data }) => {
        res.json(data).status(200);
      },
      (err) => {
        res.header(
          "notification",
          JSON.stringify({
            type: "error",
            message: "Could Not Load Cities From Autocomplete",
          })
        );
        res.status(err.response.status).json(err);
      }
    );
});

router.get("/conditions", (req, res) => {
  const { citykey } = req.query;
  axios
    .get(
      `${weatherAPI.currentConditions}${citykey}?apikey=${process.env.WEATHER_KEY}`
    )
    .then(
      ({ data }) => {
        res.json(data).status(200);
      },
      (err) => {
        res.header(
          "notification",
          JSON.stringify({
            type: "error",
            message: "Could Not Load Weather Conditions",
          })
        );
        res.status(err.response.status).json(err);
      }
    );
});

router.get("/forecast", (req, res) => {
  const { citykey, units } = req.query;
  const isMetric = units === "C";
  axios
    .get(
      `${weatherAPI.forecast}${citykey}?apikey=${process.env.WEATHER_KEY}&metric=${isMetric}`
    )
    .then(
      ({ data }) => {
        res.json(data).status(200);
      },
      (err) => {
        res.header(
          "notification",
          JSON.stringify({
            type: "error",
            message: "Could Not Load Weather Forecast",
          })
        );
        res.status(err.response.status).json(err);
      }
    );
});

router.get("/geolocation", (req, res) => {
  const { lat, lan } = req.query;
  axios
    .get(
      `${weatherAPI.geolocation}?apikey=${process.env.WEATHER_KEY}&q=${lat},${lan}`
    )
    .then(
      ({ data }) => {
        res.json(data).status(200);
      },
      (err) => {
        res.header(
          "notification",
          JSON.stringify({
            type: "error",
            message: "Could Not Load Weather By Geo Location",
          })
        );
        res.status(err.response.status).json(err);
      }
    );
});

module.exports = router;
