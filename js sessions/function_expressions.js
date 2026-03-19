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
