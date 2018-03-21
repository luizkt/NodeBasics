const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            // key: 'AIzaSyBXHoKDqEHTqu4hAfjU0oxeD-9e6jzFfgQ',
            json: true    
        }, (error, response, body) => {
            if( error ){
                reject("Unable to connect to Google Servers.");
            }
            else if( body.status === "ZERO_RESULTS" ){
                reject("Unable to fetch the location");
            }
            else if ( body.status === "OVER_QUERY_LIMIT" ){
                reject(body.error_message);
            }
            else if ( body.status === "OK" ){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('04639001').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));   
}, (errorMessage) => {
    console.log(errorMessage);
});