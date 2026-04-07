// ============================================================
// FETCH API BASICS
// ============================================================
// `fetch()` is the modern browser API used to make HTTP requests.
//
// It is commonly used to:
// - get data from an API
// - send data to a server
// - update data
// - delete data
//
// In this example, we are making a GET request to read users data
// from a fake API called JSONPlaceholder.

// ============================================================
// IMPORTANT IDEA: WHAT `fetch()` RETURNS
// ============================================================
// `fetch(...)` does NOT return the real data immediately.
// It returns a Promise.
//
// A Promise is an object that represents a value that will be
// available later.
//
// Think of it like this:
// "The browser has started the request.
//  I promise to give you the result when it is ready."
//
// That is why we use:
// - `.then(...)` for success steps
// - `.catch(...)` for error handling

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // ========================================================
    // STEP 1: RECEIVE THE RESPONSE OBJECT
    // ========================================================
    // The first `.then(...)` does NOT directly receive the final JSON data.
    // It receives a `Response` object from the browser.
    //
    // This object contains useful information such as:
    // - `status`   -> HTTP status code like 200, 404, 500
    // - `ok`       -> true if response status is in success range
    // - `headers`  -> response headers
    // - `json()`   -> method to convert JSON body into JavaScript
    //
    // Example:
    // response.status === 200 means success
    console.log("Response object received:", response);
    console.log("Status code:", response.status);
    console.log("Was request successful?", response.ok);

    // ========================================================
    // STEP 2: MANUAL ERROR CHECK
    // ========================================================
    // Important:
    // `fetch()` only rejects for network-level problems
    // such as:
    // - no internet
    // - DNS issue
    // - request blocked
    //
    // If server returns 404 or 500,
    // `fetch()` still resolves the Promise.
    //
    // That means we should manually check `response.ok`.
    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }

    // ========================================================
    // STEP 3: CONVERT RESPONSE BODY TO JAVASCRIPT
    // ========================================================
    // `response.json()` reads the response body and parses JSON.
    //
    // Very important:
    // this ALSO returns a Promise.
    //
    // Why?
    // Because reading and parsing the response body also takes time.
    return response.json();
  })
  .then((users) => {
    // ========================================================
    // STEP 4: WORK WITH FINAL DATA
    // ========================================================
    // This second `.then(...)` gets the actual JavaScript data
    // after `response.json()` is completed.
    //
    // Since the API returns a JSON array of user objects,
    // `users` becomes a normal JavaScript array.
    console.log("Final JavaScript data:", users);

    // We can now loop through the data and use it however we want.
    users.forEach((user, index) => {
      console.log(
        `${index + 1}. ${user.name} | ${user.email} | ${user.address.city}`
      );
    });
  })
  .catch((error) => {
    // ========================================================
    // STEP 5: HANDLE ERRORS
    // ========================================================
    // `.catch(...)` runs if:
    // - network request fails
    // - we manually throw an error
    // - JSON parsing fails
    //
    // `error` is usually an Error object.
    console.error("Error while fetching users:", error);
  });

// ============================================================
// FULL FLOW OF THIS PROGRAM
// ============================================================
// 1) `fetch(url)` starts an HTTP request
// 2) JavaScript does NOT stop the whole program
// 3) Browser handles request in the background
// 4) When response arrives, first `.then(...)` runs
// 5) We check status and convert response body using `.json()`
// 6) When JSON parsing finishes, second `.then(...)` runs
// 7) If something goes wrong, `.catch(...)` runs
//
// This is asynchronous JavaScript in action.

// ============================================================
// WHY FETCH IS EASIER THAN XMLHttpRequest
// ============================================================
// Compared to old XHR syntax, `fetch()` is:
// - shorter
// - cleaner
// - Promise-based
// - easier to combine with async/await later
//
// But the core concept is still the same:
// send request -> wait asynchronously -> receive response -> use data
