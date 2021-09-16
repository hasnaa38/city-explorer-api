'use strict';

//initialization
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config();

//importing controllers
let weatherBitController = require('./controllers/WeatherBit.controller');
let moviesController = require('./controllers/MoviesdB.controller');
let simpleWeatherController = require('./controllers/SimpleWeather.controller');

//integrating port to app
let PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

// Simple weather API - simple_weather?lat=${LAT}&lon=${LON}&searched_city=${YOUR CITY NAME}
app.get('/simple_weather', simpleWeatherController);

//my weather api
// Weather Bit API - /weather?lat=${LAT}&lon=${LON}
app.get('/weather', weatherBitController);

//my movies api
// Movies db API - /movies?city_name=${YOUR CITY NAME}
app.get('/movies', moviesController);
