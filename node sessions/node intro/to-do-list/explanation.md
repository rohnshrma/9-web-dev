# Deep Explanation: Current Completed Code

This app is now a database-backed To-Do app using:
- **Express** for server and routing
- **EJS** for server-side rendering
- **Mongoose + MongoDB** for persistent task storage
- **method-override** to support `PUT` and `DELETE` from HTML forms

## 1. Imports and Setup (`server.js`)

```js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
import connectDB from "./config/db.js";
import Task from "./model/task.js";
```

- `connectDB()` initializes the MongoDB connection.
- `Task` is the Mongoose model used in all CRUD routes.
- `uuidv4` is currently imported but not used by route logic.

App bootstrap:
- `const app = express()`
- `const PORT = 3000`
- `connectDB()`

## 2. Middleware and Config

```js
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
```

- EJS is enabled for `res.render("home", data)`.
- `methodOverride("_method")` lets forms simulate `PUT/DELETE`.
- `express.static("public")` serves CSS and static files.
- `express.urlencoded(...)` makes form fields available in `req.body`.

## 3. Home + Add Routes (`/`)

### `GET /`
- Uses `await Task.find({})` to fetch all tasks from MongoDB.
- Renders `home.ejs` with:
- `date: new Date().toLocaleDateString()`
- `tasks: tasks`
- On error, logs and redirects to `/`.

### `POST /`
- Reads task text from `req.body.task`.
- Creates document: `await Task.create({ name: task })`.
- Redirects to `/` after create.
- On error (DB/validation), logs and redirects.

## 4. Delete Route (`DELETE /delete/:id`)

- Receives task id from `req.params.id`.
- Checks task existence with `Task.findById(deleteID)`.
- If not found: logs and redirects.
- If found: deletes using `Task.findByIdAndDelete(deleteID)`.
- Redirects to `/` so UI reloads with updated data.

## 5. Update Route (`PUT /update/:id`)

- Reads id from `req.params.id`.
- Reads updated text from `req.body.task`.
- Fetches task with `Task.findById(id)`.
- If found:
- updates `task.name = updatedTask`
- saves via `await task.save()`
- Redirects to `/` after save.

## 6. Task Schema (`model/task.js`)

```js
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unqiue: true,
    trim: true,
  },
});
```

- Field used by app: `name`.
- Task ids are MongoDB-generated (`_id`), not UUID-based.
- Note: schema key is written as `unqiue` in current code; Mongoose expects `unique`.

## 7. View Layer (`views/home.ejs`)

- Header displays current date.
- Add form posts to `/`.
- Each task row contains:
- update form: `/update/<%= task._id %>?_method=PUT`
- delete form: `/delete/<%= task._id %>?_method=DELETE`
- Empty state shown when `tasks.length === 0`.

## 8. Data Behavior (Current vs Old)

- Old approach: in-memory `tasks` array (lost on restart).
- Current approach: MongoDB persistence (data survives server restart).
- CRUD operations are async and wrapped in `try/catch` for safer error handling.
