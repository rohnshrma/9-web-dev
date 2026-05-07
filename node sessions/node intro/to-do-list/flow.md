# To-Do App Flow (Current Code)

## 1. Server Startup Flow
1. Node runs `server.js`.
2. `express()` creates the app instance.
3. `connectDB()` is called to connect Mongoose to MongoDB.
4. Middleware and config are applied:
- `app.set("view engine", "ejs")`
- `app.use(methodOverride("_method"))`
- `app.use(express.static("public"))`
- `app.use(express.urlencoded({ extended: true }))`
5. Routes are registered: `/`, `/update/:id`, `/delete/:id`.
6. `app.listen(PORT)` starts the server on port `3000`.

## 2. Home Page Load Flow (`GET /`)
1. Browser sends `GET /`.
2. Server fetches all tasks from MongoDB using `await Task.find({})`.
3. Server renders `home.ejs` with:
- `date: new Date().toLocaleDateString()`
- `tasks: tasks`
4. Browser receives HTML and requests static assets (like `/styles.css`).
5. If DB read fails, server logs error and redirects to `/`.

## 3. Add Task Flow (`POST /`)
1. User submits add form with input `name="task"`.
2. Request hits `POST /`.
3. Server reads `req.body.task`.
4. Server creates a MongoDB document: `await Task.create({ name: task })`.
5. On success, server redirects to `/` (PRG pattern).
6. On failure (validation/DB error), server logs and redirects to `/`.

## 4. Update Task Flow (`PUT /update/:id`)
1. User edits a task and submits form to `/update/<id>?_method=PUT`.
2. `method-override` turns the request into `PUT /update/:id`.
3. Server loads task using `await Task.findById(id)`.
4. If task is not found, logs `Task Not Found` and redirects.
5. If found, server updates `task.name = req.body.task` and saves with `await task.save()`.
6. Server redirects to `/` so updated data is shown.

## 5. Delete Task Flow (`DELETE /delete/:id`)
1. User clicks delete button in task row.
2. Form posts to `/delete/<id>?_method=DELETE`.
3. `method-override` converts to `DELETE /delete/:id`.
4. Server checks existence via `await Task.findById(deleteID)`.
5. If found, server deletes using `await Task.findByIdAndDelete(deleteID)`.
6. Server redirects to `/`; if not found/error, logs and redirects.

## 6. Data Model Flow (`model/task.js`)
- Task schema field: `name` (String).
- Validation rules in schema:
- `required: true`
- `minlength: 3`
- `trim: true`
- Model exported as `Task`.
- MongoDB `_id` is used in URLs for update/delete.

## 7. Template Rendering Flow (`views/home.ejs`)
1. `<%= date %>` prints the current date.
2. Add form posts to `/`.
3. For each task in `tasks`, template renders:
- update form bound to `task._id`
- delete form bound to `task._id`
4. If there are no tasks, template shows `No Items Found`.
