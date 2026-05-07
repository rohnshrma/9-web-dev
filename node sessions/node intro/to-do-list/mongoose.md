# Mongoose + MongoDB Guide (Beginner Friendly)

This file explains only the **database-related** part of your To-Do app.

Your app uses:
- **MongoDB**: the actual database that stores data on disk.
- **Mongoose**: a Node.js library (ODM) that helps us talk to MongoDB using JavaScript objects and models.

---

## 1. Big Picture: What happens in this project?

When your server starts:
1. `server.js` runs.
2. It calls `connectDB()` from `config/db.js`.
3. Mongoose connects to MongoDB at `mongodb://localhost:27017/9-tdl-db`.
4. Routes use the `Task` model from `model/task.js` to create/read/update/delete tasks.

So the app flow is:
- Browser form sends data -> Express route receives it -> Mongoose model runs DB query -> MongoDB stores/returns data.

---

## 2. MongoDB basics (in simple words)

Think of MongoDB like this:
- **Database** = one project container (`9-tdl-db`)
- **Collection** = one table-like group (`tasks`, auto-created from model name)
- **Document** = one row-like record (one task)

Example task document:

```json
{
  "_id": "681b5f....",
  "name": "Buy milk"
}
```

Important:
- MongoDB automatically gives each document an `_id`.
- In your app, this `_id` is used in URLs like `/update/:id` and `/delete/:id`.

---

## 3. Why Mongoose (instead of raw MongoDB driver)?

You could use MongoDB directly, but Mongoose gives beginner-friendly features:
- Schema (define structure and rules)
- Validation (required, minlength, trim, etc.)
- Model methods (`find`, `create`, `findById`, etc.)
- Cleaner app code with JavaScript objects

Mongoose acts like a smart layer between Express and MongoDB.

---

## 4. Database connection code (`config/db.js`)

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/9-tdl-db");
    console.log("DB CONNECTED =>", conn.connection.host);
  } catch (err) {
    console.log("Failed to connect to DB");
    process.exit(1);
  }
};

export default connectDB;
```

Deep explanation:
- `mongoose.connect(...)` opens connection to local MongoDB server.
- URL parts:
- `mongodb://` -> protocol
- `localhost:27017` -> MongoDB host and default port
- `9-tdl-db` -> database name
- `await` waits until connection succeeds/fails.
- If connection fails, `process.exit(1)` stops the Node app so it does not run in broken state.

Why this is good:
- You fail fast if DB is unavailable.
- You avoid handling requests when no DB connection exists.

---

## 5. Schema and Model (`model/task.js`)

```js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unqiue: true,
    trim: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
```

### 5.1 What is a Schema?
Schema is a blueprint for each task document.

In your schema, each task has:
- `name`: String

Rules:
- `required: true` -> cannot be empty/missing
- `minlength: 3` -> at least 3 characters
- `trim: true` -> removes extra spaces at start/end

### 5.2 What is a Model?
`Task` model is the object you actually use in routes.

Model = schema + collection binding.

When you run:

```js
Task.find({})
```

Mongoose queries the MongoDB collection for Task documents.

### 5.3 Important typo in current code
You wrote:

```js
unqiue: true
```

Correct key is:

```js
unique: true
```

Because of typo, uniqueness is **not currently enforced** by Mongoose index option.

---

## 6. Where DB code is used in routes (`server.js`)

Your routes use async/await with try-catch, which is the correct beginner pattern.

### 6.1 Read all tasks (GET `/`)

```js
const tasks = await Task.find({});
```

- `find({})` means "give me all documents".
- Data returned is passed to EJS template.

### 6.2 Create task (POST `/`)

```js
const newTask = await Task.create({ name: task });
```

- Creates and saves new document in one step.
- Validation runs before save.

### 6.3 Delete task (DELETE `/delete/:id`)

```js
const task = await Task.findById(deleteID);
await Task.findByIdAndDelete(deleteID);
```

- First check if task exists.
- Then delete by `_id`.

### 6.4 Update task (PUT `/update/:id`)

```js
const task = await Task.findById(id);
task.name = updatedTask;
await task.save();
```

- Load one document.
- Change field in JS object.
- `save()` writes change to MongoDB.

---

## 7. Async/Await and Try-Catch (very important)

Database actions are asynchronous (they take time).

That is why you use:
- `async` on route handlers
- `await` before each DB call
- `try/catch` for error handling

Pattern:

```js
try {
  // await DB call
} catch (err) {
  // log error and return safe response
}
```

Without this, app can crash or behave unpredictably on DB errors.

---

## 8. Validation behavior beginners should know

From your schema:
- Empty name -> validation error
- Name with length < 3 -> validation error
- Name with extra spaces -> trimmed

When validation fails in `create()` or `save()`:
- Mongoose throws an error.
- Your `catch` block runs.
- In current app, user is redirected to `/`.

Good next improvement:
- show validation message on UI instead of only logging.

---

## 9. `_id` vs custom id

Earlier you used UUID in memory.
Now MongoDB gives `_id` automatically.

Why `_id` is enough:
- Always unique
- Indexed by default
- Perfect for update/delete lookups

In template, you correctly use:

```ejs
task._id
```

---

## 10. Common beginner confusion cleared

1. "Do I need to create collection manually?"
- No. Mongoose creates it when first document is inserted.

2. "Why model name is `Task` but collection is different?"
- Mongoose pluralizes model name. `Task` usually maps to `tasks`.

3. "Why app exits if DB fails?"
- Better to stop than run a broken server.

4. "Can I use `findByIdAndUpdate` directly?"
- Yes. Current code uses `findById + save`, which is also valid and clear for learning.

---

## 11. End-to-end DB lifecycle in your app

1. App starts.
2. `connectDB()` opens MongoDB connection.
3. User submits task form.
4. Route calls `Task.create`.
5. MongoDB stores document.
6. User opens home page.
7. Route calls `Task.find({})`.
8. Tasks render in EJS.
9. User updates/deletes using `_id`.
10. Route calls save/delete model methods.

That is the full Mongoose + DB journey in your current project.

---

## 12. Suggested next improvements (DB side)

1. Fix schema typo `unqiue` -> `unique`.
2. Add custom error messages for validation.
3. Move MongoDB URL to `.env` (instead of hardcoding).
4. Add timestamps in schema:

```js
new mongoose.Schema({...}, { timestamps: true })
```

5. Add basic indexing strategy once data grows.
