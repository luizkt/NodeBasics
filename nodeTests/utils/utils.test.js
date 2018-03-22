const expect = require ('expect');

const utils = require('./utils');

it('should add two numbers', () => {
    var result = utils.add(2, 3);
    //method using expect library to test
    expect(result).toBe(5).toBeA('number');
    //hand made method to test
//    if ( result !== 5 ){
//        throw new Error(`Expected 5, but got ${result}`);
//    }
} );

it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 4, (sum) => {
        expect(sum).toBe(8).toBeA('number');
        done();
    });
});

it('should square a number', () => {
    var result = utils.square(3);
    expect(result).toBe(9).toBeA('number');
});

it('should async square a number', (done) => {
    utils.asyncSquare(4, (square) => {
        expect(square).toBe(16).toBeA('number');
        done();
    });
});

it('should set first and last names', () => {
    var user = {location: 'São Paulo', age: 24};
    var result = utils.setName( user, 'Luiz Tabacow' );
    expect(result).toInclude({
                                firstName: 'Luiz',
                                lastName: 'Tabacow'
                            });
});