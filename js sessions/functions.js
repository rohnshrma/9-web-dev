// functions:
// reusable block of code

// code inside of the function runs only when the function is called.

// =================> function declaration

// function funcName(parameters){
//     code to be executed
// }

// funcName(attributes)

function greet() {
  console.log("hello world");
}

// greet();

// function to calculate bmi of a person

// function calcBmi() {
//   var weight = parseInt(prompt("Enter your weight in kg's :"));
//   var height = parseFloat(prompt("Enter your height in meters's :"));
//   var bmi = weight / (height * height);

//   console.log(bmi);
// }

// calcBmi();

// parameters : fake variables | variables without values
// values are provided when the function is called

function calcBmi(weight, height) {
  var bmi = weight / (height * height);

  console.log(bmi);
}

calcBmi(100, 1.8);
calcBmi(120, 1.76);

// function printInfo() {
//   // local scope
//   var name = prompt("Enter your name :");
//   console.log("hello world my name is " + name);
// }

// printInfo();

function calSq(n) {
  return n ** 2;
}

console.log(calSq(23));
var sq_23 = calSq(23);

console.log(`the square of 23 is ${sq_23}`);

// ============================>  function expressions
// 1. anonynous functions
// 2. arrow functions

// anonymous:
// function (parameters){
// code to be executed
// }

// arrow :
// ()=>{
// code to be executed
// }

// usage :
// 1. as a value to a variable

// anonymous
var addition = function (a, b) {
  return a + b;
};

console.log(addition(12, 34));

// arrow
var subtraction = (a, b) => {
  return a - b;
};

console.log(subtraction(12, 2));

// arrow : in case of exact one parameter () can be omitted
// arrow : if all the code does is return something , then {} and return can be omiited
var calCube = (n) => n ** 3;

console.log(calCube(2));

// ---------------------- callback
// when a function is passed into another function as parameter , the passed function is called
// a callback

// function that returns age of a person

var calcAge = () =>
  new Date().getFullYear() - parseInt(prompt("Enter your year of birth : "));

var lifeSpan = (average_age, ageFunc) => average_age - ageFunc();

console.log(lifeSpan(90, calcAge));

// callback => calcAge
