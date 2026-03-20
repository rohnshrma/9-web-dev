// =====================================
// FUNCTION EXPRESSIONS IN JAVASCRIPT
// =====================================

// In JavaScript, functions are values.
// That means we can store a function in a variable,
// pass a function to another function,
// or store a function inside an object.

// Function expressions are very useful when:
// 1. we want to store a function in a variable
// 2. we want to use a function as a callback
// 3. we want to store a function as a value in an object

// -------------------------------------
// 1. FUNCTION DECLARATION
// -------------------------------------

// This is a function declaration.
// The function has a name: calcSquare
// Because it has its own name, we can call it using that name.

function calcSquare(n) {
  return n ** 2;
}

// console.log(calcSquare(5));

// -------------------------------------
// 2. ANONYMOUS FUNCTION EXPRESSION
// -------------------------------------

// Here, the function does not have its own name.
// Because it has no name, it is called an anonymous function.
// We store that function inside the variable sqCalc.

var sqCalc = function (n) {
  return n ** 2;
};

// Important idea:
// We are not storing the answer in the variable.
// We are storing the entire function in the variable.
// Later, we can run it using the variable name.

// console.log(sqCalc(6));

// -------------------------------------
// 3. ARROW FUNCTION
// -------------------------------------

// Arrow function is a shorter way to write a function expression.
// It uses => instead of the function keyword.

var squareArrow = (n) => {
  return n ** 2;
};

// console.log(squareArrow(7));

// If the function has only one line of return,
// we can write it in a shorter way.
// This is called implicit return.

var shortSquareArrow = (n) => n ** 2;

// console.log(shortSquareArrow(8));

// -------------------------------------
// FUNCTION DECLARATION VS FUNCTION EXPRESSION
// -------------------------------------

// A declaration looks like this:
// function greet() {}

// A function expression looks like this:
// var greet = function () {};

// Beginner difference to remember:
// In a declaration, the function itself has the main name.
// In an expression, the variable is holding the function.

// -------------------------------------
// CALLBACK FUNCTION
// -------------------------------------

// A callback is a function passed as an argument to another function.
// In simple words:
// one function says, "I will run this other function later."

function processNumber(num, operation) {
  // "operation" is expected to be a function.
  // We call it and pass num as the input.
  return operation(num);
}

var doubleNumber = function (num) {
  return num * 2;
};

// Here, doubleNumber is passed as a callback.
// processNumber(5, doubleNumber) means:
// call doubleNumber(5)

// console.log(processNumber(5, doubleNumber));

// We can also pass an anonymous function directly.
// This is common in JavaScript.

// console.log(
//   processNumber(10, function (num) {
//     return num + 3;
//   })
// );

// We can also use an arrow function as a callback.

// console.log(processNumber(4, (num) => num * num));

// -------------------------------------
// FUNCTION EXPRESSION INSIDE AN OBJECT
// -------------------------------------

// Objects store data in key-value pairs.
// A function can also be stored as a value.
// When a function is stored in an object, we usually call it a method.

var calculator = {
  brand: "Casio",
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
};

// console.log(calculator.add(10, 5));
// console.log(calculator.subtract(10, 5));

// -------------------------------------
// EXTRA BEGINNER NOTES
// -------------------------------------

// 1. Function declaration creates a named function.
// 2. Function expression stores a function inside a variable.
// 3. Anonymous function means a function with no name.
// 4. Arrow function is a shorter syntax for function expressions.
// 5. Callback means a function passed into another function.
// 6. A function can be treated like a normal value in JavaScript.

// -------------------------------------
// PRACTICE IDEAS
// -------------------------------------

// 1. Create a function expression that finds cube of a number.
// 2. Create an arrow function that checks if a number is even.
// 3. Pass a function as a callback that triples a number.
// 4. Create an object with methods like multiply and divide.

// -------------------------------------
// DEEPER CALLBACK EXAMPLE
// -------------------------------------

// A callback is simply a function that we SEND to another function
// so that the second function can run it when needed.
//
// Think of it like this:
// 1. We do not send the FINAL ANSWER.
// 2. We send the FUNCTION that can produce the answer.
// 3. The receiving function decides when to run it.
//
// In this example:
// - lifeSpan() is the main function
// - ageFunc is the callback function
// - lifeSpan() will call ageFunc() inside its own code

// This arrow function asks the user for year of birth
// and returns the current age.
//
// Step by step:
// 1. prompt() asks the user to type the birth year
// 2. parseInt() converts the typed text into a number
// 3. new Date().getFullYear() gives the current year
// 4. current year - birth year = age
var ageFunc = () => {
  var birthYear = parseInt(prompt("Enter year of birth:"), 10);
  var currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

// This function calculates approximate remaining life.
//
// Parameters:
// average_age -> expected life span, for example 100
// cb -> callback function that should return the person's age
function lifeSpan(average_age, cb) {
  // Here we RUN the callback function.
  // cb() means:
  // "execute the function that was passed to me"
  var currentAge = cb();

  // Remaining years are calculated after callback gives us the age.
  var years_left = average_age - currentAge;

  // We are using the returned age to calculate more values.
  var months_left = years_left * 12;
  var weeks_left = years_left * 52;
  var days_left = years_left * 365;

  console.log("Current Age:", currentAge);
  console.log(
    `Years Left: ${years_left}\nMonths Left: ${months_left}\nWeeks Left: ${weeks_left}\nDays Left: ${days_left}`
  );
}

// EXAMPLE 1:
// Passing a function stored in a variable.
// Important:
// We write ageFunc
// We do NOT write ageFunc()
//
// Why?
// - ageFunc means "pass the function itself"
// - ageFunc() means "run the function immediately"
lifeSpan(100, ageFunc);

// EXAMPLE 2:
// Passing an arrow function directly as a callback.
// This works, but it is longer and less reusable.
lifeSpan(100, () => {
  var birthYear = parseInt(prompt("Enter year of birth:"), 10);
  return new Date().getFullYear() - birthYear;
});

// EXAMPLE 3:
// Passing a normal anonymous function directly as a callback.
// This is also a function expression.
lifeSpan(100, function () {
  var birthYear = parseInt(prompt("Enter year of birth:"), 10);
  return new Date().getFullYear() - birthYear;
});

// -------------------------------------
// BEGINNER SUMMARY OF THE CALLBACK FLOW
// -------------------------------------

// Read this line carefully:
// lifeSpan(100, ageFunc);
//
// What happens here?
// 1. lifeSpan receives 100 in average_age
// 2. lifeSpan receives ageFunc in cb
// 3. Inside lifeSpan, cb() is called
// 4. That means ageFunc() runs
// 5. ageFunc() returns the current age
// 6. lifeSpan uses that returned age to calculate years left
//
// So callback is not a special type of function.
// It is just a normal function used in a special way:
// it is passed into another function.

// -------------------------------------
// WHEN CALLBACKS ARE USEFUL
// -------------------------------------

// Callbacks are helpful when:
// 1. We want another function to decide what work should happen
// 2. We want flexible code
// 3. We want to reuse the same main function with different behaviors
//
// Example idea:
// processNumber(5, doubleNumber)
// processNumber(5, squareNumber)
//
// Same main function, different callback, different result.

// -------------------------------------
// 3 PRACTICE TASKS
// -------------------------------------

// Task 1:
// Create a function expression named greetUser
// that asks the user for their name and returns:
// "Hello, <name>"

// Task 2:
// Create a function named useMessage
// that accepts one callback.
// The callback should return a message,
// and useMessage should print that message using console.log().

// Task 3:
// Create a function named calculateResult(num, cb)
// and test it with 3 different callbacks:
// - one that doubles the number
// - one that squares the number
// - one that subtracts 5 from the number

// Task 4:
// Create a function named formatName(cb)
// The callback should ask the user for a name
// and return it in uppercase letters.

// Task 5:
// Create a function named checkAge(cb)
// The callback should return an age.
// If age is 18 or more, print "Adult".
// Otherwise, print "Minor".

// Task 6:
// Create a function named mathOperation(a, b, cb)
// and test it with callbacks for:
// - addition
// - subtraction
// - multiplication

// Task 7:
// Create a function named printResult(cb)
// The callback should return any sentence.
// printResult should print:
// "Callback returned: <sentence>"

// Task 8:
// Create a function named getUserInfo(cb)
// The callback should ask for name and age
// and return a sentence like:
// "My name is Rahul and I am 20 years old."

function calculateResult(num, cb) {
  console.log(cb(num));
}

calculateResult(12, (n) => n * 2);
calculateResult(12, (n) => n ** 2);
calculateResult(12, (n) => n - 5);
