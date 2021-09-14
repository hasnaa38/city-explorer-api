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
}


class Movie {
    constructor(title, overview, vote_average, vote_count, image_url, popularity, released_on) {
        this.title = title;
        this.overview = overview;
        this.average_votes = vote_average;
        this.total_votes = vote_count;
        this.image_url = image_url;
        this.popularity = popularity;
        this.released_on = released_on;
    }
}

//handling weather api GET requests
let handleWeather = async (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat && lon) {
        let weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
        let weather_bit_response = await axios.get(weather_url);
        let weatherData = weather_bit_response.data;
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

let handleMovies = async (req, res) => {
    let city_name = req.query.city_name;
    if (city_name) {
        let movie_db_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&page=1&query=${city_name}`;
        let movie_db_response = await axios.get(movie_db_url);
        let moviesData = movie_db_response.data.results;
        if (moviesData.length > 0) {
            let filteredMovies = moviesData.map(element => {
                let poster_image = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
                return new Movie(element.title, element.overview, element.vote_average, element.vote_count, poster_image, element.popularity, element.release_date);
            });
            res.status(200).send(filteredMovies);
        } else {
            res.status(400).send(
                {
                    message: 'No available movies for this city.',
                    status: 400,
                }
            );
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

let handleOldWeather = async(req, res) => {
    const weatherData = require('./data/weather.json');
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

//my old weather api
// URI: http://localhost:8000/old_weather?lat=${LAT}&lon=${LON}&searched_city=${YOUR CITY NAME}
app.get('/old_weather', handleOldWeather);

//my weather api
//URI: http://localhost:8000/weather?lat=${LAT}&lon=${LON}
app.get('/weather', handleWeather);

//my movies api
//URI: http://localhost:8000/movies?city_name=${YOUR CITY NAME}
app.get('/movies', handleMovies);

//integrating port to app
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
