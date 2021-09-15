'use strict';

let axios = require('axios');
let Movie = require('../models/Movie.model');

let moviesController = async (req, res) => {
    console.log('hi there');
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

module.exports = moviesController;