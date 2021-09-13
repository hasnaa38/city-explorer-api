'use strict';

//initialization
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

//port
let PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

// Query parameters: lat, lon, and searchQuery (City Name searched)
// Response: an array that contains objects, each object contains: description ("Low of 17.1, high of 23.6 with broken clouds") and date

//importing weather.json data
const weatherData = require('./data/weather.json');

app.get('/weather', (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let searched_city = req.query.searched_city;
    let available_city;
    if (lat && lon && searched_city) {
        //To find the object of the chosen city
        let chosenCity = weatherData.find(obj => {
            if((obj.city_name === searched_city) && (Number(obj.lat) === lat) && (Number(obj.lon) === lon)){
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
            res.status(400).send('We don\'t have weather info fot this input, try Amman, Seattle, or Paris, OR check you city coordinations');
        }
    } else {
        res.status(400).send('You didn\'t use the correct query parameters')
    }
    
})


// res.status(400).send('');


