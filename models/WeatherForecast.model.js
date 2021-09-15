'use strict';

//weather api model
class WeatherForecast {
    constructor(date, minTemp, maxTemp, description) {
        this.date = date;
        this.description = `Low of ${minTemp}, high of ${maxTemp} with ${description}`;
    }
}

module.exports = WeatherForecast;
