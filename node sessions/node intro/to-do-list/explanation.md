# Deep Explanation: Code + Concepts

This project is a server-rendered To-Do app using:
- **Express** for backend routing and request handling
- **EJS** for dynamic HTML templates
- **UUID** for unique task IDs

Below is your code explained in depth.

## 1. Imports and App Setup

```js
import express from "express";
import { v4 as uuidv4 } from "uuid";
```

### What this means
- `express` is a web framework for Node.js.
- `uuidv4()` generates random unique IDs like `a1b2c3...`.

Why UUID is used here:
- If two tasks have same text (e.g., "Buy milk"), text is not reliable as unique key.
- UUID gives each task a stable unique identity for delete actions.

---

```js
const app = express();
const PORT = 3000;
let tasks = [];
```

### What this means
- `app` is your Express application.
- `PORT` is where server listens.
- `tasks` stores to-do items in memory.

Important concept:
- `tasks` is **temporary runtime state**.
- Restarting server clears all tasks (because no database/file persistence).

## 2. Express Configuration (Middleware + View Engine)

```js
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
```

### `app.set("view engine", "ejs")`
- Tells Express: when you call `res.render("home")`, use EJS template engine.
- Express looks for `views/home.ejs` by default.

### `express.static("public")`
- Makes files inside `public/` directly accessible.
- Example: `public/styles.css` is available at `/styles.css`.

### `express.urlencoded({ extended: true })`
- Parses HTML form body (`application/x-www-form-urlencoded`).
- Converts submitted form fields into `req.body` object.

Without this middleware:
- `req.body.task` would be `undefined` for form submissions.

## 3. Route Chaining with `app.route("/")`

```js
app
  .route("/")
  .get((req, res) => {
    res.render("home", {
      date: new Date().toLocaleDateString(),
      tasks: tasks,
    });
  })
  .post((req, res) => {
    console.log("Body =>", req.body.task);
    tasks.push({ task: req.body.task, id: uuidv4() });
    console.log(tasks);
    res.redirect("/");
  });
```

### What `app.route("/")` does
- Groups multiple HTTP methods for same path.
- Here:
- `GET /` renders page
- `POST /` receives form submission

### `res.render("home", {...})` concept
- `render` means: execute template engine (EJS) + inject data + return HTML.
- `date` and `tasks` become variables inside `home.ejs`.

### `POST /` logic explained
1. Read submitted text: `req.body.task`
2. Push new object into array with unique ID.
3. `res.redirect("/")`

### `res.redirect("/")` concept
- Sends HTTP redirect response to client (typically status 302).
- Browser then makes a **new GET request** to `/`.

Why redirect after POST:
- Prevents accidental form re-submission on page refresh.
- Follows PRG pattern (Post-Redirect-Get).

## 4. Delete Route and URL Parameters

```js
app.route("/delete/:id").get((req, res) => {
  const deleteID = req.params.id;
  tasks = tasks.filter((task) => task.id !== deleteID);
  res.redirect("/");
});
```

### `:id` parameter
- Dynamic part of URL.
- If URL is `/delete/123`, then `req.params.id === "123"`.

### Deletion logic
- `filter` creates new array containing all tasks except selected one.
- Reassigning `tasks` updates in-memory list.

Then again:
- Redirect to `/` so updated UI is rendered.

## 5. EJS Template Deep Dive (`views/home.ejs`)

### Output syntax
```ejs
<%= date %>
```
- `<%=` prints escaped value into HTML.
- Safe for normal text output.

### Logic syntax
```ejs
<% if(tasks.length > 0){ tasks.forEach(task => { %>
  ...
<% }) } else { %>
  ...
<% } %>
```
- `<% ... %>` runs JS logic but does not print directly.
- Used for conditionals and loops.

### Task text output
```ejs
<span><%= task.task %></span>
```
- Prints each task's text.

### Delete link generation
```ejs
<a href="/delete/<%= task.id %>">X</a>
```
- Builds task-specific URL using UUID.
- Clicking it triggers delete route.

## 6. Form Mechanics

```html
<form class="input-row" method="post" action="/">
  <input name="task" />
  <button type="submit">Add</button>
</form>
```

How this connects to server:
- `method="post"` + `action="/"` => request goes to `POST /` route.
- `name="task"` becomes `req.body.task` after parsing middleware.

## 7. Commented Version of Core Server Logic

```js
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;
let tasks = []; // In-memory data store for current server session

app.set("view engine", "ejs"); // Use EJS for res.render()
app.use(express.static("public")); // Serve public assets like CSS
app.use(express.urlencoded({ extended: true })); // Parse HTML form body into req.body

app
  .route("/")
  .get((req, res) => {
    // Render home.ejs and inject runtime values
    res.render("home", {
      date: new Date().toLocaleDateString(),
      tasks: tasks,
    });
  })
  .post((req, res) => {
    // Read form input and create a uniquely-identifiable task object
    tasks.push({ task: req.body.task, id: uuidv4() });

    // Redirect to avoid resubmission and show latest state
    res.redirect("/");
  });

app.route("/delete/:id").get((req, res) => {
  const deleteID = req.params.id; // Read dynamic URL parameter

  // Keep all tasks except the one user clicked
  tasks = tasks.filter((task) => task.id !== deleteID);

  // Return to home page and re-render updated task list
  res.redirect("/");
});

app.listen(PORT, () => console.log("Server started on port : 3000"));
```

## 8. Key Concepts Summary
- **Express**: Handles HTTP requests/routes and response methods.
- **EJS**: Generates dynamic HTML on server before sending to browser.
- **UUID**: Creates unique IDs for each task for reliable delete operations.
- **render**: Template + data -> final HTML response.
- **redirect**: Tell client to make a new request (commonly after POST).
- **req.body**: Form payload object (enabled by `express.urlencoded`).
- **req.params**: Dynamic path values like `/delete/:id`.
- **In-memory state**: Fast but not persistent after restart.

## 9. If You Want to Improve Next
1. Add validation to prevent empty tasks.
2. Change delete route to `POST`/`DELETE` (safer than GET for data changes).
3. Save tasks in a DB or JSON file for persistence.
4. Add edit/complete status.
