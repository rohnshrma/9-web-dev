// ============================================================
// ARRAYS IN JAVASCRIPT
// ============================================================
// An array is a special data type used to store multiple values
// inside a single variable.
//
// Arrays are useful when we want to keep related data together.
// Example:
// - marks of students
// - names of fruits
// - list of prices
// - mixed values for practice/learning
//
// Arrays are created using square brackets: []
// Each value inside an array is called an "element" or "item".
// Items are separated by commas.
//
// Important:
// JavaScript arrays can store:
// - numbers
// - strings
// - booleans
// - objects
// - other arrays
// - even mixed data types together
//
// Example:
// var sample = [10, "hello", true];

// A simple array of numbers
var marks = [12, 34, 23, 3, 42, 3];

// ============================================================
// REFERENCE TYPE CONCEPT
// ============================================================
// Arrays are "reference data types".
//
// This is a very important beginner concept:
// When we copy an array variable like this:
// var yourMarks = marks;
//
// we are NOT creating a new separate array.
// Both variables point to the SAME array in memory.
//
// That means:
// - change through `marks`
// - also appears in `yourMarks`
//
// Think of it like 2 labels attached to the same box.
// The labels are different, but the box is the same.
var yourMarks = marks;

console.log("Original arrays:");
console.log("marks ->", marks);
console.log("yourMarks ->", yourMarks);

// ============================================================
// CHANGING A VALUE USING INDEX
// ============================================================
// Every array item has a position number called an "index".
//
// Index always starts from 0, not 1.
// So for this array:
// [12, 34, 23, 3, 42, 3]
//
// positions are:
//  0   1   2  3   4  5
//
// To change a value:
// arrayName[index] = newValue
marks[1] = 100;

// Because `yourMarks` and `marks` point to the same array,
// this change is visible in both variables.
console.log("After changing marks[1] to 100:");
console.log("marks ->", marks);
console.log("yourMarks ->", yourMarks);

// Accessing individual items
console.log("Item at index 0:", marks[0]);
console.log("Item at index 1:", marks[1]);

// ============================================================
// FIRST INDEX AND LAST INDEX
// ============================================================
// First item index  -> 0
// Last item index   -> array.length - 1
//
// `length` tells how many items are inside the array.
console.log("Length of marks array:", marks.length);
console.log("First item:", marks[0]);
console.log("Last item:", marks[marks.length - 1]);

// ============================================================
// LOOPING THROUGH AN ARRAY
// ============================================================
// A loop helps us access every item one by one.
//
// Here:
// 1) `i = 0` means start from first index
// 2) `i < marks.length` means run until last valid index
// 3) `i++` means increase i by 1 after every round
//
// This is one of the most common ways to read an array.
console.log("Looping through all marks:");
for (var i = 0; i < marks.length; i++) {
  console.log("Index", i, "Value", marks[i]);
}

// ============================================================
// ARRAY METHODS
// ============================================================
// Methods are built-in functions that arrays already have.
// They help us read, add, remove, search, or transform data.

// ------------------------------------------------------------
// at()
// ------------------------------------------------------------
// `at(index)` returns the item at a specific position.
//
// Difference from normal bracket access:
// - `at(0)` behaves like marks[0]
// - `at(-1)` gives last item
// - `at(-2)` gives second last item
//
// Negative indexes are very convenient with `at()`.
console.log("at(0):", marks.at(0));
console.log("at(-2):", marks.at(-2));

// ------------------------------------------------------------
// includes()
// ------------------------------------------------------------
// `includes(value)` checks whether an item exists in the array.
// It returns:
// - true  -> if item is found
// - false -> if item is not found
//
// `includes(value, startIndex)` starts searching from that index.
console.log("includes(3):", marks.includes(3));
console.log("includes(3, 4):", marks.includes(3, 4));

// ------------------------------------------------------------
// push()
// ------------------------------------------------------------
// `push()` adds one or more items to the END of the array.
//
// Important:
// `push()` returns the NEW LENGTH of the array,
// not the updated array itself.
console.log("Return value of push:", marks.push(356, 678));
console.log("Array after push:", marks);

// ------------------------------------------------------------
// unshift()
// ------------------------------------------------------------
// `unshift()` adds one or more items to the START of the array.
//
// This changes all existing indexes because everything moves right.
marks.unshift(1000, 2000);
console.log("Array after unshift:", marks);

// ------------------------------------------------------------
// pop()
// ------------------------------------------------------------
// `pop()` removes the LAST item from the array.
//
// It also returns the removed item.
var removedFromEnd = marks.pop();
console.log("Removed by pop:", removedFromEnd);
console.log("Array after pop:", marks);

// ------------------------------------------------------------
// shift()
// ------------------------------------------------------------
// `shift()` removes the FIRST item from the array.
//
// It also returns the removed item.
var removedFromStart = marks.shift();
console.log("Removed by shift:", removedFromStart);
console.log("Array after shift:", marks);

// ------------------------------------------------------------
// splice()
// ------------------------------------------------------------
// `splice()` is a very important array method because it can:
// - add items
// - remove items
// - replace items
//
// Syntax:
// array.splice(startIndex, deleteCount, item1, item2, ...)
//
// It changes the ORIGINAL array.

// Add 1000 at index 2 without deleting anything
marks.splice(2, 0, 1000);
console.log("After adding 1000 with splice:", marks);

// Start at index 0, remove 1 item, then insert 50000 there
marks.splice(0, 1, 50000);
console.log("After replacing first item with 50000:", marks);

// Start at index 0 and remove 1 item
marks.splice(0, 1);
console.log("After removing first item using splice:", marks);

// ------------------------------------------------------------
// slice()
// ------------------------------------------------------------
// `slice(start, end)` returns a copy of part of the array.
//
// Important:
// - start is inclusive
// - end is exclusive
// - original array does NOT change
//
// So slice(0, 3) means:
// take index 0, 1, 2
// but stop before index 3
console.log("slice(0, 3):", marks.slice(0, 3));
console.log("Array after slice (unchanged):", marks);

// ============================================================
// MULTIDIMENSIONAL ARRAY
// ============================================================
// An array can store other arrays.
// This is called a nested array or 2D array.
//
// You can imagine it like rows and columns.
var totalMarks = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// To access nested values:
// totalMarks[rowIndex][columnIndex]
console.log("totalMarks[0][2]:", totalMarks[0][2]);
console.log("totalMarks[2][2]:", totalMarks[2][2]);

// ------------------------------------------------------------
// flat()
// ------------------------------------------------------------
// `flat()` converts nested arrays into a simpler single array.
//
// Here it removes one level of nesting.
// Important:
// `flat()` returns a NEW array.
// It does not change the original unless we store it again.
console.log("Before flat:", totalMarks);
console.log("After flat:", totalMarks.flat());

// ============================================================
// CONCATENATION
// ============================================================
// "Concatenation" means joining things together.

// Using `+` with arrays converts them to strings first.
// So the result is NOT a real array.
console.log("Concatenation using + :", marks + yourMarks);

// ============================================================
// forEach() EXPLANATION
// ============================================================
// `arr.forEach()` lets us visit each item of an array one by one.
//
// It takes a CALLBACK function as its input.
// That callback can receive 3 values:
// 1. current item
// 2. current index
// 3. original array itself
//
// Example form:
// arr.forEach((item, index, array) => {
//   // code to run for each item
// });
//
// In the example below:
// m   -> current mark value
// i   -> current index
// arr -> full original array

marks.forEach((m, i, arr) => {
  console.log("Current value:", m);
  console.log("Current index:", i);
  console.log("Original array:", arr);
});

// `forEach()` is a very good real example of callback.
// Why?
// Because we pass one function into `forEach()`,
// and `forEach()` calls that function again and again
// for every array item.

// We can also use forEach() when we want to apply a condition
// to every item in the array.
//
// Here we check each mark one by one.
// If the mark is even, we print it.
marks.forEach((m, i, arr) => {
  if (m % 2 === 0) {
    console.log("Even mark found at index", i, ":", m);
  }
});

// Another useful example:
// We can use forEach() to calculate a total.
var total = 0;

marks.forEach((m) => {
  total = total + m;
});

console.log("Total of all marks using forEach:", total);

// Difference between `for` loop and `forEach()`:
//
// `for` loop:
// - gives more control
// - useful when we need custom start/end/step
//
// `forEach()`:
// - easier to read for simple item-by-item work
// - good when we want to do something for every element
// - uses a callback function

// ============================================================
// forEach() PRACTICE TASKS
// ============================================================

// Task 1:
// Create an array of 5 fruit names.
// Use forEach() to print each fruit one by one.

// Task 2:
// Create an array of numbers.
// Use forEach() to print the square of each number.

// Task 3:
// Create an array of marks.
// Use forEach() to print:
// - "Pass" if mark is 35 or more
// - "Fail" if mark is less than 35

// Task 4:
// Create an array of prices.
// Use forEach() to find the total sum of all prices.

// Task 5:
// Create an array of names.
// Use forEach() to print:
// "Hello <name>"

// `concat()` joins arrays properly and returns a new array.
console.log("Concatenation using concat():", marks.concat(yourMarks));

console.log("Current marks array:", marks);

// ------------------------------------------------------------
// indexOf()
// ------------------------------------------------------------
// `indexOf(value)` returns the index of the FIRST matching item.
//
// If item is not found, it returns -1.
//
// `indexOf(value, startIndex)` starts searching from a given index.
console.log("indexOf(3):", marks.indexOf(3));
console.log("indexOf(3, 5):", marks.indexOf(3, 5));

// ------------------------------------------------------------
// reverse()
// ------------------------------------------------------------
// `reverse()` changes the order of items in the ORIGINAL array.
//
// Important:
// This method mutates the array, which means it changes the actual array.
marks.reverse();
console.log("After reverse:", marks);

// ------------------------------------------------------------
// join()
// ------------------------------------------------------------
// `join(separator)` converts the array into a string.
//
// It places the given separator between each item.
console.log('join("+"):', marks.join("+"));

// ------------------------------------------------------------
// lastIndexOf()
// ------------------------------------------------------------
// `lastIndexOf(value)` returns the index of the LAST matching item.
//
// Search happens from right to left.
//
// `lastIndexOf(value, startIndex)` starts checking backward from
// the given index.
console.log("marks:", marks);
console.log("lastIndexOf(3):", marks.lastIndexOf(3));
console.log("lastIndexOf(3, 2):", marks.lastIndexOf(3, 2));

// ============================================================
// BEGINNER SUMMARY
// ============================================================
// 1) Arrays store multiple values in one variable.
// 2) Array index starts from 0.
// 3) `length` tells total number of items.
// 4) Arrays are reference types, so copying a variable may still
//    point to the same original array.
// 5) Some methods return new arrays/values.
// 6) Some methods change the original array directly.
//
// Methods that changed the original array in this file:
// - push()
// - unshift()
// - pop()
// - shift()
// - splice()
// - reverse()
//
// Methods that returned a value/new array without changing original:
// - at()
// - includes()
// - slice()
// - flat()
// - concat()
// - indexOf()
// - join()
// - lastIndexOf()

// ============================================================
// PRACTICE TASKS FOR BEGINNERS
// ============================================================
// Try solving these tasks on your own below this section.
// Do not worry about making mistakes. Practice is how these
// concepts start feeling natural.
//
// You can create new variables and write your answers under
// each task.

// Task 1:
// Create an array named `fruits` with 5 fruit names.
// Print the whole array.

// Task 2:
// Print:
// - the first fruit
// - the last fruit
// - the length of the array

// Task 3:
// Change the value at index 2 of `fruits` to any other fruit.
// Then print the updated array.

// Task 4:
// Use a `for` loop to print every fruit one by one.
// Also print its index with it.

// Task 5:
// Check whether `fruits` includes "apple".
// Then check whether it includes "mango".

// Task 6:
// Add 2 new fruits at the end of the array using `push()`.
// Print:
// - the return value of `push()`
// - the updated array

// Task 7:
// Add 2 new fruits at the beginning using `unshift()`.
// Print the updated array.

// Task 8:
// Remove:
// - one fruit from the end using `pop()`
// - one fruit from the beginning using `shift()`
// Print the removed values and the updated array.

// Task 9:
// Use `splice()` to do all 3 things:
// - add one item
// - replace one item
// - remove one item
// Print the array after each operation.

// Task 10:
// Use `slice()` to copy only the first 3 fruits into a new array.
// Print both arrays and check whether original array changed or not.

// Task 11:
// Create a nested array named `matrix` like this:
// [
//   [10, 20],
//   [30, 40]
// ]
// Print:
// - 10
// - 40

// Task 12:
// Use `flat()` on a nested array and print the result.
// Also print the original nested array to see whether it changed.

// Task 13:
// Create 2 arrays:
// var a = [1, 2, 3];
// var b = [4, 5, 6];
// Join them using:
// - `+`
// - `concat()`
// Observe the difference in output type.

// Task 14:
// Find:
// - the first index of a repeated value using `indexOf()`
// - the last index of the same value using `lastIndexOf()`

// Task 15:
// Reverse an array using `reverse()`.
// Then convert it into a string using `join("-")`.

// Task 16:
// Create one array and assign it to another variable:
// var arr1 = [1, 2, 3];
// var arr2 = arr1;
// Change one value using `arr1`.
// Print both arrays and explain in your own words why both changed.

// Task 17:
// Write in comments:
// Which methods change the original array?
// Which methods return a new value or new array?

// Bonus Task 18:
// Create an array of marks and calculate the total sum using a loop.

// Bonus Task 19:
// Create an array of numbers and count how many times `3` appears.

// Bonus Task 20:
// Create your own 5 practice questions based on arrays.
