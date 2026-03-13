// OBJECTS IN JAVASCRIPT
// Objects are used to store related data in key-value pair form.
// Syntax:
// { key: value }

// -------------------------------------------------------------------
// 1. CREATING AN OBJECT
// -------------------------------------------------------------------

var car = {
  // `model`, `brand`, and `year` are properties of the object.
  model: "i20",
  brand: "Hyundai",
  year: 2020,

  // `start` is a method because it is a function inside the object.
  start: function () {
    // Inside an object method, `this` refers to the object that called it.
    console.log(`${this.model} engine started`);
  },
};

// -------------------------------------------------------------------
// 2. UNDERSTANDING `this`
// -------------------------------------------------------------------

// In this object method, `this` points to the `car` object
// when we call `car.start()`.

// Prints the complete object.
console.log(car);

// Dot notation is used to access a property.
console.log(car.brand);

// Accessing another property using dot notation.
console.log(car.model);

// Bracket notation is another way to access properties.
// It is useful when the property name is in quotes or stored in a variable.
console.log(car["model"]);

// Here the variable stores the property name as a string.
// Bracket notation can use variables, while dot notation cannot.
var propertyName = "year";
console.log(car[propertyName]);

// -------------------------------------------------------------------
// 3. UPDATING A PROPERTY
// -------------------------------------------------------------------

// We can change an existing property value.
car.model = "Verna";

// Prints the updated model.
console.log(car.model);

// -------------------------------------------------------------------
// 4. ADDING A NEW PROPERTY
// -------------------------------------------------------------------

// JavaScript objects are dynamic.
// That means we can add new properties later.
car.color = "Grey";

// Prints the newly added property.
console.log(car.color);

// We can also add one more method after object creation.
car.stop = function () {
  console.log(`${this.model} engine stopped`);
};

// Calls the method stored inside the object.
car.start();
car.stop();

// -------------------------------------------------------------------
// IMPORTANT CONCEPTS USED IN THIS FILE
// -------------------------------------------------------------------
//
// 1. Object
//    A collection of related data and functions.
//
// 2. Property
//    A value stored inside an object.
//    Example: `car.brand`
//
// 3. Method
//    A function stored inside an object.
//    Example: `car.start()`
//
// 4. Dot Notation
//    Used like `car.model`
//
// 5. Bracket Notation
//    Used like `car["model"]`
//
// 6. `this`
//    Refers to the object that is calling the method.
//
// 7. Dynamic Nature of Objects
//    We can add, update, or remove properties and methods later.

// -------------------------------------------------------------------
// PRACTICE TASKS
// -------------------------------------------------------------------
//
// Task 1:
// Create an object `student` with properties:
// - name
// - age
// - course
// Add a method `introduce()` that prints all details.
//
// Task 2:
// Create an object `mobile` with:
// - brand
// - model
// - price
// Print each property using both dot notation and bracket notation.
//
// Task 3:
// Create an object `bike` with:
// - brand
// - color
// Then update the color and print the new value.
//
// Task 4:
// Create an object `book` with:
// - title
// - author
// Then add a new property `pages` later.
//
// Task 5:
// Create an object `employee` with a method `work()`
// that prints: "Employee is working".
//
// Task 6:
// Create an object `calculator` with methods:
// - `add(a, b)`
// - `subtract(a, b)`
// Then call both methods.
//
// Task 7:
// Create an object `user` and store `name`, `email`, and `isLoggedIn`.
// Update `isLoggedIn` from `false` to `true`.
//
// Task 8:
// Create an object `movie` with a method `about()`
// that prints the movie name and release year using `this`.
