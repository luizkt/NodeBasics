var request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        // key: 'AIzaSyBXHoKDqEHTqu4hAfjU0oxeD-9e6jzFfgQ',
        json: true    
    }, (error, response, body) => {
        if( error ){
            callback("Unable to connect to Google Servers.");
        }
        else if( body.status === "ZERO_RESULTS" ){
            callback("Unable to fetch the location");
        }
        else if ( body.status === "OVER_QUERY_LIMIT" ){
            callback(body.error_message);
        }
        else if ( body.status === "OK" ){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
};