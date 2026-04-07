# Async JavaScript Notes

## 1. What is synchronous JavaScript?

Synchronous means code runs one line at a time, in order.

JavaScript reads a statement, finishes it, then moves to the next one.

Example:

```js
console.log("Start");
console.log("Middle");
console.log("End");
```

Output:

```js
Start
Middle
End
```

Why? Because each line finishes immediately, so JavaScript can continue in a simple top-to-bottom flow.

This kind of code is easy to follow, but there is a problem:

If one task takes a long time, the next lines must wait.

Example idea:

```js
console.log("Start");

// Imagine this takes 5 seconds
doVerySlowWork();

console.log("End");
```

Here, `End` cannot print until the slow work finishes.

That waiting behaviour is called **blocking**.

---

## 2. What is asynchronous JavaScript?

Asynchronous means JavaScript can start some work now and handle its result later.

This is useful for tasks that take time, such as:

- API requests
- timers like `setTimeout`
- file reading
- database operations
- user events like clicks

Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer finished");
}, 2000);

console.log("End");
```

Output:

```js
Start
End
Timer finished
```

Why did this happen?

Because `setTimeout` starts the timer and lets JavaScript continue running the next line. The callback runs later when the timer is done.

So asynchronous code helps JavaScript avoid blocking everything while waiting.

---

## 3. What does single-threaded mean?

JavaScript is called **single-threaded** because one main thread executes JavaScript code.

That means JavaScript can do one main piece of JavaScript work at a time.

It does **not** mean JavaScript cannot handle async operations.

It means:

- one call stack
- one line of JavaScript execution at a time
- but browser features can help with waiting tasks in the background

Important understanding:

JavaScript itself is single-threaded, but the browser provides APIs such as:

- `setTimeout`
- `fetch`
- DOM events
- `XMLHttpRequest`

These browser features can handle waiting outside the main JavaScript execution flow. When they finish, they notify JavaScript to run the callback or promise handler.

So the better mental model is:

JavaScript runs one thing at a time, but the browser helps manage time-consuming tasks without freezing all code.

---

## 4. Synchronous vs asynchronous in one example

### Synchronous style

```js
console.log("1");
console.log("2");
console.log("3");
```

Output:

```js
1
2
3
```

### Asynchronous style

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");
```

Output:

```js
1
3
2
```

Even though delay is `0`, the callback still runs later, because it is asynchronous.

---

## 5. Why async programming is needed

Suppose a page needs user data from a server.

If JavaScript waited in a blocking way, the whole page could freeze until the server responded.

Instead, JavaScript does this:

1. start the request
2. continue running other code
3. receive the result later
4. run some function to handle that result

That "run this later" idea is the foundation of async JavaScript.

---

## 6. Callback concept

A callback is a function passed into another function so it can be called later.

Simple example:

```js
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Rohan", () => {
  console.log("This runs after greet finishes");
});
```

Why callbacks matter:

- they let us decide what should happen after a task completes
- they are heavily used in async programming
- they were the main async pattern before promises and async/await became popular

---

## 7. `callback.js` explanation

File: `async/callback.js`

This file creates a reusable function:

```js
function sendRequest(url, handler) {
```

### What this function does

- accepts a `url`
- accepts a callback named `handler`
- creates an `XMLHttpRequest`
- sends a request to the given URL
- waits for the request to finish
- calls the callback with success or error

### Why pass a callback here?

Because the request does not finish immediately.

If we try to return API data directly from an asynchronous request in a simple way, the data usually will not be ready yet.

So instead of saying:

```js
var data = sendRequest(...);
```

we say:

```js
sendRequest(url, function (err, data) {
  // use the result here
});
```

That means:

"When the request is done, run this function."

### Error-first callback pattern

In `callback.js`, the callback is called like this:

```js
handler(null, successData);
```

or

```js
handler(errorObject, null);
```

This is called the **error-first callback pattern**.

Rule:

- first parameter = error
- second parameter = success data

So:

- success -> `err` is `null`
- failure -> `data` is `null`

### Flow of `callback.js`

1. `sendRequest(...)` is called
2. XHR object is created
3. listener is attached
4. request is opened and sent
5. JavaScript continues running
6. when response arrives, listener runs
7. callback gets called with error or data

### Why this file is important

This file teaches the core idea of async programming:

we cannot use future data immediately, so we provide a function that should run later.

---

## 8. `request.js` explanation

File: `async/request.js`

This file shows async HTTP requests using **XMLHttpRequest**, the older browser API.

### Main parts of the file

#### 1. Create request object

```js
var request = new XMLHttpRequest();
```

This object stores information about the request and response.

#### 2. Listen for state changes

```js
request.addEventListener("readystatechange", () => {
```

This event fires multiple times as the request moves through different stages.

#### 3. Check `readyState`

Important values:

- `0` -> request not prepared
- `1` -> request opened
- `2` -> headers received
- `3` -> loading response
- `4` -> request finished

But `4` only means finished, not successful.

#### 4. Check `status`

Examples:

- `200` -> OK
- `404` -> not found
- `500` -> server error

So the success check is usually:

```js
if (request.readyState === 4 && request.status === 200) {
```

#### 5. Convert JSON text to JavaScript

```js
var comments = JSON.parse(request.responseText);
```

The response body usually comes as a string.

If that string contains JSON, we use `JSON.parse(...)` to convert it into a JavaScript array or object.

#### 6. Open the request

```js
request.open("GET", "https://jsonplaceholder.typicode.com/comments");
```

This prepares the request.

#### 7. Send the request

```js
request.send();
```

This actually sends it.

### What this file teaches

`request.js` helps you understand the lower-level mechanics of async requests:

- request lifecycle
- state tracking
- status codes
- string-to-JSON conversion

This is more detailed and manual than `fetch()`.

---

## 9. `fetch.js` explanation

File: `async/fetch.js`

This file shows the modern way of making requests in the browser.

### Basic fetch syntax

```js
fetch("https://jsonplaceholder.typicode.com/users")
```

This starts an HTTP request.

### Important: `fetch()` returns a Promise

It does not return final data immediately.

It returns a **Promise**, which means:

"The result is not ready now, but it will be ready later."

That is why we use `.then(...)`.

### First `.then(...)`

```js
.then((response) => {
```

The first `.then(...)` receives a `Response` object, not the final parsed data.

This object includes:

- `response.status`
- `response.ok`
- `response.json()`

### Why check `response.ok`?

Because `fetch()` behaves differently from what many beginners expect.

Important rule:

- network failure -> Promise rejects -> `.catch(...)`
- HTTP error like 404/500 -> Promise usually resolves, not rejects

That means a server error page still reaches `.then(...)`.

So we manually check:

```js
if (!response.ok) {
  throw new Error("HTTP error! Status: " + response.status);
}
```

### Why return `response.json()`?

```js
return response.json();
```

Because the body still needs to be read and parsed.

`response.json()` also returns a Promise.

So:

- first Promise = request result
- second Promise = JSON parsing result

### Second `.then(...)`

```js
.then((users) => {
```

This receives the real JavaScript data after JSON parsing is complete.

Now `users` is a normal array, so we can loop through it, print it, or show it in HTML.

### `.catch(...)`

```js
.catch((error) => {
```

This handles:

- network errors
- manually thrown errors
- JSON parsing errors

### What this file teaches

`fetch.js` teaches the modern Promise-based async pattern:

1. start request
2. wait for response
3. parse body
4. use final data
5. handle errors

---

## 10. XHR vs callback vs fetch

### `request.js`

Focus:

- raw `XMLHttpRequest`
- readyState
- status checking
- manual lifecycle understanding

Best for learning:

- how browser requests actually progress

### `callback.js`

Focus:

- passing a function to run later
- reusing async request logic
- error-first callback style

Best for learning:

- how async results are handed back to other code

### `fetch.js`

Focus:

- modern browser API
- promises
- cleaner syntax
- easier code flow

Best for learning:

- how async requests are usually written today

---

## 11. Common beginner confusion

### "If JavaScript is single-threaded, how can it do async work?"

Because JavaScript itself runs one thing at a time, but browser APIs handle waiting tasks outside the main call stack and later notify JavaScript.

### "Why does data not return immediately from an API call?"

Because the request travels over the network and takes time. JavaScript cannot pretend the result already exists.

### "Why do we need callbacks or promises?"

Because the result is future data. We need a way to tell JavaScript what should happen when that future data finally arrives.

### "Why does `fetch()` need two `.then(...)` blocks?"

Because:

1. one step gets the response object
2. another step reads and parses the JSON body

---

## 12. Mental model to remember

You can think like this:

- synchronous = do it now, then move on
- asynchronous = start now, finish later
- single-threaded = one main JavaScript execution path at a time
- callback = function to run later
- XHR = older manual request system
- fetch = modern promise-based request system

---

## 13. Very short summary

JavaScript is single-threaded, which means it executes one main piece of JavaScript work at a time. But it still handles asynchronous tasks by using browser features like timers, events, `XMLHttpRequest`, and `fetch`. Callbacks were an early and important way to handle async results. `XMLHttpRequest` shows the lower-level mechanics of requests, while `fetch()` gives a cleaner modern Promise-based way to do the same job.
