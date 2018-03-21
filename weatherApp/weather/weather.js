// API forescast KEY:51a2c30be6c829e6a0b75627eb2f4da2

const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/51a2c30be6c829e6a0b75627eb2f4da2/${latitude},${longitude}`,
        json: true    
    }, (error, response, body) => {
        if( error ){
            callback("Unable to connect to DarkSky Servers.");
        }
        else if( response.statusCode === 400 ){
            callback("Unable to fetch weather.");
        }
        else if( response.statusCode === 200 ){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {
    getWeather
}