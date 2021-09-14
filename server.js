'use strict';

//initialization
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config();

//port
let PORT = process.env.PORT;

//weather api forCast 
class ForCast {
    constructor(date, minTemp, maxTemp, description) {
        this.date = date;
        this.description = `Low of ${minTemp}, high of ${maxTemp} with ${description}`;
    }
};

//handling weather api GET requests
let handleWeather = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat && lon) {
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
        let weather_bit_response = await axios.get(url);
        let weatherData = weather_bit_response.data;
        console.log(weatherData);
        if (weatherData) {
            let filteredData = weatherData.data.map(element => {
                return new ForCast(element.datetime, element.app_min_temp, element.app_max_temp, element.weather.description);
            })
            res.status(200).json(filteredData);
        } else {
            res.status(400).send({
                message: 'No weather data for this city.',
                status: 400,
            })
        }
    } else {
        res.status(400).send(
            {
                message: 'Incorrect query parameters.',
                status: 400,
            }
        );
    }
};

//my weather api
app.get('/weather', handleWeather);

//integrating port to app
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
