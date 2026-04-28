# Deep Explanation: Current Completed Code

This project is a server-rendered To-Do app using:
- **Express** for routing and HTTP handling
- **EJS** for dynamic HTML templates
- **UUID** for unique task IDs
- **method-override** so HTML forms can trigger `PUT` and `DELETE`

It supports full CRUD-like behavior for in-memory tasks:
- Create task (`POST /`)
- Update task (`PUT /update/:id`)
- Delete task (`DELETE /delete/:id`)

## 1. Imports and App Setup

```js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;
let tasks = [];
```

What each part does:
- `express`: creates web server and route handlers.
- `uuidv4()`: creates unique IDs for each task.
- `methodOverride("_method")`: allows form requests like `POST ...?_method=PUT` to be treated as `PUT`.
- `tasks`: temporary in-memory store for task objects.

Task shape:
```js
{ task: "Buy milk", id: "uuid-value" }
```

## 2. Middleware and Configuration

```js
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
```

Details:
- `view engine = ejs`: enables `res.render("home", data)`.
- `methodOverride("_method")`: reads `_method` from query string and rewrites HTTP method.
- `express.static("public")`: exposes `public/styles.css` at `/styles.css`.
- `express.urlencoded(...)`: parses form payload so `req.body.task` exists.

## 3. Home Route + Add Route (`/`)

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
    tasks.push({ task: req.body.task, id: uuidv4() });
    res.redirect("/");
  });
```

### `GET /`
- Renders `views/home.ejs`.
- Injects current date and latest `tasks` array.

### `POST /`
- Reads user input from `req.body.task`.
- Adds new task with unique ID.
- Redirects to home (PRG pattern: Post -> Redirect -> Get).

## 4. Delete Route (`DELETE /delete/:id`)

```js
app.route("/delete/:id").delete((req, res) => {
  const deleteID = req.params.id;
  tasks = tasks.filter((task) => task.id !== deleteID);
  res.redirect("/");
});
```

How it works:
- `:id` is a route parameter.
- Removes only the task whose ID matches.
- Redirects to reload updated list.

From the template, delete is submitted as:
- `POST /delete/<id>?_method=DELETE`
- method-override converts this to actual `DELETE` route handling.

## 5. Update Route (`PUT /update/:id`)

```js
app.route("/update/:id").put((req, res) => {
  const id = req.params.id;
  const updatedTask = req.body.task;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, task: updatedTask } : task
  );

  res.redirect("/");
});
```

How it works:
- Reads target ID from URL.
- Reads edited text from form input.
- Uses `map` to replace only matching task object.
- Redirects to show updated list.

From template, update is submitted as:
- `POST /update/<id>?_method=PUT`
- method-override converts to `PUT`.

## 6. View Layer (`views/home.ejs`)

Current template behavior:
- Shows heading with server-generated date.
- Add form posts to `/`.
- For each task:
- Inline form to edit and submit update.
- Separate form to delete.
- Shows `No Items Found` when list is empty.

EJS syntax used:
- `<%= ... %>` prints escaped output.
- `<% ... %>` runs JS logic (if/forEach).

## 7. Styling Layer (`public/styles.css`)

The updated CSS now provides:
- Theme variables in `:root`.
- Layered gradient background on `body`.
- Glass-style card (`.todo-card`) with border, shadow, blur.
- Clear visual hierarchy for Add / Update / Delete buttons.
- Styled task rows via `.task` and nested form selectors.
- Empty-state styling for `No Items Found`.
- Responsive layout via media query for small screens (`max-width: 560px`).

Important: all styling updates were done **without changing HTML structure**.

## 8. Why This Architecture Works Well

Strengths:
- Simple and readable Express routing.
- Method override enables REST-like semantics with plain forms.
- EJS keeps rendering server-side and beginner-friendly.
- UUID ensures reliable task targeting even with duplicate text.

Current limitation:
- Data is stored in memory only (`tasks` array).
- Restarting server clears tasks.

## 9. Exact Current Server Code (Reference)

```js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
const app = express();
const PORT = 3000;
let tasks = [];

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
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
    res.redirect("/"); // makes a get request to the home route
  });

app.route("/delete/:id").delete((req, res) => {
  const deleteID = req.params.id;
  tasks = tasks.filter((task) => task.id !== deleteID);
  res.redirect("/"); // makes a get request to the home route (refresh)
});

app.route("/update/:id").put((req, res) => {
  const id = req.params.id;
  const updatedTask = req.body.task;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, task: updatedTask } : task
  );
  console.log(tasks);

  res.redirect("/");
});

app.listen(PORT, () => console.log("Server started on port : 3000"));
```
