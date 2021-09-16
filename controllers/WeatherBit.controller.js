'use strict';

const axios = require('axios');
const WeatherForecast = require('../models/WeatherForecast.model');

//cache
const Cache = require('../utils/cache');
let weather_cache = new Cache({});

//handling weather bit api GET requests
let weatherBitController = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let currentQueries = {
        currentLat: lat,
        currentLon: lon,
    }
    if (lat && lon) { //if the queries were provided
        let weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
        let time_now = new Date().getMinutes();
        let clearCacheFlag = Math.abs(time_now - weather_cache.timestamp) % 5 === 0; //its true every 5 minutes
        if ((weather_cache.data.length > 0) && (JSON.stringify(weather_cache.queries) === JSON.stringify(currentQueries)) && !clearCacheFlag) { //check the cache
            console.log('am in cache');
            res.status(200).json({ 'data': weather_cache.data, 'source': 'cache', 'time': weather_cache.timestamp });
        } else {
            let weather_bit_response = await axios.get(weather_url);
            let weatherData = weather_bit_response.data;
            if (weatherData) {
                let filteredData = weatherData.data.map(element => {
                    return new WeatherForecast(element.datetime, element.app_min_temp, element.app_max_temp, element.weather.description);
                })
                weather_cache.data = filteredData;
                weather_cache.queries = currentQueries;
                weather_cache.timestamp = time_now //setting the timestamp
                res.status(200).json({'data': filteredData, 'source': 'API'});
            } else {
                res.status(400).send({
                    message: 'No weather data for this city.',
                    status: 400,
                })
            }
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
