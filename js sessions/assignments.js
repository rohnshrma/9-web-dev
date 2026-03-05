/*
ASSIGNMENTS: LOOPS + ARRAYS
Rules:
1) Use `for` loops for loop tasks.
2) For array-method tasks, use only methods you covered:
   push, pop, shift, unshift, includes, at, splice, indexOf, flat, reverse, length
3) Do not use map/filter/reduce/forEach/sort.
*/

// =========================================================
// A) LOOP + ARRAY ASSIGNMENTS (20 TASKS)
// =========================================================

// 1) Print each number from this array in a new line.
// var arr1 = [5, 9, 2, 8, 1];

// 2) Print only even numbers.
// var arr2 = [11, 14, 17, 20, 23, 26];

// 3) Print only odd numbers.
// var arr3 = [12, 15, 18, 21, 24, 27];

// 4) Find and print the sum of all numbers.
// var arr4 = [3, 6, 9, 12];

// 5) Find and print the product of all numbers.
// var arr5 = [2, 3, 4];

// 6) Find the largest number.
// var arr6 = [44, 12, 98, 5, 76];

// 7) Find the smallest number.
// var arr7 = [44, 12, 98, 5, 76];

// 8) Count how many numbers are positive, negative, and zero.
// var arr8 = [3, -1, 0, 8, -6, 0, 9];

// 9) Create a new array with square of each element.
// var arr9 = [2, 4, 6, 8];

// 10) Create a new array with cube of each element.
// var arr10 = [1, 2, 3, 4];

// 11) Create a new array that contains numbers greater than 20.
// var arr11 = [5, 21, 18, 40, 13, 29];

// 12) Count how many times `7` appears.
// var arr12 = [7, 1, 7, 3, 7, 5, 9];

// 13) Find the first index where value is greater than 50 (using loop only).
// var arr13 = [10, 20, 45, 70, 90];

// 14) Reverse the array manually using loop (without reverse method).
// var arr14 = [1, 2, 3, 4, 5];

// 15) Separate numbers into `evens` and `odds` arrays.
// var arr15 = [10, 13, 16, 19, 22, 25];

// 16) Remove duplicate values using loop and includes.
// var arr16 = [1, 2, 2, 3, 4, 4, 5, 1];

// 17) Print all pairs of array elements.
// Example pair format: (a,b)
// var arr17 = [2, 4, 6];

// 18) Find second largest number (without sort).
// var arr18 = [10, 50, 40, 90, 70];

// 19) Rotate array right by 1 position using loop.
// Input: [1,2,3,4] -> Output: [4,1,2,3]
// var arr19 = [1, 2, 3, 4];

// 20) Find common values between two arrays using nested loops.
// var a20 = [1, 2, 3, 4, 5];
// var b20 = [3, 5, 7, 9];

// =========================================================
// B) ARRAY METHOD ASSIGNMENTS (10 TASKS)
// Use only: push, pop, shift, unshift, includes, at, splice,
// indexOf, flat, reverse, length
// =========================================================

// 1) Add "mango" and "grapes" at the end using push.
// var fruits1 = ["apple", "banana"];

// 2) Remove and print the last item using pop.
// var fruits2 = ["apple", "banana", "kiwi"];

// 3) Remove and print the first item using shift.
// var fruits3 = ["red", "green", "blue"];

// 4) Add "start" at beginning using unshift.
// var arrM4 = ["middle", "end"];

// 5) Check if "john" exists using includes.
// var users5 = ["jake", "john", "jannie"];

// 6) Print first and last item using at(0) and at(-1).
// var nums6 = [100, 200, 300, 400];

// 7) Replace 2 items from index 1 with "x" using splice.
// var arrM7 = ["a", "b", "c", "d"];

// 8) Insert "new" at index 2 without deleting using splice.
// var arrM8 = ["p", "q", "r"];

// 9) Find index of "cat" from index 0 using indexOf.
// var arrM9 = ["dog", "cat", "bird", "cat"];

// 10) Convert nested array to single array using flat,
// then reverse it using reverse.
// var arrM10 = [[1, 2], [3, 4], [5, 6]];

/*
Tip:
Create one new file `answers.js` and solve each task there.
Keep task number as a comment before each solution.
*/

// / 17) Print all pairs of array elements.
// Example pair format: (a,b)
// Input array for pair printing
var arr17 = [2, 4, 6];

// Outer loop picks first value of pair
for (var i = 0; i < arr17.length; i += 1) {
  // Inner loop picks second value of pair
  for (var j = 0; j < arr17.length; j++) {
    // Template literal prints pair in (a,b) style
    console.log(`( ${arr17[i]} , ${arr17[j]} )`);
  }
}
// 19) Rotate array right by 1 position using loop.
// Input: [1,2,3,4] -> Output: [4,1,2,3]
// Original array
var arr19 = [1, 2, 3, 4];

// New array to store rotated result
var rotated = [];

// Loop through each element by index
for (var i = 0; i < arr19.length; i++) {
  // Move each element 1 step right, wrap using %
  var newIndex = (i + 1) % arr19.length;
  // Place current value at new rotated index
  rotated[newIndex] = arr19[i];
}
// Print rotated array
console.log(rotated);

// 20) Find common values between two arrays using nested loops.
// First input array
var a20 = [1, 2, 3, 4, 5];
// Second input array
var b20 = [3, 5, 7, 9];

// Store common values
var common = [];

// Loop through first array values
for (var i = 0; i < a20.length; i++) {
  // Compare with every value in second array
  for (var j = 0; j < b20.length; j++) {
    // If both values are equal, it is a match
    if (a20[i] === b20[j]) {
      // Flag to avoid duplicate push in common array
      var alreadyExists = false;
      // Check if match is already stored
      for (var k = 0; k < common.length; k++) {
        if (common[k] === a20[i]) {
          // Mark as existing and stop checking further
          alreadyExists = true;
          break;
        }
      }
      // Push only if value is not already present
      if (!alreadyExists) {
        common.push(a20[i]);
      }
    }
  }
}
// Print final common values array
console.log(common);

// =========================================================
// C) FUNCTION ASSIGNMENTS
// Based on concepts from functions.js:
// function declaration, function expression, arrow, callback
// =========================================================

// 1) Create a function declaration `sayHello` that prints "Hello JS".
// Call it 2 times.

// 2) Create a function declaration `addTwoNumbers(a, b)` that returns sum.
// Print result for (10, 20) and (7, 9).

// 3) Create a function declaration `isEven(n)` that returns true if number is even.
// Test it with 8 and 11.

// 4) Create a function declaration `findSquare(n)` and return n*n.
// Store result in a variable and print it.

// 5) Create a function expression `multiply` that returns product of 2 numbers.
// Print multiply(6, 4).

// 6) Create an anonymous function and assign it to `divide`.
// Return division of a by b and print divide(20, 5).

// 7) Create an arrow function `subtract` that returns a-b.
// Print subtract(30, 12).

// 8) Create an arrow function `cube` using one-line return style.
// Print cube(3), cube(5).

// 9) Create a function `applyOperation(a, b, opFunc)`.
// It should return opFunc(a, b). (This is callback use)
// Test with +, -, and * operations.

// 10) Create callback function `getDouble(n)` that returns n*2.
// Create function `processNumber(num, cb)` and return cb(num).
// Print processNumber(9, getDouble).

// 11) Create function `printResult(value, cb)`:
// It should print cb(value).
// Pass a callback that returns value + 100.

// 12) Create function `repeatMessage(message, times, cb)`:
// Use loop and call cb(message) each time.
// Callback should print message in uppercase.
