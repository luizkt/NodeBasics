//arrow functions when have only 1 variable, it doesnt need bracers parentheses
var square = x => x * x;
console.log(square(9));

var user = {
  name: 'Andrew',
  //arrow function inside variable
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  },
  //regular function inside variable
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};

//doesnt work
user.sayHi(1, 2, 3);
//does work
user.sayHiAlt(1, 2, 3);
