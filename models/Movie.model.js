'use strict';

//movie db api model
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

module.exports = Movie;
