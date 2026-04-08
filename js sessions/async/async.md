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

---

## 14. What problem appears in `callback.js`?

At first, callbacks feel simple.

One request with one callback is easy to read:

```js
sendRequest("/comments/1", (err, data) => {
  if (!err) {
    console.log(data);
  }
});
```

But when one async task depends on another async task, we often start nesting callbacks inside callbacks.

Example:

```js
sendRequest("/comments/1", (err, data1) => {
  if (!err) {
    sendRequest("/comments/2", (err, data2) => {
      if (!err) {
        sendRequest("/comments/3", (err, data3) => {
          console.log(data1, data2, data3);
        });
      }
    });
  }
});
```

This shape keeps moving to the right.

That problem is called:

- callback hell
- pyramid of doom

### Why callback hell is a problem

- code becomes hard to read
- error handling gets repeated again and again
- adding one more step makes indentation deeper
- changing the order is harder
- debugging becomes more tiring

Callbacks are still valid and important to understand, but large callback chains become difficult to manage.

That pain is one of the big reasons Promises became popular.

---

## 15. What is a Promise?

A Promise is an object that represents the result of an asynchronous operation.

Simple meaning:

- the result is not available right now
- but it will settle later
- and when it settles, it will either succeed or fail

A Promise has 3 states:

- `pending` -> still waiting
- `fulfilled` -> completed successfully
- `rejected` -> failed

You can think of a Promise like this:

"I cannot give you the final answer now, but I promise I will give you either a value or an error later."

---

## 16. Basic Promise example from `promise.js`

File: `async/promise.js`

The first example is:

```js
function checkAge(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (age >= 18) {
        resolve(`You're eligible as your age is ${age}`);
      } else {
        reject(`Not Eligible as your age is ${age}`);
      }
    }, 3000);
  });
}
```

### Deep explanation

#### `return new Promise(...)`

This creates and returns a Promise object.

That means `checkAge(age)` does not directly return the final message string.

It returns a Promise that will produce the message later.

#### Promise executor function

Inside `new Promise(...)`, this part runs immediately:

```js
(resolve, reject) => {
```

JavaScript gives us two functions:

- `resolve` -> call this when work succeeds
- `reject` -> call this when work fails

#### `setTimeout(...)`

This is only used to simulate delay.

It helps show that the result comes later, not immediately.

#### `resolve(...)`

```js
resolve(`You're eligible as your age is ${age}`);
```

This changes the Promise from `pending` to `fulfilled`.

Whatever value we pass into `resolve(...)` becomes available inside `.then(...)`.

#### `reject(...)`

```js
reject(`Not Eligible as your age is ${age}`);
```

This changes the Promise from `pending` to `rejected`.

Whatever value we pass into `reject(...)` becomes available inside `.catch(...)`.

---

## 17. How `.then(...)` and `.catch(...)` work

When we write:

```js
checkAge(30)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
```

this means:

1. call `checkAge(30)`
2. get back a Promise immediately
3. attach a success handler using `.then(...)`
4. attach an error handler using `.catch(...)`
5. when the Promise settles, run the correct handler

### Important idea

`.then(...)` does not run immediately.

It registers a function that should run later if the Promise is fulfilled.

`.catch(...)` registers a function that should run later if the Promise is rejected.

So this:

```js
.then((response) => console.log(response))
```

means:

"If this Promise succeeds later, run this function and give it the resolved value."

And this:

```js
.catch((error) => console.log(error))
```

means:

"If this Promise fails later, run this function and give it the rejected reason."

---

## 18. Converting callback-style thinking into Promise-style thinking

Callback style usually looks like this:

```js
sendRequest(url, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

Promise style looks like this:

```js
sendRequest(url)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
```

Big idea:

- callback style passes the handler into the async function
- promise style returns a Promise first, then handlers are attached outside

This is one reason Promises often feel cleaner.

---

## 19. `sendRequest()` in `promise.js`

In `promise.js`, this function wraps `XMLHttpRequest` inside a Promise:

```js
function sendRequest(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve({
          status: 200,
          message: "Request Successfull",
          data: JSON.parse(request.responseText),
        });
      } else if (request.readyState === 4 && request.status !== 200) {
        reject({
          status: 404,
          message: "Resource not found",
          data: null,
        });
      }
    });

    request.open("GET", url);
    request.send();
  });
}
```

### Deep explanation of what changed from callback version

In `callback.js`, the function accepted a callback parameter:

```js
function sendRequest(url, handler) {
```

In `promise.js`, it does not accept a callback.

Instead, it returns a Promise:

```js
function sendRequest(url) {
  return new Promise(...);
}
```

That means the function itself is now responsible for saying:

- success -> `resolve(...)`
- failure -> `reject(...)`

The outside code decides what to do next by attaching `.then(...)` and `.catch(...)`.

This separates responsibilities more cleanly:

- inside `sendRequest` -> perform the request
- outside `sendRequest` -> decide how to use the result

---

## 20. One important thing about the current `promise.js`

The current file makes many requests like this:

```js
sendRequest("https://jsonplaceholder.typicode.com/comments/1")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));

sendRequest("https://jsonplaceholder.typicode.com/comments/2")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
```

These calls are not waiting for each other.

They all start almost immediately.

That means they are running in parallel from our code's point of view.

### Why that matters

If request 5 finishes before request 2, its result may print earlier.

So the output order is not guaranteed to match the writing order of the lines.

This is a very important async concept:

starting tasks in order does not guarantee finishing in order.

---

## 21. Promise chaining

One of the biggest advantages of Promises is chaining.

Example:

```js
sendRequest("https://jsonplaceholder.typicode.com/comments/1")
  .then((response1) => {
    console.log(response1.data);
    return sendRequest("https://jsonplaceholder.typicode.com/comments/2");
  })
  .then((response2) => {
    console.log(response2.data);
    return sendRequest("https://jsonplaceholder.typicode.com/comments/3");
  })
  .then((response3) => {
    console.log(response3.data);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Why this is better than nested callbacks

- flatter structure
- easier to read top to bottom
- one final `.catch(...)` can handle errors from the chain
- each `.then(...)` can return another Promise

### Very important rule

Whatever you `return` inside `.then(...)` becomes the input to the next `.then(...)`.

That is why this works:

```js
return sendRequest("/comments/2");
```

The next `.then(...)` waits for that returned Promise to finish.

---

## 22. What is `async/await`?

`async/await` is a cleaner syntax built on top of Promises.

Important truth:

`async/await` does not replace Promises internally.

It is just a more readable way to work with them.

### Two rules to remember

#### Rule 1: `async` makes a function return a Promise

```js
async function demo() {
  return 10;
}
```

Even though it looks like it returns `10`, it actually returns a Promise that resolves to `10`.

#### Rule 2: `await` pauses inside an async function until a Promise settles

```js
var result = await somePromise;
```

This means:

- wait until the Promise finishes
- if fulfilled, store the resolved value in `result`
- if rejected, throw an error that can be caught with `try...catch`

---

## 23. `async-await.js` explanation

File: `async/async-await.js`

The file uses this function:

```js
var handleRequest = async (url) => {
  try {
    var response = await sendRequest(url);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
```

### Deep explanation line by line

#### `async (url) =>`

This marks the function as asynchronous.

So `handleRequest(url)` automatically returns a Promise.

#### `await sendRequest(url)`

`sendRequest(url)` returns a Promise.

`await` tells JavaScript:

"Pause this async function here until that Promise settles."

If it succeeds, `response` gets the resolved object.

If it fails, control jumps to `catch`.

#### `try...catch`

With Promise chaining, errors are usually handled with `.catch(...)`.

With `async/await`, the cleaner pattern is `try...catch`.

So this:

```js
try {
  var response = await sendRequest(url);
  console.log(response);
} catch (err) {
  console.log(err);
}
```

is conceptually similar to:

```js
sendRequest(url)
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
```

---

## 24. Why `async/await` feels easier to read

Compare these two styles.

### Promise style

```js
sendRequest("/comments/1")
  .then((response) => {
    console.log(response);
    return sendRequest("/comments/2");
  })
  .then((response) => {
    console.log(response);
    return sendRequest("/comments/3");
  })
  .catch((err) => {
    console.log(err);
  });
```

### Async/await style

```js
async function loadComments() {
  try {
    var response1 = await sendRequest("/comments/1");
    console.log(response1);

    var response2 = await sendRequest("/comments/2");
    console.log(response2);

    var response3 = await sendRequest("/comments/3");
    console.log(response3);
  } catch (err) {
    console.log(err);
  }
}
```

The second version looks more like normal top-to-bottom code.

That is why many developers find `async/await` easier for sequential async logic.

---

## 25. Very important: current `async-await.js` is still starting many requests in parallel

The file currently does this:

```js
handleRequest("https://jsonplaceholder.typicode.com/comments/2");
handleRequest("https://jsonplaceholder.typicode.com/comments/3");
handleRequest("https://jsonplaceholder.typicode.com/comments/4");
```

Each `handleRequest(...)` call starts independently.

Inside each call, there is an `await`, but that `await` only pauses that one function.

It does **not** pause the whole file.

So all these functions begin almost immediately, which means the requests can still finish in any order.

This is one of the most common beginner misunderstandings.

### Important sentence to remember

`await` makes code look synchronous, but only inside that async function.

It does not make all surrounding code globally synchronous.

---

## 26. Sequential vs parallel with `async/await`

### Parallel style

```js
handleRequest("/comments/1");
handleRequest("/comments/2");
handleRequest("/comments/3");
```

This starts 3 async tasks separately.

### Sequential style

```js
async function runInOrder() {
  await handleRequest("/comments/1");
  await handleRequest("/comments/2");
  await handleRequest("/comments/3");
}
```

This waits for each one before starting the next.

That difference is very important in real projects.

Use sequential execution when:

- the second task depends on the first result
- order matters
- you want to reduce simultaneous requests

Use parallel execution when:

- tasks are independent
- order of completion does not matter
- you want faster total time

---

## 27. Callback vs Promise vs async/await

### Callback

```js
sendRequest(url, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

Good for:

- learning the base async idea
- understanding how older APIs work

Weakness:

- nesting can become messy

### Promise

```js
sendRequest(url)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

Good for:

- cleaner async flow
- chaining
- central error handling

Weakness:

- long chains can still feel a little busy

### Async/await

```js
try {
  var data = await sendRequest(url);
  console.log(data);
} catch (err) {
  console.log(err);
}
```

Good for:

- readable sequential logic
- code that looks closer to synchronous style

Weakness:

- you still need to understand Promises underneath

---

## 28. Common mistakes beginners make with Promises and async/await

### Mistake 1: thinking Promise result is available immediately

Wrong idea:

```js
var result = checkAge(20);
console.log(result);
```

This prints the Promise object, not the final resolved message.

Because the Promise is still pending at that moment.

### Mistake 2: forgetting `return` in a Promise chain

Example:

```js
sendRequest("/comments/1")
  .then(() => {
    sendRequest("/comments/2");
  })
  .then((data) => {
    console.log(data);
  });
```

Problem:

The second `.then(...)` is not waiting for `sendRequest("/comments/2")` because it was not returned.

Correct version:

```js
sendRequest("/comments/1")
  .then(() => {
    return sendRequest("/comments/2");
  })
  .then((data) => {
    console.log(data);
  });
```

### Mistake 3: using `await` outside an async function

This is not valid in normal script code unless the environment supports top-level await in modules.

Usually we must do:

```js
async function run() {
  var data = await sendRequest(url);
}
```

### Mistake 4: thinking `await` blocks the whole JavaScript program

It only pauses the current async function, not the whole engine.

---

## 29. Best mental model for these three files

Think of the same task in three stages.

### Stage 1: callback

"I will give the async function a function to run later."

### Stage 2: Promise

"The async function will give me a Promise, and I will attach handlers to it."

### Stage 3: async/await

"I still have a Promise, but now I can write the handling code in a more readable style."

So the evolution is not three unrelated topics.

It is the same async idea written in increasingly cleaner ways.

---

## 30. Final summary

Callbacks teach the foundation: pass a function to run when work finishes.

Promises improve structure: return a Promise and attach `.then(...)` and `.catch(...)` handlers.

`async/await` improves readability: work with the same Promise-based logic using code that feels more linear.

If you understand how the callback version works, the Promise version makes more sense.

If you understand how Promises work, `async/await` becomes much easier.
