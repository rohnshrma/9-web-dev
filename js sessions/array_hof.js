// ============================================================
// ARRAY HIGHER ORDER FUNCTIONS (HOFs) IN JAVASCRIPT
// ============================================================
// Higher order functions are functions that can:
// 1. take another function as an argument
// 2. return a function
//
// In array methods like forEach, map, and filter,
// we pass a callback function.
//
// That callback runs once for every item in the array.

var marks = [12, 34, 33, 45, 56, 2, 32, 32];

// ============================================================
// forEach()
// ============================================================
// `forEach()` is used to visit each item of an array one by one.
//
// Important points:
// 1. It does NOT create a new array by itself.
// 2. It does NOT return a useful value for storing results.
// 3. It is mainly used when we want to perform an action.
//
// Common use cases:
// - print values
// - update external variables
// - push values into another array
//
// Syntax:
// array.forEach(function (item, index, originalArray) {})
//
// Parameters received by callback:
// - item -> current item
// - index -> current position
// - originalArray -> full original array

// print double of each item from the array

// => for loop
// This is the normal loop approach.
// We manually control the index using `i`.
console.log("\nUsing For Loop");
for (var i = 0; i < marks.length; i += 1) {
  console.log(marks[i] * 2);
}

// => arr.forEach
// Here JavaScript automatically gives us each item one by one.
// `mark` is current value
// `i` is current index
// `arr` is original array
console.log("\nUsing ForEach");
marks.forEach((mark, i, arr) => {
  console.log(mark * 2);
});

// create a new array of doubles
// Since forEach does not create a new array automatically,
// we create an empty array first and manually push values into it.
var doubles = [];

marks.forEach((mark) => doubles.push(mark * 2));

console.log("\nDoubles : ", doubles);

// new array of odd numbers
// We again use an external array and push only those values
// that satisfy the condition.
var odds = [];

// This longer version is easier for beginners to read:
// marks.forEach((mark) => {
//   if (mark % 2 !== 0) {
//     odds.push(mark);
//   }
// });
// console.log("\nOdds using ForEach =>", odds);

// This is the short version using logical AND.
// If condition is true, `odds.push(mark)` runs.
marks.forEach((mark) => mark % 2 !== 0 && odds.push(mark));
console.log("\nOdds using ForEach =>", odds);

// ============================================================
// map()
// ============================================================
// `map()` is used when we want to transform every item
// and build a NEW array from those transformed values.
//
// Important points:
// 1. map always returns a new array
// 2. output array length is same as original array length
// 3. use map when every item should produce one output value
//
// Think of map like:
// "Take each item, do something to it, and store the result."

// Each mark is multiplied by 2.
// The returned value from callback becomes part of the new array.
var double_using_map = marks.map((mark) => mark * 2);
console.log("\nDouble using map => ", double_using_map);

// Here we are checking whether each mark is even.
// So output will not contain even numbers themselves.
// It will contain true/false for each item.
//
// Example:
// 12 -> true
// 33 -> false
var evens_using_map = marks.map((mark) => mark % 2 === 0);

console.log("\nEvens Using Map =>", evens_using_map);

// ============================================================
// filter()
// ============================================================
// `filter()` is used when we want to keep only those items
// that pass a condition.
//
// Important points:
// 1. filter returns a new array
// 2. output array can be smaller, equal, or even empty
// 3. callback must return true or false
//
// Think of filter like:
// "Check every item and keep only matching ones."

// create an array of even numbers only
// If condition is true, item is included in new array.
// If condition is false, item is skipped.
var evens_using_filter = marks.filter((mark) => mark % 2 === 0);

console.log("\nEvens Using Filter =>", evens_using_filter);

// ============================================================
// QUICK DIFFERENCE
// ============================================================
// forEach -> do some action for each item
// map     -> transform each item into a new value
// filter  -> keep only matching items
//
// Beginner tip:
// If you are pushing into a new array manually,
// ask yourself whether map or filter would be cleaner.

// sort : Return a new array with sorted items

// some : Return true if any of the item passed the given condition else false

// every : Return true all the items passed the given condition else false

// ============================================================
// PRACTICE TASKS
// ============================================================
// Practice on forEach():
// 1. Print square of each number from marks.
// 2. Print each value with its index like: "Index 0 -> 12".
// 3. Create a new array storing triple of each number using forEach.
// 4. Create a new array storing only numbers greater than 30 using forEach.
// 5. Find the sum of all marks using forEach and an external variable.
//
// Practice on map():
// 1. Create a new array of halves of each number.
// 2. Convert each number into a string like "Mark: 12".
// 3. Create a new array storing `true` for odd numbers and `false` for even numbers.
// 4. Add 5 to every number and store result in a new array.
// 5. Create a new array of squares of all marks.
//
// Practice on filter():
// 1. Create a new array of numbers greater than 20.
// 2. Create a new array of odd numbers.
// 3. Create a new array of numbers less than 35.
// 4. Create a new array of numbers divisible by 4.
// 5. Create a new array of numbers between 10 and 40.
//
// Mixed practice on these methods:
// 1. Use filter to get odd numbers, then print them using forEach.
// 2. Use map to make doubles, then print only values greater than 50.
// 3. Use filter to get even numbers, then map them into their squares.
// 4. Use map to add 10 to every mark, then filter values above 40.
// 5. Use filter to get marks below 35, then print "Need Improvement: value".

// ============================================================
// 10 COMBINATION TASKS
// ============================================================
// 1. Filter even numbers from marks, then map them to double values.
// 2. Filter odd numbers from marks, then map them to square values.
// 3. Map every mark to mark + 5, then filter marks greater than 40.
// 4. Filter marks greater than 30, then use forEach to print them with index.
// 5. Map marks to strings like "Score: 12", then print all using forEach.
// 6. Filter marks less than 35, then map them to "Fail" or "Needs Work" style strings.
// 7. Map every mark to its remainder when divided by 2, then filter only 0 values.
// 8. Filter numbers divisible by 2, map them to halves, then print results using forEach.
// 9. Filter numbers above 20, map them to triple values, then filter results above 100.
// 10. Create a new array of square values using map, then filter only squares above 1000.
