# city-explorer-api

Author: Hasnaa Version: 1.0.0

## Overview

This application is an API that provides info for cities, just as:

1. weather info for cities by passing the city's latitude and longitude coordinations.
2. Movies that contain the name of the city.

## Getting Started

Create a GET request using the API's URIs: 

* 3 days weather info API for Amman, Paris, and Seattle: `http://localhost:8000/old_weather?lat=${LAT}&lon=${LON}&searched_city=${YOUR CITY NAME}`

* 16 days weather info API: `http://localhost:8000/weather?lat=${LAT}&lon=${LON}`

* Movies/city API: `http://localhost:8000/movies?city_name=${YOUR CITY NAME}`

## Architecture

* JS
* Node.js
* Nodemon
* Express
* Dotenv
* Cors

## Change Log

13-09-2021 07:00pm - Now, this is a server that works as an API to show weather info for certain locations.
14-09-2021 05:00pm - Now, this server is connected to weatherbit API to show weather info for 16 days for certain locations.
14-09-2021 07:35pm - Now, this server is connected to movedB API to show movies for certain locations.

## Credit and Collaborations

## Features

### Feature .1 - Location Weather API

Estimate of time needed to complete: 4 hours
Start time: 3:00 pm
Finish time: 7:00 pm
Actual time needed to complete: 4 hours

### Feature .2 - Location Weather API Using Weather Bit

Estimate of time needed to complete: 3h
Start time: 2:30 pm
Finish time: 5:00 pm
Actual time needed to complete: 3:30 hours

### Feature .3 - Added MoviedB Search for Each Location

Estimate of time needed to complete: 2 hours
Start time: 6 pm
Finish time: 7:34 pm
Actual time needed to complete: 1:30 hour

