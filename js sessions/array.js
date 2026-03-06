// ARRAY BASICS:
// Array is a reference data type used to store multiple values in order.
// Items can be of same or mixed data types.
// Arrays are created using square brackets `[]` and values are comma-separated.

// `names` is an array of strings.
var names = [
  "rohit",
  "aman",
  "suman",
  "john",
  "jannie",
  "joseph",
  "jake",
  "john",
  "rohan",
  "danish",
];

// `.length` returns total number of items in the array.
console.log(names.length);

// Indexing starts at 0 in JavaScript arrays.
// `names[0]` is the first item.
console.log(names[0]);

// Last item index is always `length - 1`.
console.log(names[names.length - 1]);

// ARRAY METHODS:

// `.push(...)` adds one or more items at the end and mutates original array.
names.push("johnny", "jordan");
console.log(names);

// `.pop()` removes and returns the last item.
console.log(names.pop());

// Print array after pop to see mutation.
console.log(names);

// `.shift()` removes and returns first item.
// If array is empty, it returns `undefined`.
console.log(names.shift());

// `.unshift(...)` adds one or more items at the beginning.
names.unshift("jossie");
console.log(names);

// `.includes(value)` checks existence and returns boolean (`true` or `false`).
console.log(names.includes("jake"));
console.log(names.includes("hello"));

// `.at(index)` returns item at given index.
// Supports negative index: `-1` means last element.
console.log(names.at(0));
console.log(names.at(-1));

// Current state of array before splice examples.
console.log(names);

// `.splice(start, deleteCount, ...items)` can insert, replace, or delete.

// Example 1: insert "rohan" at index 1 without deleting.
// names.splice(1, 0, "rohan");

// Example 2: replace 1 item at index 1 with "rohan".
// names.splice(1, 1, "rohan");

// Example 3: delete 1 item at index 3.
// names.splice(3, 1);

// Active example:
// Start at index 2, remove 2 items, then insert "jeet" there.
names.splice(2, 2, "jeet");

// `.indexOf(value, fromIndex)` returns first matching index from `fromIndex`.
// If not found, returns -1.
console.log(names.indexOf("john", 2));

// 2D (nested) array: array containing arrays.
var data = [
  [1, 2, 3], // row 0
  [4, 5, 6], // row 1
  [7, 8, 9], // row 2
];

// `data[0]` is first inner array.
console.log(data[0]);

// `data[1][2]` means row 1, column 2 -> value 6.
console.log(data[1][2]);

// Third inner array.
console.log(data[2]);

// `.flat()` converts nested array into single-level array (one level by default).
console.log(data.flat());

// `.reverse()` reverses array order in place (mutates original array).
console.log(data.reverse());

// find, map, sort, reduce, forEach, filter

// IMPORTANT IDEA:
// Array callback methods (`forEach`, `map`, `filter`, `sort`) take a function.
// JavaScript calls that function once for each element.
// For each call, callback gets: current value, index, and original array.
// This is why you often see `(value, index, arr)` in examples.

// forEach:
// 1) Visits every element in order.
// 2) Good for side effects like printing, counting, updating external variable.
// 3) Return value of callback is ignored.
// 4) forEach itself returns `undefined` (so not used to build a new array).
// `name` = current item, `index` = position, `arr` = full source array.
names.forEach((name, index, arr) => {
  // Each loop prints one row: item + index + full array reference.
  console.log(name, index, arr);
});

// Same traversal, but now callback logic changes:
// `toUpperCase()` returns uppercase copy of each string.
// Original `name` string inside `names` is not changed by this line.
names.forEach((name) => {
  console.log(name.toUpperCase());
});

// Ternary operator format: condition ? valueIfTrue : valueIfFalse
// Here we check name length and print a label for each item.
names.forEach((name) => {
  console.log(name.length > 4 ? name : "invalid names");
});

// map:
// 1) Visits every item like forEach.
// 2) Whatever callback returns becomes one element of NEW output array.
// 3) Output array length is always same as input length.
// 4) Does not mutate original array by default.
// Build an output message for each name and store in `validNames`.
var validNames = names.map((name) => {
  // Returned string is collected into new array at same index.
  return `${name} is ${name.length > 4 ? "Valid" : "Invalid"}`;
});

// Final mapped array of messages.
console.log(validNames);

// Number array for map/filter/sort examples.
var nums = [23, 123, 44, 34, 3, 2, 12, 34, 23];

// `%` gives remainder after division.
// `n % 2 === 0` means divisible by 2, so number is even.
// map builds one label per number.
var mapRes1 = nums.map((n) => `${n} is ${n % 2 === 0 ? "even" : "odd"}`);

// Example output item: "44 is even".
console.log(mapRes1);

// Same input, different transformation:
// Output becomes an array of booleans showing even check result.
var mapRes2 = nums.map((n) => n % 2 === 0);

// Example output item: true for 44, false for 23.
console.log(mapRes2);

// Manual map version with `for` loop:
// This helps understand what map is doing internally.
var manualMapRes = [];
for (var i = 0; i < nums.length; i++) {
  // Push one transformed value per iteration.
  manualMapRes.push(`${nums[i]} is ${nums[i] % 2 === 0 ? "even" : "odd"}`);
}

// Should match `mapRes1`.
console.log(manualMapRes);

// filter:
// 1) Callback must return true/false.
// 2) If true, element is kept.
// 3) If false, element is skipped.
// 4) Output length can be smaller/equal to input (never bigger).

// Keep numbers that pass even condition.
var filterRes = nums.filter((n) => n % 2 === 0);

// Output contains only accepted elements.
console.log(filterRes);

// Manual filter version:
// If condition is true, push into result array.
var evens = [];
for (var i = 0; i < nums.length; i++) {
  // `&&` short-circuit:
  // if left side true, right side runs -> push value.
  nums[i] % 2 === 0 && evens.push(nums[i]);
}

// Should match `filterRes`.
console.log(evens);

// `name[0]` means first character.
// `!= "j"` keeps names not starting with j.
var nonJNames = names.filter((name) => name[0] != "j");

// Print filtered names list.
console.log(nonJNames);

// sort:
// 1) sort() changes order of SAME array (mutation).
// 2) Without comparator, numbers are treated as strings (can give wrong order).
// 3) So for numbers, always pass comparator `(a, b) => a - b` or `b - a`.
// `.slice()` creates shallow copy first, so `nums` stays unchanged.
// Ascending comparator:
// If result < 0, `a` comes first.
// If result > 0, `b` comes first.
var sortNumsAsc = nums.slice().sort((a, b) => a - b);
console.log(sortNumsAsc);

// Descending order by reversing subtraction.
var sortNumsDesc = nums.slice().sort((a, b) => b - a);
console.log(sortNumsDesc);

// For strings, `localeCompare` gives safer alphabetical comparison.
// Negative => left string before right string.
var sortNamesAsc = names.slice().sort((a, b) => a.localeCompare(b));
console.log(sortNamesAsc);

// Swap comparison direction for reverse alphabetical.
var sortNamesDesc = names.slice().sort((a, b) => b.localeCompare(a));
console.log(sortNamesDesc);

// =========================================================
// PRACTICE TASKS: forEach (10)
// =========================================================
// 1) Print each name with its index using forEach.
// 2) Print each number and its square using forEach.
// 3) Count how many names have length > 5 using forEach.
// 4) Print only even numbers from nums using forEach + if.
// 5) Print each name in uppercase using forEach.
// 6) Create a variable `sum` and add all nums using forEach.
// 7) Print "pass" if number >= 35 else "fail" for marks array.
// 8) Print each name as: "Hello, <name>".
// 9) Count vowels in each name and print result line by line.
// 10) Print only names that start with "j" using forEach + if.

// =========================================================
// PRACTICE TASKS: map (10)
// =========================================================
// 1) Create new array of squares from nums.
// 2) Create new array of cubes from nums.
// 3) Convert each name to uppercase and store in new array.
// 4) Convert each name to its length.
// 5) Convert nums to "even"/"odd" labels.
// 6) Add 10 to each number and store result.
// 7) Convert each number to string with "Rs." prefix.
// 8) Create new array where each name is "<name>@mail.com".
// 9) Multiply each number by index and return new array.
// 10) Convert each number to boolean showing if it is > 50.

// =========================================================
// PRACTICE TASKS: sort (10)
// =========================================================
// 1) Sort nums in ascending order.
// 2) Sort nums in descending order.
// 3) Sort names alphabetically.
// 4) Sort names reverse-alphabetically.
// 5) Sort marks array ascending.
// 6) Sort marks array descending.
// 7) Sort array [100, 2, 25, 9] correctly as numbers.
// 8) Sort array of month names alphabetically.
// 9) Sort word array by length (short to long).
// 10) Sort word array by length (long to short).

// =========================================================
// PRACTICE TASKS: filter (10)
// =========================================================
// 1) Filter only even numbers from nums.
// 2) Filter only odd numbers from nums.
// 3) Filter numbers greater than 30.
// 4) Filter numbers between 10 and 50.
// 5) Filter names with length >= 5.
// 6) Filter names starting with "j".
// 7) Filter names not starting with "j".
// 8) Filter marks >= 40.
// 9) Filter numbers divisible by 3.
// 10) Filter positive numbers from array with negatives and zero.
