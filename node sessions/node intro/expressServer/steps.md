# Express Server Setup + Deep Explanation

## Part 1: Steps to Create `server.js` Project

### 1. Create a project folder
```bash
mkdir expressServer
cd expressServer
```

### 2. Create the server file
```bash
touch server.js
```

### 3. Initialize Node project
```bash
npm init -y
```
This creates `package.json`.

### 4. Install Nodemon globally
```bash
npm install -g nodemon
```
Now you can run `nodemon` from anywhere.

### 5. Update `package.json`
Add:
- `"type": "module"` (so we can use `import`)
- `"dev": "nodemon server.js"` inside `scripts`

Example:
```json
{
  "name": "expressserver",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

### 6. Install Express
```bash
npm i express
```

### 7. Add this code inside `server.js`
```js
import express from "express";

const app = express();

//routes

// home route / root route
app.route("/").get((req, res) => {
  res.write("<h1>Welcome to homepage</h1>");
  res.write("<p>my name is john doe</p>");
  res.send();
});
app.route("/about").get((req, res) => {
  res.write("<h1>Welcome to aboutpage</h1>");
  res.write("<p>my name is john doe</p>");
  res.send();
});

app.use((req, res, next) => {
  res.status(404).send(`
    <h1>404 - PAGE NOT FOUND</h1>
    <a href="/">HOMEPAGE</a>`);
  next();
});

// creating a node server
app.listen(3000, () => console.log("Server Started on port :", 3000));
```

### 8. Run the server
```bash
npm run dev
```

### 9. Test in browser
- `http://localhost:3000/`
- `http://localhost:3000/about`
- Any other route (like `/abc`) should show 404 page

---

## Part 2: Deep Explanation of Code + Concepts

### 1. `import express from "express";`
- This imports the Express framework.
- Express is a Node.js web framework used to create servers and APIs quickly.
- Because `"type": "module"` is set in `package.json`, we use ES Modules syntax (`import`) instead of `require`.

### 2. `const app = express();`
- `express()` creates an application object.
- Think of `app` as your server controller.
- You use `app` to define routes, middleware, and server settings.

### 3. Route concept
A route means:
- **Path** (like `/about`)
- **HTTP method** (like GET, POST)
- **Handler function** (`(req, res) => { ... }`)

When request matches path + method, Express runs that handler.

### 4. `app.route("/").get(...)` and `app.route("/about").get(...)`
- `app.route("/path")` creates a route object for a path.
- `.get(...)` attaches a GET handler.
- Same result could also be written as `app.get("/", handler)`.
- `app.route()` becomes more useful when you attach multiple methods for same path:
  - `.get(...)`
  - `.post(...)`
  - `.put(...)`
  - `.delete(...)`

### 5. `req` and `res`
Inside route handler:
- `req` = incoming request object
  - URL, method, headers, params, query, body, etc.
- `res` = response object
  - used to send data/status back to client

### 6. `res.write()` + `res.send()`
In your routes:
- `res.write(...)` writes chunks to response body.
- `res.send()` ends and sends response.

Why both?
- You can build response piece by piece using `write`, then finish with `send`.
- For simple responses, one `res.send("<h1>...</h1>")` is usually cleaner.

### 7. `app.use((req, res, next) => { ... })` as 404 handler
- `app.use` registers middleware.
- Middleware runs in sequence, top to bottom.
- Since this middleware is placed after defined routes, it catches unmatched routes.
- `res.status(404).send(...)` sends HTTP status code 404 with HTML.

Important note:
- After sending response, calling `next()` is usually unnecessary here.
- In many cases, 404 middleware should end the cycle without `next()`.
- Safer version:
```js
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - PAGE NOT FOUND</h1>
    <a href="/">HOMEPAGE</a>
  `);
});
```

### 8. HTTP status code concept
- `200` = success (default for successful GET response)
- `404` = route/resource not found
- Status code tells browser/client what happened at protocol level.

### 9. `app.listen(3000, ...)`
- Starts server and binds to port `3000`.
- Callback runs once server starts.
- Then browser/client can connect to `http://localhost:3000`.

### 10. Request lifecycle in your app
For request `GET /about`:
1. Request enters Express app.
2. Express checks routes in order.
3. `/about` GET matches -> that handler runs.
4. `res.write` writes content.
5. `res.send()` completes response.

For request `GET /random`:
1. No route matches.
2. Execution reaches last `app.use`.
3. Sends 404 page.

### 11. Why order matters in Express
Express checks middleware/routes in the order written.
- Put specific routes first.
- Put catch-all 404 middleware at end.
- Put error-handling middleware after routes/middleware that can throw errors.

### 12. Difference: Node `http` module vs Express
With Node `http` module:
- More manual routing and response handling.
- More boilerplate.

With Express:
- Clean route methods (`app.get`, `app.post`)
- Middleware support
- Faster development and easier scaling

### 13. Next improvements (real-world)
You can improve this project by:
- Using `res.send()` once per route instead of multiple `write`.
- Creating separate route files.
- Adding `express.json()` middleware for POST JSON body.
- Using environment variable for port:
```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
```
