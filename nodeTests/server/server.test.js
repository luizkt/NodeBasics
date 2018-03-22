const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {
    describe('GET /', () => {
        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .expect('Hello World!')
                .end(done);
        });
    });

    describe('GET /users', () => {
        it('should return my user', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((response) => {
                    expect(response.body).toInclude({
                                                        name: 'Luiz',
                                                        age: 24
                                                    });
                })
                .end(done);
        });
    });
});