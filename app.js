const express = require('express');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');
const {
  JSDOM
} = require("jsdom");
const {
  window
} = new JSDOM("");
const $ = require("jquery")(window);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
  res.render("home");
});

app.post("/", function(req, res) {
  const query = _.startCase(req.body.cityName);
  const appKey = "08f9976ef053048ad3a6de68a750ecf5";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + appKey;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


      if (weatherDescription === "scattered clouds" || weatherDescription === "broken clouds") {

        res.render("cloudy", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else if (weatherDescription === "few clouds") {
        res.render("fewClouds", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else if (weatherDescription === "rain") {
        res.render("rain", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else if (weatherDescription === "shower rain") {
        res.render("heavyRain", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else if (weatherDescription === "thunderstorm") {
        res.render("thunder", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else if (weatherDescription === "snow") {
        res.render("snow", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else if (weatherDescription === "mist") {
        res.render("mist", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
        // THE PROBLEM IS ONE OF THE WEATHER IS NOT BEING RENDERED
      } else if (weatherDescription === "clear sky") {

        res.render("sunny", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })
      } else {

        res.render("other", {
          weatherDescription: weatherDescription,
          query: query,
          temp: temp,
          imageURL: imageURL,
          icon: icon
        })

      }

    });
  });
});



app.listen(3000, function() {
  console.log("Server is running on port 3000.")

});
