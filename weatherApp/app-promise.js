const yargs = require('yargs');
const axios = require('axios');
const randomAddress = require('randomaddressgenerator');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const generatedAddress = randomAddress();// Auto generated address
// console.log(generatedAddress);
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
            default: generatedAddress //If no address given it will be randomly generated
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('You have exceeded your daily request quota for this API.');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/51a2c30be6c829e6a0b75627eb2f4da2/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature} but it feels like ${apparentTemperature}.`);
    });
}).catch((e) => {
    if (e.code === 'ENOTFOUND'){
        console.log("Unable to connect to API servers.")
    }
    else {
        console.log(e.message);
    }
});