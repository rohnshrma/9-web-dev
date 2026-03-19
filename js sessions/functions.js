// ===============================
// FUNCTIONS IN JAVASCRIPT
// ===============================

// A function is a reusable block of code.
// We write the code once, and then we can run it many times.
// This helps us avoid repeating the same logic again and again.

// Real-life idea:
// Think of a function like a machine.
// You give the machine some input,
// it does some work,
// and then it gives you output.

// General syntax of a function declaration:
// function functionName(parameters) {
//   // code to run
// }

// "function" is the keyword.
// "functionName" is the name we choose.
// "parameters" are placeholder variables that receive values.

// -------------------------------------------------
// EXAMPLE 1: SIMPLE FUNCTION THAT PRINTS SOMETHING
// -------------------------------------------------

function greetStudent(name) {
  // "name" is a parameter.
  // It stores whatever value is passed while calling the function.
  console.log("Hello, " + name + "!");
}

// Function call examples:
// greetStudent("Rohan");
// greetStudent("Aman");

// Notice:
// The function definition only creates the function.
// The function call actually runs it.

// -------------------------------------------------
// EXAMPLE 2: ADDITION FUNCTION
// -------------------------------------------------

function addition(a, b) {
  // "a" and "b" are parameters.
  // They act like local variables inside this function.
  var sum = a + b;
  console.log("Sum is:", sum);
}

// addition(12, 45);
// addition(5, 8);

// Important words:
// Parameters -> variables in the function definition
// Arguments  -> actual values passed during the function call
// Example:
// In addition(a, b), a and b are parameters.
// In addition(12, 45), 12 and 45 are arguments.

// -------------------------------------------------
// WHY FUNCTIONS ARE USEFUL
// -------------------------------------------------

// Suppose we want to calculate BMI for many people.
// If we do it without a function, we repeat the same formula many times.
// That makes code longer and harder to maintain.
// With a function, we write the logic once and reuse it.

// -------------------------------------------------
// EXAMPLE 3: BMI FUNCTION THAT PRINTS RESULT
// -------------------------------------------------

function showBmiMessage(height, weight) {
  // These variables exist only inside this function.
  // That is why they are called local variables.
  var bmi = weight / (height ** 2);

  console.log("BMI value is:", bmi.toFixed(2));

  if (bmi < 18.5) {
    console.log("Category: Underweight");
  } else if (bmi < 25) {
    console.log("Category: Normal weight");
  } else if (bmi < 30) {
    console.log("Category: Overweight");
  } else {
    console.log("Category: Obese");
  }
}

// showBmiMessage(1.8, 100);
// showBmiMessage(1.69, 68);

// -------------------------------------------------
// GLOBAL SCOPE VS LOCAL SCOPE
// -------------------------------------------------

var schoolName = "ABC School";
// This variable is global because it is created outside any function.
// It can be accessed almost anywhere in the file.

console.log("Global variable example:", schoolName);

function explainScope() {
  var className = "JavaScript Basics";
  // This variable is local.
  // It can only be used inside explainScope().
  console.log("Inside function, local variable:", className);
}

// explainScope();

// console.log(className);
// The line above would give an error,
// because className is local to explainScope().

// -------------------------------------------------
// RETURN KEYWORD
// -------------------------------------------------

// "return" does two jobs:
// 1. It immediately stops the function.
// 2. It sends a value back to the place where the function was called.

function demoReturn() {
  console.log("Line 1 runs");
  console.log("Line 2 runs");

  return;

  // These lines never run because return already stopped the function.
  // console.log("Line 3 runs");
  // console.log("Line 4 runs");
}

// demoReturn();

// -------------------------------------------------
// FUNCTION THAT RETURNS A VALUE
// -------------------------------------------------

function calcSquare(n) {
  var square = n ** 2;
  return square;
}

// When a function returns a value,
// we can store it in a variable or print it.

// var result = calcSquare(6);
// console.log("Square is:", result);
// console.log("Square is:", calcSquare(9));

// -------------------------------------------------
// VOID FUNCTION VS VALUE-RETURNING FUNCTION
// -------------------------------------------------

// A void function mainly performs an action.
// Example: printing something on the console.

function sayWelcome() {
  console.log("Welcome to the class!");
}

// A value-returning function gives back a result.

function multiply(a, b) {
  return a * b;
}

// sayWelcome();
// console.log(multiply(4, 5));

// -------------------------------------------------
// PRACTICE FUNCTIONS WITH COMMENTS
// -------------------------------------------------

function cube(n) {
  // Multiply the number by itself three times.
  return n * n * n;
}

function isEven(n) {
  // If remainder is 0 after dividing by 2,
  // the number is even.
  return n % 2 === 0;
}

function max(a, b) {
  // Compare two values and return the greater one.
  if (a > b) {
    return a;
  }
  return b;
}

function calcArea(length, breadth) {
  // Area of rectangle = length * breadth
  return length * breadth;
}

function calcSimpleInterest(principal, rate, time) {
  // Formula: (P * R * T) / 100
  return (principal * rate * time) / 100;
}

function convertCelsiusToFahrenheit(celsius) {
  // Formula: (C * 9/5) + 32
  return (celsius * 9) / 5 + 32;
}

function checkVotingAge(age) {
  if (age >= 18) {
    return "Eligible to vote";
  }
  return "Not eligible to vote";
}

function sumTillN(n) {
  var sum = 0;

  // Start from 1 and keep adding each number till n.
  for (var i = 1; i <= n; i += 1) {
    sum += i;
  }

  return sum;
}

// -------------------------------------------------
// LOGIC BUILDING FUNCTIONS
// -------------------------------------------------

function reverseNumber(n) {
  var reversed = 0;

  // Example with 321:
  // Step 1 -> digit = 1, reversed = 1, n = 32
  // Step 2 -> digit = 2, reversed = 12, n = 3
  // Step 3 -> digit = 3, reversed = 123, n = 0
  while (n > 0) {
    var digit = n % 10;
    reversed = reversed * 10 + digit;
    n = Math.floor(n / 10);
  }

  return reversed;
}

function countDigits(n) {
  // Special case:
  // The number 0 has 1 digit.
  if (n === 0) {
    return 1;
  }

  var count = 0;
  var number = Math.abs(n);

  while (number > 0) {
    count += 1;
    number = Math.floor(number / 10);
  }

  return count;
}

function isPalindrome(n) {
  // A palindrome reads the same forward and backward.
  // Example: 121, 1331
  var reversed = reverseNumber(n);
  return reversed === n;
}

function factorial(n) {
  // Factorial means multiplying all whole numbers from 1 to n.
  // Example: 5! = 1 * 2 * 3 * 4 * 5 = 120
  var result = 1;

  for (var i = 1; i <= n; i += 1) {
    result *= i;
  }

  return result;
}

function checkPrime(n) {
  // Prime number means:
  // the number should have exactly two factors -> 1 and itself

  if (n <= 1) {
    return false;
  }

  // We check divisibility starting from 2.
  // If n is divisible by any number in between,
  // then it is not prime.
  for (var i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

// -------------------------------------------------
// REAL-LIFE STYLE PRACTICE FUNCTIONS
// -------------------------------------------------

function billAmount(units) {
  // This is a very simple example of slab-like pricing.
  // It is not a real electricity formula,
  // but it helps us practice conditions.

  if (units > 200) {
    return units * 10;
  }

  if (units > 100) {
    return units * 7;
  }

  return units * 5;
}

function discount(price) {
  // Return the discount amount, not the final price.
  if (price > 2000) {
    return price * 0.1;
  }

  if (price > 1000) {
    return price * 0.05;
  }

  return 0;
}

function login(username, password) {
  // This is a dummy login example.
  // In real applications, username and password are checked securely.
  var validUsername = "john@123";
  var validPassword = "helloworld";

  if (username === validUsername && password === validPassword) {
    return "Logged In";
  }

  return "Invalid Credentials";
}

function calculateBmi(height, weight) {
  // This version returns the message instead of printing it.
  // Returning is often more flexible than directly using console.log.
  var bmi = weight / (height ** 2);
  var roundedBmi = bmi.toFixed(2);

  if (bmi < 18.5) {
    return "Underweight, BMI is " + roundedBmi;
  }

  if (bmi < 25) {
    return "Normal weight, BMI is " + roundedBmi;
  }

  if (bmi < 30) {
    return "Overweight, BMI is " + roundedBmi;
  }

  return "Obese, BMI is " + roundedBmi;
}

function grade(marks) {
  // This function returns a grade based on marks.
  if (marks > 90 && marks <= 100) {
    return "A";
  }

  if (marks > 80) {
    return "B";
  }

  if (marks > 70) {
    return "C";
  }

  if (marks > 60) {
    return "D";
  }

  return "F";
}

// -------------------------------------------------
// QUICK SUMMARY FOR BEGINNERS
// -------------------------------------------------

// 1. A function is a reusable block of code.
// 2. Parameters are placeholders in the function definition.
// 3. Arguments are actual values passed during the function call.
// 4. Local variables live inside a function only.
// 5. Global variables are created outside functions.
// 6. return sends a value back and stops the function.
// 7. Some functions print values, while others return values.
// 8. Returning a value is usually more flexible than directly printing it.

// -------------------------------------------------
// SAMPLE CALLS FOR PRACTICE
// -------------------------------------------------

// console.log(calcSquare(4));
// console.log(cube(3));
// console.log(isEven(10));
// console.log(max(15, 8));
// console.log(calcArea(10, 20));
// console.log(calcSimpleInterest(1000, 5, 2));
// console.log(convertCelsiusToFahrenheit(25));
// console.log(checkVotingAge(19));
// console.log(sumTillN(5));
// console.log(reverseNumber(1234));
// console.log(countDigits(98765));
// console.log(isPalindrome(121));
// console.log(factorial(5));
// console.log(checkPrime(11));
// console.log(billAmount(250));
// console.log(discount(3000));
// console.log(login("john@123", "helloworld"));
// console.log(calculateBmi(1.75, 72));
// console.log(grade(88));
