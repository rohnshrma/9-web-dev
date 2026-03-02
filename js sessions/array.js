// ARRAY BASICS:
// Array is a reference data type used to store multiple values in order.
// Items can be of same or mixed data types.
// Arrays are created using square brackets `[]` and values are comma-separated.

// `names` is an array of strings.
var names = ["john", "jannie", "joseph", "jake", "john"];

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
