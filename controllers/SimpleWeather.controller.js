'use strict';

const axios = require('axios');
const WeatherForecast = require('../models/WeatherForecast.model');
const weatherData = require('../data/weather.json');

let SimpleWeatherController = async(req, res) => {
    console.log('hi there');
    let old_lat = Number(req.query.lat);
    let old_lon = Number(req.query.lon);
    let searched_city = req.query.searched_city;
    let available_city;
    if (old_lat && old_lon && searched_city) {
        //To find the object of the chosen city
        let chosenCity = weatherData.find(obj => {
            if((obj.city_name === searched_city) && (Number(obj.lat) === old_lat) && (Number(obj.lon) === old_lon)){
                available_city = true;
                return obj.city_name;
            }
            else {
                available_city = false;
            }
        });
        //To generate the response for the chosen city
        if (available_city) {
            let foreCast = chosenCity.data.reduce((acc, element, index) => {
                acc[index] = {
                    date: element.valid_date,
                    description: `Low of ${element.app_min_temp}, high of ${element.app_max_temp} with ${element.weather.description}`,
                }
                return acc;
            }, []); 
            res.status(200).send(foreCast);
        } else {
            let unavailableCityError = {
                message: 'No weather data for this city. Try Amman, Seattle, or Paris',
                status: 400,
            };
            console.log(unavailableCityError);
            res.status(400).send(unavailableCityError);
        }
    } else {
        let noQsError = {
            message: 'Incorrect query parameters',
            status: 400,
        };
        console.log(noQsError);
        res.status(400).send(noQsError);
    }
    
}

module.exports = SimpleWeatherController;