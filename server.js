const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  // Pass to next layer of middleware
  next();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

//================ ROUTES ========================//
app.use("/weather", require("./app/routes/weatherRoutes"));
//The router should be last
app.use("/", require("./app/routes/routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
