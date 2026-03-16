// ============================================================
// HTTP REQUEST BASICS
// ============================================================
// When frontend JavaScript needs data from a server/API,
// it sends an HTTP request.
//
// Common HTTP methods:
// GET    -> fetch/read data from server
// POST   -> send new data to server
// PUT    -> fully replace existing data
// PATCH  -> partially update existing data
// DELETE -> remove data
//
// In this file, we are using:
// GET -> because we only want to read users data.

// ============================================================
// WHAT IS XMLHttpRequest?
// ============================================================
// `XMLHttpRequest` (often called XHR) is an older browser API
// used to communicate with servers.
//
// Even though modern JavaScript often uses `fetch()`,
// learning XHR is useful because:
// 1) it helps understand how async requests work internally
// 2) many older codebases still use it
// 3) concepts like request lifecycle, status code, response data
//    are same in modern APIs too
//
// `new XMLHttpRequest()` creates a request object.
// This object stores request state, response data, status code, etc.
var request = new XMLHttpRequest();

// ============================================================
// READY STATE EXPLANATION
// ============================================================
// `readyState` tells us the current stage of the request.
//
// 0 -> UNSENT
//      Request object created, but `open()` not called yet.
//
// 1 -> OPENED
//      `open()` has been called.
//      Request is configured, but not sent yet.
//
// 2 -> HEADERS_RECEIVED
//      `send()` was called and server responded with headers.
//
// 3 -> LOADING
//      Response body is being downloaded.
//      Partial data may be available.
//
// 4 -> DONE
//      Request is complete.
//      This does NOT automatically mean success.
//      It only means the request finished.
//      We must still check `status`.

// ============================================================
// STATUS CODE EXPLANATION
// ============================================================
// `status` tells us how server responded.
//
// 200 -> OK / success
// 201 -> Created
// 404 -> Not Found
// 500 -> Server Error
//
// So:
// readyState === 4  -> request completed
// status === 200    -> request completed successfully

// ============================================================
// EVENTS AND ASYNCHRONOUS BEHAVIOUR
// ============================================================
// HTTP requests are asynchronous in nature.
// That means JavaScript starts the request and continues running
// the rest of the code instead of waiting/blocking immediately.
//
// When request state changes, browser fires the
// `readystatechange` event.
// We "listen" for that event using `addEventListener(...)`.
request.addEventListener("readystatechange", () => {
  // Helpful while learning:
  // Uncomment below line to watch the request move through
  // state 1 -> 2 -> 3 -> 4.
  // console.log("state:", request.readyState, "status:", request.status);

  // We handle success only when:
  // 1) request is fully complete
  // 2) server returned success response
  if (request.readyState === 4 && request.status === 200) {
    // `responseText` is always a string.
    // Most APIs send JSON data, so we convert string -> JavaScript value
    // using `JSON.parse(...)`.
    var data = JSON.parse(request.responseText);

    // `data` is now a real JavaScript array/object that we can use.
    console.log("Request completed successfully");
    console.log("readyState:", request.readyState);
    console.log("users data:", data);
  } else if (request.readyState === 4) {
    // If request finished but status is not 200,
    // we treat it as failure for this example.
    console.error("Failed to fetch data");
    console.error("status code:", request.status);
  }
});

// ============================================================
// OPENING THE REQUEST
// ============================================================
// Syntax:
// request.open(method, url)
//
// This step only prepares/configures the request.
// It does not send it yet.
request.open("GET", "https://jsonplaceholder.typicode.com/users");

// ============================================================
// SENDING THE REQUEST
// ============================================================
// `send()` actually sends the request to the server.
//
// For GET request:
// we usually send no request body, so `send()` is empty.
request.send();

// ============================================================
// IMPORTANT CONCEPT SUMMARY
// ============================================================
// 1) We created an XHR object
// 2) We attached an event listener to track state changes
// 3) We configured the request using `open()`
// 4) We sent the request using `send()`
// 5) When request completed, we checked:
//    - `readyState === 4`
//    - `status === 200`
// 6) Then we converted JSON string into JavaScript using `JSON.parse()`
//
// Real flow:
// create request -> open -> send -> wait asynchronously ->
// response arrives -> event runs -> handle success/error

// Extra learning:
// Uncomment below to inspect raw values after completion.
// console.log(request.status);
// console.log(request.responseText);
// console.log(request.readyState);
