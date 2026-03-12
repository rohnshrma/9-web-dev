# Array Practical Test

## Instructions
- Solve all tasks in JavaScript.
- Use only the topics and methods covered in `array.js`.
- Focus mainly on `map()`, `sort()`, `filter()`, `reduce()`, `forEach()`, `some()`, `every()`, and `find()`.
- Do not use topics that are not covered in `array.js`.

## Test Data

```js
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
  "danish"
];

var nums = [23, 123, 44, 34, 3, 2, 12, 34, 23, 1000];

var marks = [78, 45, 22, 91, 35, 67, 29, 88, 40, 55];

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

## Tasks

1. Print the total number of items in `names`, then print the first and last name.
2. Use `forEach()` to print each name with its index in this format: `"0 -> rohit"`.
3. Use `forEach()` to print each name in uppercase and also print `"valid"` or `"invalid"` depending on whether its length is greater than `4`.
4. Use `forEach()` to count how many names start with `"j"` and print the final count.
5. Use `forEach()` to add all values of `nums` into a `sum` variable and print the sum.
6. Use `map()` to create a new array where each number is converted into a string like `"44 is even"` or `"23 is odd"`.
7. Use `map()` to create a new array of name lengths, then print that new array.
8. Use `map()` to create email ids in the format `name@mail.com`, then sort that new array alphabetically.
9. Use `filter()` to keep only even numbers from `nums`, then sort that result in ascending order.
10. Use `filter()` to keep only names that do not start with `"j"`, then sort them alphabetically.
11. Use `filter()` to keep marks greater than or equal to `35`, then print how many passed.
12. Use `map()` and `filter()` together: first convert `nums` into `"even"` or `"odd"` labels, then keep only the `"even"` labels.
13. Use `filter()` and `map()` together: first keep names with length at least `5`, then convert them to uppercase.
14. Use `filter()` and `sort()` together: keep only numbers greater than `20`, then sort them in descending order.
15. Use `map()` and `sort()` together: convert `names` to uppercase, then sort them alphabetically.
16. Use `map()` and `filter()` together on `marks`: first convert each mark into `"pass"` or `"fail"`, then keep only `"pass"` values.
17. Sort `nums` in ascending order and descending order without changing the original array.
18. Sort `names` alphabetically and reverse-alphabetically without changing the original array.
19. Use `reduce()` to find the total sum of `nums`, then print whether that total is greater than `1000`.
20. Use `reduce()` to find the maximum number in `nums`, then use `find()` to print the first number equal to that maximum.
21. Use `some()` to check whether any mark is below `35`, and use `every()` to check whether all marks are at least `20`.
22. Use `find()` to get the first name that starts with `"j"`, then print its index using `indexOf()`.
23. Flatten `matrix`, filter only even numbers from the flattened result, then reduce them to their total sum.
24. Use `filter()`, `sort()`, and `map()` together on `nums`: keep only even numbers, sort them ascending, then convert each number into `"Value: <number>"`.
25. Use `filter()`, `map()`, and `reduce()` together on `marks`: keep only passing marks, add `5` to each, then find their total sum.
26. Use `find()` and `map()` together on `names`: find the first name with length more than `5`, then create a new array where every name is converted to `<name>-<length>`.
27. Use `some()` and `filter()` together on `names`: first check if any name starts with `"a"`, then create a new array of all names that start with `"a"` or `"j"`.
28. Use `every()` and `map()` together on `nums`: first check whether every number is positive, then create a new array of their squares.
29. Use `forEach()` and `filter()` together on `marks`: print `"pass"` or `"fail"` for each mark, then create a new array of only failed marks.
30. Create a final report object with these values:
    - `totalNames`: total number of names
    - `jNames`: count of names starting with `"j"`
    - `evenCount`: count of even numbers in `nums`
    - `topMark`: highest value in `marks`
    Build it only with topics and methods covered in `array.js`.
