// ============================================================
// PROMISE BASICS
// ============================================================
// A Promise represents the future result of an asynchronous task.
// It starts in a pending state, then becomes either:
// - fulfilled  -> work completed successfully
// - rejected   -> work failed
//
// `resolve(...)` sends the success value to `.then(...)`.
// `reject(...)` sends the failure reason to `.catch(...)`.
function checkAge(age) {
  return new Promise((resolve, reject) => {
    // `setTimeout` is used here only to simulate delay.
    // It helps us see that the Promise settles later, not immediately.
    setTimeout(() => {
      if (age >= 18) {
        // Whatever we pass to `resolve(...)` becomes the value
        // received by the callback inside `.then(...)`.
        resolve(`You're eligible as your age is ${age}`);
      } else {
        // Whatever we pass to `reject(...)` becomes the value
        // received by the callback inside `.catch(...)`.
        reject(`Not Eligible as your age is ${age}`);
      }
    }, 3000);
  });
}

// `checkAge(30)` returns a Promise immediately.
// `.then(...)` does not run right away. It registers a callback
// for the future success case.
// `.catch(...)` registers a callback for the future error case.
checkAge(30)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

checkAge(12)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));

// ============================================================
// WRAPPING XHR INSIDE A PROMISE
// ============================================================
// In the callback version, `sendRequest` accepted a handler function.
// In this version, it returns a Promise instead.
//
// That means:
// - inside this function we decide when to `resolve` or `reject`
// - outside this function we attach `.then(...)` and `.catch(...)`
function sendRequest(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    // This listener runs every time the XHR state changes.
    request.addEventListener("readystatechange", () => {
      // `readyState === 4` means the request is finished.
      // `status === 200` means the server responded successfully.
      if (request.readyState === 4 && request.status === 200) {
        // The response body comes as text, so we parse JSON text
        // into a normal JavaScript object before resolving.
        resolve({
          status: request.status,
          message: "Request successful",
          data: JSON.parse(request.responseText),
        });
      } else if (request.readyState === 4 && request.status !== 200) {
        // Rejecting moves the Promise into the rejected state,
        // so the matching `.catch(...)` callback will run.
        reject({
          status: request.status,
          message: "Resource not found",
          data: null,
        });
      }
    });

    // Prepare and send the HTTP request.
    request.open("GET", url);
    request.send();
  });
}

// ============================================================
// MULTIPLE REQUESTS
// ============================================================
// These requests are written one after another, but they do NOT
// wait for each other. Every call starts its request immediately.
//
// So this is parallel execution from our code's point of view.
// Because of that, the responses may print in a different order
// than the order in which these lines appear.
sendRequest("https://jsonplaceholder.typicode.com/comments/1")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/2")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/3")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/4")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/5")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/6")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/7")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/8")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/9")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
sendRequest("https://jsonplaceholder.typicode.com/comments/10")
  .then((response) => console.log(response))
  .catch((err) => console.log(err));

// Example of Promise chaining for sequential flow:
// sendRequest("https://jsonplaceholder.typicode.com/comments/1")
//   .then((response) => {
//     console.log(response);
//     return sendRequest("https://jsonplaceholder.typicode.com/comments/2");
//   })
//   .then((response) => {
//     console.log(response);
//     return sendRequest("https://jsonplaceholder.typicode.com/comments/3");
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => console.log(err));
