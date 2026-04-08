// ============================================================
// PROMISE-BASED REQUEST FUNCTION
// ============================================================
// `async/await` works on top of Promises, so this helper still
// returns a Promise exactly like the one in `promise.js`.
function sendRequest(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      // Wait until the request is fully completed.
      if (request.readyState === 4 && request.status === 200) {
        resolve({
          status: request.status,
          message: "Request successful",
          data: JSON.parse(request.responseText),
        });
      } else if (request.readyState === 4 && request.status !== 200) {
        reject({
          status: request.status,
          message: "Resource not found",
          data: null,
        });
      }
    });

    request.open("GET", url);
    request.send();
  });
}

// ============================================================
// ASYNC / AWAIT BASICS
// ============================================================
// `async` makes this function return a Promise automatically.
// Inside an async function, `await` can pause this function until
// another Promise settles.
var handleRequest = async (url) => {
  try {
    // `await` waits for the Promise returned by `sendRequest(url)`.
    // If the Promise is fulfilled, its resolved value is stored in
    // `response`.
    var response = await sendRequest(url);
    console.log(response);
  } catch (err) {
    // If the Promise is rejected, execution jumps to `catch`.
    console.log(err);
  }
};

// ============================================================
// IMPORTANT BEHAVIOUR
// ============================================================
// These function calls are written one after another, but they do
// not wait for each other.
//
// Why? Because we are NOT using `await` before each `handleRequest(...)`
// call here. Each async function starts running immediately.
//
// So even though `await` is used inside `handleRequest`, these requests
// are still started in parallel from the file's point of view.
handleRequest("https://jsonplaceholder.typicode.com/comments/2");
handleRequest("https://jsonplaceholder.typicode.com/comments/3");
handleRequest("https://jsonplaceholder.typicode.com/comments/4");
handleRequest("https://jsonplaceholder.typicode.com/comments/5");
handleRequest("https://jsonplaceholder.typicode.com/comments/6");
handleRequest("https://jsonplaceholder.typicode.com/comments/7");
handleRequest("https://jsonplaceholder.typicode.com/comments/8");
handleRequest("https://jsonplaceholder.typicode.com/comments/9");
handleRequest("https://jsonplaceholder.typicode.com/comments/10");

// Example of truly sequential execution with async/await:
// async function runInOrder() {
//   await handleRequest("https://jsonplaceholder.typicode.com/comments/1");
//   await handleRequest("https://jsonplaceholder.typicode.com/comments/2");
//   await handleRequest("https://jsonplaceholder.typicode.com/comments/3");
// }
//
// runInOrder();

// This loop example would make 100 requests, but because `i` is not used
// inside the URL, it would request comment 1 again and again.
// for (var i = 1; i <= 100; i++) {
//   handleRequest("https://jsonplaceholder.typicode.com/comments/" + 1);
// }
