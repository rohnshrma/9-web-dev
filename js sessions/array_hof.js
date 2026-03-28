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
// These practice tasks now include concept explanations.
// The idea is:
// 1. understand which method fits the problem
// 2. understand what output is expected
// 3. focus on the reason behind using that method

// ------------------------------------------------------------
// Practice on forEach()
// ------------------------------------------------------------
// 1. Print square of each number from marks.
// Concept:
// Use forEach because the main goal is only to perform an action
// for every item, which is printing.
// We do not need a new array here.
//
console.log("For Each task 1");
marks.forEach((mark) => console.log(mark ** 2));

// 2. Print each value with its index like: "Index 0 -> 12".
// Concept:
// forEach callback can give both value and index.
// This task helps practice callback parameters.
//

console.log("For Each task 2");
marks.forEach((mark, index) => console.log(`${mark} => ${index}`));

// 3. Create a new array storing triple of each number using forEach.
// Concept:
// forEach does not create a new array automatically,
// so we must create an empty array and push values manually.
//

console.log("For Each task 3");
var triples = [];
marks.forEach((mark) => triples.push(mark * 3));
console.log(triples);

// 4. Create a new array storing only numbers greater than 30 using forEach.
// Concept:
// This teaches that forEach can still be used with conditions,
// but we must manage the result array ourselves.
//

console.log("For Each task 4");
var greater_than_30 = [];
marks.forEach((mark) => mark > 30 && greater_than_30.push(mark));
console.log(greater_than_30);

// 5. Find the sum of all marks using forEach and an external variable.
// Concept:
// forEach is useful when we want to update one outer variable step by step.
// This is called accumulation.

var total = 0;
marks.forEach((mark) => (total += mark));
console.log("\nForEach task 5 total =>", total);

// ------------------------------------------------------------
// Practice on map()
// ------------------------------------------------------------
// 1. Create a new array of halves of each number.
// Concept:
// Use map because every original item should become one new value.
//

console.log("Map Task 1");
var halfs = marks.map((mark) => mark / 2);
console.log(halfs);

// 2. Convert each number into a string like "Mark: 12".
// Concept:
// map is not only for math operations.
// It can also transform numbers into strings or any other format.
//

console.log("Map Task 2");
var info = marks.map((mark) => `Mark : ${mark}`);
console.log(info);

// 3. Create a new array storing `true` for odd numbers and `false` for even numbers.
// Concept:
// map can turn each number into a boolean result.
// Output length will still remain equal to original length.
//

// console.log("Map Task 3");
// var divide_info = marks.map((mark) => mark % 2 === 0);
// console.log(divide_info);

console.log("Map Task 3");
var divide_info = marks.map((mark) =>
  mark % 2 === 0 ? `${mark} is even` : `${mark} is odd`
);
console.log(divide_info);

// 4. Add 5 to every number and store result in a new array.
// Concept:
// This is a basic transformation task.
// Every item changes, so map is the cleanest choice.
//

console.log("Map Task 4");
var incremented = marks.map((mark) => mark + 5);
console.log(incremented);

// 5. Create a new array of squares of all marks.
// Concept:
// Same idea again:
// one input item becomes one output item.

console.log("Map Task 5");
var squares = marks.map((mark) => mark ** 2);
console.log(squares);

// ------------------------------------------------------------
// Practice on filter()
// ------------------------------------------------------------
// 1. Create a new array of numbers greater than 20.
// Concept:
// Use filter when some items should stay and some should be removed.
//

console.log("Filter Task 1");
var greater_than_20 = marks.filter((mark) => mark > 20);
console.log(greater_than_20);

// 2. Create a new array of odd numbers.
// Concept:
// Callback should return true only for odd values.
// Those are the values that will be kept.
//

console.log("Filter Task 2");
var odds = marks.filter((mark) => mark % 2 !== 0);
console.log(odds);

// 3. Create a new array of numbers less than 35.
// Concept:
// This is another condition-based selection task.
// filter is designed exactly for this type of problem.
//

console.log("Filter Task 3");
var lesser_than_35 = marks.filter((mark) => mark < 35);
console.log(lesser_than_35);

// 4. Create a new array of numbers divisible by 4.
// Concept:
// The condition checks whether remainder is 0.
// Only matching items remain in the final array.
//

console.log("Filter Task 4");
var divisible_by_4 = marks.filter((mark) => mark % 4 === 0);
console.log(divisible_by_4);

// 5. Create a new array of numbers between 10 and 40.
// Concept:
// Here we combine two conditions using logical AND.
// This shows that filter conditions can be simple or complex.

console.log("Filter Task 5");
var range = marks.filter((mark) => mark >= 10 && mark <= 40);
console.log(range);

// ------------------------------------------------------------
// Mixed practice on these methods
// ------------------------------------------------------------
// 1. Use filter to get odd numbers, then print them using forEach.
// Concept:
// First filter selects the needed values.
// Then forEach performs the action of printing them.
// This is a very common method chain.

console.log("\nMix Task 1");
marks.filter((mark) => mark % 2 !== 0).forEach((mark) => console.log(mark));

// 2. Use map to make doubles, then print only values greater than 50.
// Concept:
// First map transforms all values.
// Then forEach is used to print selected values after checking a condition.
//

console.log("Mix Task 2");
var double_greater_than_50 = marks
  .map((mark) => mark * 2)
  .filter((mark) => mark > 50);
console.log(double_greater_than_50);

// 3. Use filter to get even numbers, then map them into their squares.
// Concept:
// First reduce the data.
// Then transform the remaining data.
//
// 4. Use map to add 10 to every mark, then filter values above 40.
// Concept:
// First change all values.
// Then select only the matching transformed values.
//

console.log("Mix Task 4");
var inc_above_40 = marks.map((mark) => mark + 10).filter((mark) => mark > 40);
console.log(inc_above_40);
// 5. Use filter to get marks below 35, then print "Need Improvement: value".
// Concept:
// This combines selection with custom output formatting.
console.log("Mix Task 5");
marks
  .filter((mark) => mark < 35)
  .forEach((mark) => console.log(`Need Improvement : ${mark}`));

// ============================================================
// 10 COMBINATION TASKS
// ============================================================
// 1. Filter even numbers from marks, then map them to double values.
// Concept: select first, transform after that.
//

console.log("Combination Task 1");
var doubles_after_filter = marks
  .filter((mark) => mark % 2 === 0)
  .map((mark) => mark * 2);
console.log(doubles_after_filter);

// 2. Filter odd numbers from marks, then map them to square values.
// Concept: keep only needed values, then change their form.
//
// 3. Map every mark to mark + 5, then filter marks greater than 40.
// Concept: transform first because condition depends on updated values.
//
// 4. Filter marks greater than 30, then use forEach to print them with index.
// Concept: filter prepares the final list, forEach performs the action.
//
// 5. Map marks to strings like "Score: 12", then print all using forEach.
// Concept: map changes data format, forEach displays it.
//
// 6. Filter marks less than 35, then map them to "Fail" or "Needs Work" style strings.
// Concept: first identify weak scores, then convert them into messages.
//
// 7. Map every mark to its remainder when divided by 2, then filter only 0 values.
// Concept: map creates a derived value, filter keeps only matching derived results.
//
// 8. Filter numbers divisible by 2, map them to halves, then print results using forEach.
// Concept: one chain can include select -> transform -> action.
//
// 9. Filter numbers above 20, map them to triple values, then filter results above 100.
// Concept: data can be filtered more than once at different stages.
//
// 10. Create a new array of square values using map, then filter only squares above 1000.
// Concept: sometimes we first create a derived dataset, then search inside it.
