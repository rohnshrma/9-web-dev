// ============================================================
// CALLBACK BASICS
// ============================================================
// A callback is a function passed as an argument to another function.
//
// Why do we use callbacks?
// Because some tasks take time to finish, such as:
// - API requests
// - reading files
// - timers
// - database operations
//
// JavaScript does not want to stop the whole program and wait.
// So instead, we say:
// "When the work is finished, call this function."
//
// That function is called the callback.

// ============================================================
// FUNCTION PURPOSE
// ============================================================
// `sendRequest(url, handler)` is a reusable function.
//
// Parameters:
// `url`     -> API endpoint we want to call
// `handler` -> callback function that will run after request completes
//
// This is useful because instead of writing the full XHR code again
// and again, we create one general function and pass different URLs
// and different callback functions when needed.
function sendRequest(url, handler) {
  // Create a new XHR object for this request.
  var request = new XMLHttpRequest();

  // `readystatechange` runs every time request state changes.
  // We wait until request is fully complete before handling result.
  request.addEventListener("readystatechange", () => {
    // Success case:
    // readyState === 4 -> request is finished
    // status === 200   -> server returned success
    if (request.readyState === 4 && request.status === 200) {
      // `responseText` comes as JSON string.
      // Convert it into real JavaScript array/object.
      var data = JSON.parse(request.responseText);

      // Here we CALL the callback function.
      //
      // Important idea:
      // `handler` is just a variable name storing a function.
      // So `handler(...)` means:
      // "run the callback function and pass these values"
      //
      // We are following error-first callback style:
      // first argument  -> error
      // second argument -> success data
      //
      // On success:
      // error is `null`
      // data contains response info
      handler(null, {
        message: "Request completed successfully",
        readyState: request.readyState,
        data: data,
      });
    } else if (request.readyState === 4) {
      // Failure case:
      // request finished, but status is not 200.
      //
      // In error-first callback pattern:
      // first argument gets error object
      // second argument becomes `null`
      handler(
        {
          message: "Failed to fetch data",
          status: request.status,
        },
        null
      );
    }
  });

  // Prepare request.
  // We are sending a GET request to the provided URL.
  request.open("GET", url);

  // Actually send request to the server.
  request.send();
}

// ============================================================
// NORMAL CALLBACK FUNCTION EXAMPLE
// ============================================================
// This is a named callback function.
// It receives two values:
// `err`  -> contains error object if request fails
// `data` -> contains success result if request succeeds
//
// We do NOT use both at the same time.
// Usually:
// success -> err is null, data has value
// failure -> err has value, data is null
//
// function handleRequest(err, data) {
//   if (!err) console.log(data);
//   else console.log(err);
// }
//
// sendRequest("https://jsonplaceholder.typicode.com/users", handleRequest);

// ============================================================
// INLINE CALLBACK EXAMPLE
// ============================================================
// Instead of creating a separate named function,
// we can directly pass an anonymous arrow function.
//
// This function will run only after the request completes.
sendRequest("https://jsonplaceholder.typicode.com/users", (err, data) => {
  // If there is no error, print success result.
  if (!err) console.log(data);
  // Otherwise print error object.
  else console.log(err);
});

// ============================================================
// FULL FLOW OF THIS PROGRAM
// ============================================================
// 1) `sendRequest(...)` is called
// 2) It creates an XMLHttpRequest object
// 3) It attaches `readystatechange` listener
// 4) It opens and sends the request
// 5) JavaScript continues its work without blocking
// 6) When server responds, event listener runs
// 7) If success, callback is called with:
//    handler(null, successData)
// 8) If failure, callback is called with:
//    handler(errorObject, null)
// 9) The callback decides what to do with result

// ============================================================
// IMPORTANT CONCEPT: WHY CALLBACKS MATTER
// ============================================================
// Without callback, `sendRequest()` would fetch data,
// but outside code would not know when that data is ready.
//
// Callback gives us a way to say:
// "When request finishes, give me the result here."
//
// This is one of the core ideas behind asynchronous JavaScript.
//
// Later, modern JavaScript improves this pattern using:
// - Promises
// - async / await
//
// But callbacks are the foundation, so understanding them is important.
