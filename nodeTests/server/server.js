const express = require('express');

var app = express();

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.get('/users', (request, response) => {
    response.send({
        name: 'Luiz',
        age: 24
    },
    {
        name: 'Lucas',
        age: 24
    },
    {
        name: 'Jonas',
        age: 25
    })
});

app.listen(3000);

module.exports.app = app;