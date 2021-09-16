'use strict';

let axios = require('axios');
let Movie = require('../models/Movie.model');

//cache
let Cache = require('../utils/cache');
let movies_cache = new Cache('');

let moviesController = async (req, res) => {
    let city_name = req.query.city_name;
    if (city_name) {
        let movie_db_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&page=1&query=${city_name}`;
        let time_now = new Date().getMinutes();
        let clearCacheFlag = Math.abs(time_now - movies_cache.timestamp) % 5 === 0; //its true every 5 minutes
        if (movies_cache.data.length > 0 && movies_cache.queries===city_name && !clearCacheFlag) {
            res.status(200).json({ 'data': movies_cache.data, 'source': 'cache', 'time': movies_cache.timestamp });
        } else {
            let movie_db_response = await axios.get(movie_db_url);
            let moviesData = movie_db_response.data.results;
            if (moviesData.length > 0) {
                let filteredMovies = moviesData.map(element => {
                    let poster_image = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
                    return new Movie(element.title, element.overview, element.vote_average, element.vote_count, poster_image, element.popularity, element.release_date);
                });
                movies_cache.data = filteredMovies;
                movies_cache.queries = city_name;
                movies_cache.timestamp = time_now //setting the timestamp
                res.status(200).json({ 'data': filteredMovies, 'source': 'API' });
            } else {
                res.status(400).send(
                    {
                        message: 'No available movies for this city.',
                        status: 400,
                    }
                );
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

module.exports = moviesController;