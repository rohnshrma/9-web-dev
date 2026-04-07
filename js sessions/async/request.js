// ============================================================
// HTTP REQUEST BASICS
// ============================================================
// When frontend JavaScript needs data from a server,
// it sends an HTTP request.
//
// Common HTTP methods:
// GET    -> read data
// POST   -> create/send new data
// PUT    -> fully replace existing data
// PATCH  -> partially update existing data
// DELETE -> remove data
//
// In this file, we are using GET because we only want to read data.

// ============================================================
// WHAT IS XMLHttpRequest?
// ============================================================
// `XMLHttpRequest` (XHR) is an older browser API for making requests.
//
// Even though modern JavaScript usually uses `fetch()`,
// learning XHR is still useful because it helps us understand:
// - request lifecycle
// - asynchronous browser behaviour
// - status codes
// - JSON parsing
//
// `new XMLHttpRequest()` creates one request object.
var request = new XMLHttpRequest();

// ============================================================
// READY STATE EXPLANATION
// ============================================================
// `readyState` tells us which stage the request is currently in.
//
// 0 -> UNSENT
//      Request object created, but `open()` not called yet
//
// 1 -> OPENED
//      `open()` has been called
//
// 2 -> HEADERS_RECEIVED
//      Server sent response headers
//
// 3 -> LOADING
//      Response body is downloading
//
// 4 -> DONE
//      Request finished
//
// Important:
// `readyState === 4` means the request is finished.
// It does NOT automatically mean success.
// We must still check the `status` code.

// ============================================================
// STATUS CODE EXPLANATION
// ============================================================
// `status` tells us how server responded.
//
// 200 -> OK
// 201 -> Created
// 404 -> Not Found
// 500 -> Internal Server Error
//
// So for a successful GET request in this example:
// - `readyState === 4`
// - `status === 200`

// ============================================================
// LISTENING FOR REQUEST CHANGES
// ============================================================
// `readystatechange` runs every time request state changes.
// This is one way old JavaScript handled asynchronous requests.
request.addEventListener("readystatechange", () => {
  // Helpful while learning:
  // This shows how the request moves through different states.
  console.log("state:", request.readyState, "| status:", request.status);

  // Success case:
  // request completed and server sent success response.
  if (request.readyState === 4 && request.status === 200) {
    // `responseText` is a string.
    // APIs often return JSON text, so we convert it into a real
    // JavaScript value using `JSON.parse(...)`.
    var comments = JSON.parse(request.responseText);

    console.log("Request completed successfully");
    console.log("Parsed JavaScript data:", comments);
  } else if (request.readyState === 4) {
    // Failure case:
    // request finished, but status was not 200.
    console.error("Failed to fetch comments");
    console.error("Status code:", request.status);
  }
});

// ============================================================
// OPEN THE REQUEST
// ============================================================
// Syntax:
// request.open(method, url)
//
// This only prepares the request.
// It does not send it yet.
request.open("GET", "https://jsonplaceholder.typicode.com/comments");

// ============================================================
// SEND THE REQUEST
// ============================================================
// `send()` actually sends the HTTP request to the server.
//
// For GET requests, we usually do not send a request body.
request.send();

// ============================================================
// FLOW OF THIS PROGRAM
// ============================================================
// 1) Create request object
// 2) Attach event listener
// 3) Configure request with `open(...)`
// 4) Send request with `send()`
// 5) Browser handles request in background
// 6) Event listener runs as state changes
// 7) When request reaches state 4, we check status
// 8) If success, convert JSON string to JavaScript using `JSON.parse(...)`
// 9) If failure, show error message

// ============================================================
// RELATION TO FETCH
// ============================================================
// `fetch()` does the same kind of work at a higher level.
//
// XHR style:
// create object -> listen to events -> check readyState/status
//
// fetch style:
// call `fetch()` -> use `.then()` / `.catch()`
//
// So XHR helps us understand the lower-level mechanics,
// while `fetch()` gives us cleaner modern syntax.
