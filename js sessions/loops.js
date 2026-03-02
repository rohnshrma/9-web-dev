// `marks` is an array (ordered collection) of numbers.
// Arrays let you store multiple values in one variable and access each value by index.
// Example: index 0 -> 34, index 1 -> 455, and so on.
var marks = [34, 455, 5, 2, 33, 4, 442, 32];

// Classic `for` loop syntax:
// 1) `var i = 0`     -> initialization (start from first index)
// 2) `i < marks.length` -> condition (loop continues while true)
// 3) `i += 1`        -> update (move to next index after each iteration)
for (var i = 0; i < marks.length; i += 1) {
  // `marks[i]` gets the current element.
  // `console.log(...)` prints it to the browser console.
  console.log(marks[i]);
}

// Loop through the same array again to classify each number as even or odd.
for (var i = 0; i < marks.length; i += 1) {
  // `%` (modulus) gives remainder after division by 2.
  // If remainder is 0, number is even; otherwise odd.
  // Ternary operator:
  // condition ? value_if_true : value_if_false
  // Template literals (backticks) let you embed values using `${...}`.
  console.log(
    marks[i] % 2 === 0 ? `${marks[i]} is even` : `${marks[i]} is odd`
  );
}

// Empty array to collect even numbers.
var evens = [];

// Empty array to collect odd numbers.
var odds = [];

// Split numbers into `evens` and `odds`.
for (var i = 0; i < marks.length; i += 1) {
  // If current value is even, push into `evens`; else push into `odds`.
  // `push(...)` appends an element to the end of an array.
  marks[i] % 2 === 0 ? evens.push(marks[i]) : odds.push(marks[i]);
}

// Print both arrays together so you can compare the split result.
console.log(evens, odds);

// ------------------------------------------------------------
// Practice task 1:
// "Create a new array storing the square of numbers"
// ------------------------------------------------------------

// Input array for squaring.
// var arrays = [2, 5, 6, 11, 20, 3, 9];

// Output array where squared values will be stored.
// var result = []

// Loop over every number in `arrays`.
// for(var i = 0; i<arrays.length; i+=1){
//  `arrays[i] * arrays[i]` means number squared (n^2).
//  result.push(arrays[i]*arrays[i]);
// }

// Print squared results.
//  console.log(result);

// ------------------------------------------------------------
// Practice task 2:
// "Find out sum of all numbers from array"
// (You can solve it by creating `sum = 0` and adding each item in a loop.)
// ------------------------------------------------------------

var sum = 0;
for (var i = 0; i < marks.length; i += 1) {
  sum += marks[i];
}

console.log(sum);
