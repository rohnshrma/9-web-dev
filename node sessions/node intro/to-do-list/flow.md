# To-Do App Flow

## 1. Server Startup Flow
1. Node runs `server.js`.
2. `express()` creates the app instance.
3. Core middleware and config are applied:
- `app.set("view engine", "ejs")` enables EJS template rendering.
- `app.use(methodOverride("_method"))` lets HTML forms simulate `PUT` and `DELETE`.
- `app.use(express.static("public"))` serves CSS/assets from `public/`.
- `app.use(express.urlencoded({ extended: true }))` parses form data into `req.body`.
4. Routes are registered: `/`, `/update/:id`, `/delete/:id`.
5. `app.listen(PORT)` starts the server on port `3000`.

## 2. Home Page Load Flow (`GET /`)
1. Browser sends `GET /`.
2. Handler renders `home.ejs` with:
- `date: new Date().toLocaleDateString()`
- `tasks: tasks`
3. Browser receives HTML and requests `/styles.css`.
4. CSS from `public/styles.css` styles the UI (card layout, task rows, responsive forms).

## 3. Add Task Flow (`POST /`)
1. User enters text in input `name="task"` and submits Add.
2. Form sends `POST /`.
3. `express.urlencoded()` makes input available at `req.body.task`.
4. Server creates and stores a new task object:
- `{ task: req.body.task, id: uuidv4() }`
5. Server redirects with `res.redirect("/")`.
6. Browser loads updated task list with `GET /`.

## 4. Update Task Flow (`PUT /update/:id` via method-override)
1. User edits a task in its inline update form.
2. Form posts to `/update/<taskId>?_method=PUT`.
3. `method-override` converts request to `PUT /update/:id`.
4. Handler reads:
- `id` from `req.params.id`
- updated text from `req.body.task`
5. Server updates matching task using `map`:
- matching task gets new `task` value
- others remain unchanged
6. Server redirects to `/` and refreshed list appears.

## 5. Delete Task Flow (`DELETE /delete/:id` via method-override)
1. User clicks the task’s Delete button.
2. Form posts to `/delete/<taskId>?_method=DELETE`.
3. `method-override` converts request to `DELETE /delete/:id`.
4. Handler removes the matching task using `filter`.
5. Server redirects to `/`.
6. Browser reloads and task is gone.

## 6. Data Lifetime Flow
- `tasks` is an in-memory array (`let tasks = []`).
- Data persists only while server process is running.
- Restarting server clears all tasks.
- UUID IDs avoid collisions and allow precise update/delete.

## 7. Template Rendering Flow (`views/home.ejs`)
1. `<%= date %>` prints current date from server.
2. Top form sends add requests (`POST /`).
3. If tasks exist, each `<li class="task">` renders:
- update form (`?_method=PUT`)
- delete form (`?_method=DELETE`)
4. If no tasks exist, template shows `No Items Found`.

## 8. Styling Flow (`public/styles.css`)
1. CSS variables define theme colors and spacing.
2. `body` uses layered gradients and centered layout.
3. `.todo-card` provides glass-like card styling.
4. `.task` and form selectors style update/delete controls without changing HTML.
5. Media query (`max-width: 560px`) stacks controls for mobile readability.
