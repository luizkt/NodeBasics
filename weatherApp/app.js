const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, geoResult) => {
    if( errorMessage ) {
        console.log(errorMessage);
    }
    else {
        console.log(geoResult.address);
        weather.getWeather(geoResult.latitude, geoResult.longitude, (errorMessage, weatherResult) => {
            if ( errorMessage ) {
                console.log(errorMessage);
            }
            else {
                console.log(`It is currently ${weatherResult.temperature}, but it feels like ${weatherResult.apparentTemperature}.`);
            }
        });
    }
});

