'use strict';

const axios = require('axios');
const WeatherForecast = require('../models/WeatherForecast.model');

//handling weather bit api GET requests
let weatherBitController = async (req, res) => {
    console.log('hi there');
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat && lon) {
        let weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
        let weather_bit_response = await axios.get(weather_url);
        let weatherData = weather_bit_response.data;
        if (weatherData) {
            let filteredData = weatherData.data.map(element => {
                return new WeatherForecast(element.datetime, element.app_min_temp, element.app_max_temp, element.weather.description);
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

module.exports = weatherBitController;
