# To-Do App Flow

## 1. Server Startup Flow
1. Node runs `server.js`.
2. `express()` creates the app object.
3. Middleware is configured:
- `app.set("view engine", "ejs")` enables EJS template rendering.
- `app.use(express.static("public"))` serves static files like CSS.
- `app.use(express.urlencoded({ extended: true }))` parses form body (`req.body`).
4. Routes are registered (`/` and `/delete/:id`).
5. `app.listen(PORT)` starts the HTTP server on port `3000`.

## 2. Home Page Load Flow (`GET /`)
1. Browser requests `/`.
2. Route handler executes:
- creates `date` using `new Date().toLocaleDateString()`.
- passes `tasks` array.
3. `res.render("home", { date, tasks })` renders `views/home.ejs`.
4. HTML response is sent to browser.
5. Browser also requests `/styles.css` from `public/`.

## 3. Add Task Flow (`POST /`)
1. User types in input (`name="task"`) and clicks **Add**.
2. Form sends `POST /` with URL-encoded body.
3. `express.urlencoded()` parses body into `req.body`.
4. Handler reads `req.body.task`.
5. New task is pushed into memory:
- `{ task: req.body.task, id: uuidv4() }`
6. `res.redirect("/")` sends redirect response.
7. Browser follows redirect with `GET /`.
8. Updated list is rendered and shown.

## 4. Delete Task Flow (`GET /delete/:id`)
1. User clicks `X` link (`/delete/<taskId>`).
2. Route captures parameter with `req.params.id`.
3. `tasks = tasks.filter((task) => task.id !== deleteID)` removes matching item.
4. `res.redirect("/")` sends browser back to home page.
5. Browser requests `GET /` again and sees updated list.

## 5. Data Lifetime Flow
- `tasks` is an in-memory array (not database).
- Data is lost when server restarts.
- UUID prevents id collisions and makes delete links safe/unique.

## 6. Template Rendering Flow in `home.ejs`
1. `<%= date %>` outputs current date from server.
2. Condition checks `tasks.length > 0`.
3. If tasks exist, loop renders each `<li>`.
4. `<%= task.task %>` prints task text.
5. `/delete/<%= task.id %>` creates task-specific delete URL.
6. Else branch renders `No Items Found`.
