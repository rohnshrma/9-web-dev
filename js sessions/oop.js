// OOP = Object Oriented Programming
// In JavaScript, OOP helps us create many similar objects using constructors or classes.
// Each object can have:
// 1. properties -> data about the object
// 2. methods -> actions the object can perform

// -------------------------------------------------------------------
// 1. CONSTRUCTOR FUNCTION EXAMPLE
// -------------------------------------------------------------------

// `Car` is a constructor function.
// A constructor function acts like a blueprint for creating objects.
function Car(model, brand, year) {
  // When we create an object with `new Car(...)`,
  // `this` refers to the newly created object.
  console.log(this);

  // These lines create properties on the new object.
  this.model = model;
  this.brand = brand;
  this.year = year;

  // This line adds a method to the object.
  // A method is just a function stored inside an object.
  this.start = function () {
    // `this.model` means "use the model of the current object".
    console.log(`${this.model} has started`);
  };
}

// `new` creates a fresh object and connects `this` to it.
var verna = new Car("Verna", "Hyundai", 2020);

// Prints the whole object created from the constructor.
console.log(verna);

// Calls the start method of the `verna` object.
verna.start();

// -------------------------------------------------------------------
// 2. ANOTHER CONSTRUCTOR FUNCTION EXAMPLE
// -------------------------------------------------------------------

// Constructor functions usually start with a capital letter by convention.
// Here we are keeping the example simple, but in real projects `Employee`
// would be a better name than `employee`.
function employee(name, age, position) {
  // These lines store the received values inside the object.
  this.name = name;
  this.age = age;
  this.position = position;

  // This method prints details of the employee object.
  this.myfun = function () {
    console.log(
      "My name is",
      this.name,
      "I am",
      this.age,
      "years old and I am a",
      this.position
    );
  };
}

// Creates one employee object.
var myconst = new employee("Neelam", 24, "Frontend Developer");

// Calls the method.
myconst.myfun();

// -------------------------------------------------------------------
// 3. CLASS EXAMPLES
// -------------------------------------------------------------------

// A class is another modern way to create objects in JavaScript.
// It is easier to read and organize than older constructor function style.

// -------------------------------------------------------------------
// STATIC CLASS EXAMPLE
// -------------------------------------------------------------------
// "Static" here means every object gets the same fixed values.
// We are using a different class name so this example can run
// together with the other book examples in the same file.

class StaticBook {
  // These values are fixed for every object created from this class.
  author = "R D Sharma";
  title = "Maths";
  year = 1999;
  pages = 2000;

  printDetails() {
    console.log(`${this.title} by ${this.author}`);
  }
}

var staticBook1 = new StaticBook();
staticBook1.printDetails();
var staticBook2 = new StaticBook();
staticBook2.printDetails();
var staticBook3 = new StaticBook();
staticBook3.printDetails();

// -------------------------------------------------------------------
// SEMI-DYNAMIC CLASS EXAMPLE
// -------------------------------------------------------------------
// In this style we first create the object and then assign values later.

class SemiDynamicBook {
  takeValues(title, author, year, pages) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
  }

  printDetails() {
    console.log(`${this.title} by ${this.author}`);
  }
}

var semiBook1 = new SemiDynamicBook();
semiBook1.takeValues("Maths", "R D Sharma", 1999, 2000);
semiBook1.printDetails();
var semiBook2 = new SemiDynamicBook();
semiBook2.takeValues("Science", "R D Verma", 1999, 2000);
semiBook2.printDetails();

// -------------------------------------------------------------------
// DYNAMIC CLASS EXAMPLE
// -------------------------------------------------------------------
// This is the most common pattern.
// We pass values at the time of object creation using a constructor.

class Book {
  // The constructor runs automatically whenever a new object is created.
  constructor(title, author, year, pages) {
    // Store incoming values inside the object.
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;

    // This confirms that a new book object has been created.
    console.log("Book generated:", this.title);
  }

  // Class methods are shared behaviour for all objects of this class.
  printDetails() {
    console.log(`${this.title} by ${this.author}`);
  }
}

// Creates the first book object.
var b1 = new Book("Maths", "R D Sharma", 1999, 2000);
b1.printDetails();

// Creates the second book object.
var b2 = new Book("Science", "R D Verma", 1999, 2000);
b2.printDetails();

// -------------------------------------------------------------------
// IMPORTANT CONCEPTS USED IN THIS FILE
// -------------------------------------------------------------------
//
// 1. Object
//    A real object in JavaScript that stores data and functions together.
//
// 2. Constructor Function
//    A normal function used with `new` to create many similar objects.
//
// 3. Class
//    A modern syntax for creating object blueprints.
//
// 4. `this`
//    Refers to the current object on which the code is working.
//
// 5. Method
//    A function inside an object or class.
//
// 6. `new` keyword
//    Creates a new object and links `this` to that object.

// -------------------------------------------------------------------
// PRACTICE TASKS
// -------------------------------------------------------------------
//
// Task 1:
// Create a constructor function `Mobile(brand, model, price)`.
// Add a method `showDetails()` that prints all details.
//
// Task 2:
// Create two mobile objects using `new`.
// Example: Samsung, Apple, Redmi, etc.
//
// Task 3:
// Create a class `Student` with:
// - name
// - age
// - course
// Add a method `introduce()` that prints the student's information.
//
// Task 4:
// Create 3 objects from the `Student` class and call `introduce()` on each.
//
// Task 5:
// Create a class `Rectangle` with:
// - length
// - breadth
// Add methods:
// - `area()` -> prints length * breadth
// - `perimeter()` -> prints 2 * (length + breadth)
//
// Task 6:
// Create a constructor function `Person(name, city)`.
// Add a method `greet()` that prints:
// "Hello, my name is ___ and I live in ___"
//
// Task 7:
// Convert the `Car` constructor function into a class `CarClass`
// and create 2 objects from it.
//
// Task 8:
// In the `Employee` example, add a new method `promote(newPosition)`
// that updates the employee's position and prints the new value.
