// ===============================
// FUNCTIONS IN JAVASCRIPT
// ===============================

// A function is a reusable block of code.
// It runs ONLY when it is called (invoked).

// ===============================
// BMI WITHOUT FUNCTION (BASIC WAY)
// ===============================

// Taking input from user
var height = parseFloat(prompt("Enter height in meters : "));
var weight = parseInt(prompt("Enter weight in kilograms : "));

// BMI Formula
// BMI = weight / (height * height)
var bmi = weight / height ** 2;

// Conditional logic to categorize BMI
if (bmi < 18.5) {
  console.log(`Underweight as your bmi is ${bmi}`);
} else if (bmi >= 18.5 && bmi < 25) {
  console.log(`Normal weight as your bmi is ${bmi}`);
} else if (bmi >= 25 && bmi < 30) {
  console.log(`Overweight as your bmi is ${bmi}`);
} else {
  console.log(`Obese as your bmi is ${bmi}`);
}

// ❗ PROBLEM:
// This code is NOT reusable.
// Every time you want to calculate BMI → you must rewrite everything.

// ===============================
// FUNCTION DECLARATION
// ===============================

// Function syntax:
// function functionName(parameters) { code }

// PARAMETERS → variables that receive values when function is called

function addition(a, b) {
  // 'a' and 'b' are parameters
  console.log(a + b); // prints sum
}

// Function calls (invoking function)
addition(12, 45); // a=12, b=45
addition(15, 45);
addition(16, 45);

// ===============================
// FUNCTION FOR BMI (REUSABLE)
// ===============================

function calcBmi(height, weight) {
  // height & weight are PARAMETERS

  // LOCAL VARIABLE
  // This variable exists ONLY inside the function
  var bmi = weight / height ** 2;

  // Decision making
  if (bmi < 18.5) {
    console.log(`Underweight as your bmi is ${bmi}`);
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log(`Normal weight as your bmi is ${bmi}`);
  } else if (bmi >= 25 && bmi < 30) {
    console.log(`Overweight as your bmi is ${bmi}`);
  } else {
    console.log(`Obese as your bmi is ${bmi}`);
  }
}

// Function calls with different values
calcBmi(1.8, 100);
calcBmi(1.69, 68);
calcBmi(1.79, 100);

// ✅ BENEFIT:
// Same logic reused multiple times → cleaner code

// ===============================
// GLOBAL VS LOCAL VARIABLES
// ===============================

var x = 34; // GLOBAL → accessible everywhere

console.log(x); // works

// console.log(bmi); ❌ ERROR
// Because bmi is LOCAL inside calcBmi()

// ===============================
// RETURN KEYWORD
// ===============================

// return does TWO things:
// 1. Stops function execution immediately
// 2. Sends value back to where function was called

function logs() {
  console.log(1);
  console.log(2);

  return; // function stops here

  // Below lines NEVER run
  console.log(3);
  console.log(4);
}

logs();

// ===============================
// FUNCTION WITH RETURN VALUE
// ===============================

function calcSq(n) {
  console.log("Generating sq", n ** 2);

  return n ** 2; // returns square value
}

// Calling function and directly printing returned value
console.log(calcSq(2));

// Storing returned value in variable
var res = calcSq(123);
console.log(res);

// ===============================
// IMPORTANT CONCEPT SUMMARY
// ===============================

// 1. PARAMETERS vs ARGUMENTS
// Parameters → (a, b) in function definition
// Arguments → (12, 45) in function call

// 2. LOCAL SCOPE
// Variables inside function → only accessible there

// 3. GLOBAL SCOPE
// Variables outside function → accessible everywhere

// 4. RETURN
// Stops function + sends value back

// 5. VOID FUNCTION
// Function that does NOT return anything (like addition)

// 6. VALUE RETURNING FUNCTION
// Function that returns value (like calcSq)

// ====================================

// 🧠 PRACTICE TASKS (FUNCTIONS ONLY)
// 🔹 Basic Level

// Create a function greet(name) → print "Hello <name>"

// Create a function square(n) → print square of number

// Create a function cube(n) → return cube and print it outside

// Create a function isEven(n) → print whether number is even or odd

// Create a function max(a, b) → print greater number

// 🔹 Intermediate Level

// Create a function calcArea(length, breadth) → return area

// Create a function calcSimpleInterest(p, r, t)

// Create a function convertCelsiusToFahrenheit(c)

// Create a function checkVotingAge(age) → print eligible or not

// Create a function sumTillN(n) → sum from 1 to n

// 🔹 Advanced (Logic Building)

// Create a function reverseNumber(n)

// Create a function countDigits(n)

// Create a function isPalindrome(n)

// Create a function factorial(n)

// Create a function checkPrime(n)

// 🔹 Real-Life Practice

// Create a function billAmount(units) (electricity bill logic)

// Create a function discount(price)

// Create a function login(username, password) (dummy check)

// Create a function calculateBMI(height, weight) → return value (not print)

// Create a function grade(marks) → return A/B/C/D
