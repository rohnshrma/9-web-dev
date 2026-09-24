# Assignment: Build an Inventory Management App (Full MERN, Redux Toolkit Focused)

## 1. What is this assignment about?

Imagine you run a small shop. You have shelves full of stuff: pens, notebooks, bags, whatever. You need one place to keep track of what you have, how many of each thing is left, and what it costs. Right now you probably do this in a notebook or in your head.

Your job is to build a complete website for this, with a front part (what people see) and a back part (where the data is saved for real). You will be able to add items, see them in a list, change them, delete them, and quickly spot which ones are running out. When you refresh the page or restart your computer, **the data is still there**, because it is saved in a database.

You will use the **MERN stack**:

| Letter | Tool | What it does in plain words |
|---|---|---|
| **M** | MongoDB | The database. The place where your items are stored permanently. |
| **E** | Express | The helper that receives requests from the website and talks to the database. |
| **R** | React | Builds the screens you see and click. |
| **N** | Node.js | Lets you run JavaScript on your computer as a server. |

Plus:

- **Vite**: the tool that creates and runs your React project quickly.
- **Redux Toolkit + React-Redux**: keeps all your item data in one central place in the front end. **This is the main focus of the assignment.**

---

## 2. Why are we using Redux here?

In a normal React app, data lives inside a component, and if another component far away needs it, you keep passing it down through props. That gets messy fast.

Redux fixes this by giving you **one big box (called the store)** that holds all your data. Any component can:

- **Read** from the box.
- **Ask the box to change** something (by sending an "action").

Think of it like a school office. Students (components) don't change the records themselves. They fill in a request form (action), and the office (reducer) updates the records. Everyone then sees the same updated records.

In this project, the flow for anything you do will be:

1. You click a button on the screen.
2. Your component sends (dispatches) a Redux action.
3. That action calls your backend using `fetch` or `axios`.
4. The backend saves or reads from MongoDB and replies.
5. Redux updates the store with the reply.
6. The screen updates automatically.

### Important rule about the "API part"

You must **NOT** use RTK Query (`createApi`, `fetchBaseQuery`, or any auto-generated hooks like `useGetItemsQuery`). We want you to learn the core pieces by hand:

- `configureStore`
- `createSlice`
- `createAsyncThunk` (this is how you talk to the backend)
- `extraReducers` (this is how the slice reacts to the thunk's loading / success / failure)
- `useSelector` and `useDispatch`

Also allowed and encouraged: `createSelector` for the calculated numbers.

---

## 3. Project layout

Make **one folder** with two parts inside it:

```
inventory-mern/
  server/        <- the back end (Node + Express + MongoDB)
  client/        <- the front end (React + Vite + Redux Toolkit)
  README.md
```

---

## 4. Setting up the project

### 4.1 Before you start, make sure you have

- Node.js installed (check with `node -v`).
- MongoDB available. Either:
  - MongoDB installed on your computer, **or**
  - a free cluster on MongoDB Atlas (the online version) and its connection string.
- Git and a GitHub account.

### 4.2 Back end setup

1. Inside `inventory-mern`, create the `server` folder and go into it.
2. Start a project: `npm init -y`
3. Install what you need:
   ```
   npm install express mongoose cors dotenv
   npm install --save-dev nodemon
   ```
4. Add a script in `package.json` so you can run it easily: `"dev": "nodemon server.js"`
5. Create a `.env` file for secrets (see section 6.1).

### 4.3 Front end setup

1. Inside `inventory-mern`, create the React project:
   ```
   npm create vite@latest client -- --template react
   ```
2. Go inside and install:
   ```
   cd client
   npm install
   npm install @reduxjs/toolkit react-redux axios
   ```
3. Run it with `npm run dev`. Clear out the default Vite demo content so you start with a clean page.

---

## 5. What your app must do (the requirements)

### 5.1 Each item has these details

| Detail | What it means | Example |
|---|---|---|
| **_id** | A unique code MongoDB gives automatically. You don't type this. | "65f1c..." |
| **name** | What the item is called | "Blue Pen" |
| **category** | What group it belongs to | "Stationery" |
| **quantity** | How many you have right now | 25 |
| **price** | Cost of one piece | 10 |
| **lowStockLimit** | If quantity goes at or below this number, the item counts as "low stock" | 5 |
| **createdAt / updatedAt** | Dates MongoDB can add for you automatically | (auto) |

### 5.2 Things a user can do

**A. Add an item**
- A form with boxes for name, category, quantity, price and low stock limit, and an "Add Item" button.
- When clicked, the item is saved in the database and appears in the list.
- The form clears after adding.

**B. See all items**
- When the page opens, items are loaded from the database.
- Show them in a table (or cards, your choice).
- Each row shows name, category, quantity, price, and total value of that item (quantity × price).

**C. Edit an item**
- Each item has an "Edit" button.
- Clicking it fills the form with that item's details. The button changes to "Update Item".
- After updating, the change is saved in the database and shown in the list.

**D. Delete an item**
- Each item has a "Delete" button.
- Clicking it removes it from the database and from the list.

**E. Increase / decrease stock quickly**
- Each item has a **+** and a **−** button next to its quantity.
- **+** adds 1, **−** removes 1, and the change is saved in the database.
- Quantity must **never go below 0** (both on screen and on the server).

**F. Low stock warning**
- If quantity is **less than or equal to** the low stock limit, highlight the row and show a "Low Stock" label.
- If quantity is 0, show "Out of Stock".

**G. Search**
- A search box above the list. As the user types, only items whose name matches (ignoring capital or small letters) are shown.
- Do the search **on the front end** using the items already in Redux. (Doing it on the server is a bonus.)

**H. Filter by category**
- A dropdown listing all the categories that exist, plus "All".
- Search and category filter must work **together**.

**I. Summary at the top**
Show these four numbers:
- Total number of different items
- Total quantity of everything in stock
- Total inventory value (add up quantity × price for each item)
- Number of items that are low on stock

They must update automatically when anything changes.

**J. Loading and error messages**
- While data is being fetched or saved, show "Loading...".
- If the server fails (for example it's switched off), show a clear error message on the page, not just in the console.
- Disable the submit button while a save is in progress so nobody double-clicks.

---

## 6. Back end requirements (Node + Express + MongoDB)

### 6.1 The `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

Never upload `.env` to GitHub. Add it to `.gitignore`. Instead, upload a `.env.example` with fake values so others know what to fill in.

### 6.2 The Item model (Mongoose)

Create a model with the fields in section 5.1. Add rules in the schema:

- `name`: text, required, trimmed.
- `category`: text, required, trimmed.
- `quantity`: number, required, minimum 0.
- `price`: number, required, minimum 0 (and must be more than 0 in your check).
- `lowStockLimit`: number, required, minimum 0, default 5.
- Turn on `timestamps`.

### 6.3 The routes (endpoints)

| What it does | Method | URL | What comes back |
|---|---|---|---|
| Get all items | GET | `/api/items` | List of items |
| Get one item | GET | `/api/items/:id` | That one item |
| Add an item | POST | `/api/items` | The newly created item |
| Update an item | PUT | `/api/items/:id` | The updated item |
| Change quantity by +1 / −1 | PATCH | `/api/items/:id/quantity` | The updated item |
| Delete an item | DELETE | `/api/items/:id` | The id of the deleted item |

For the quantity route, the front end sends something like `{ "change": 1 }` or `{ "change": -1 }`. The server must refuse to let quantity go below 0.

### 6.4 Good behavior from the server

- Use the right status codes: 200 for OK, 201 for created, 400 for bad data, 404 for not found, 500 for server problems.
- Always reply with JSON, including errors, like `{ "message": "Item not found" }`.
- If the id is not a valid MongoDB id, reply with 400 and a clear message.
- Do **validation on the server too**, not just in the form. Never trust what comes from the browser.
- Turn on `cors` so your React app (on port 5173) is allowed to talk to your server (on port 5000).
- Keep code organized: separate files for routes, controllers, and the model.
- Connect to the database first, and only then start listening for requests. Print a clear message if the connection fails.

### 6.5 Suggested server structure

```
server/
  config/
    db.js
  models/
    Item.js
  controllers/
    itemController.js
  routes/
    itemRoutes.js
  middleware/
    errorHandler.js
  server.js
  .env
  .env.example
```

---

## 7. Front end requirements (React + Redux Toolkit)  -  the main focus

### 7.1 Rules you must follow

1. **Create a store** using `configureStore`.
2. **Create one slice** for inventory using `createSlice`, named something like `inventorySlice`.
3. **Use `createAsyncThunk`** for every call to the server. You need one thunk for each of these:
   - `fetchItems`
   - `addItem`
   - `updateItem`
   - `changeQuantity`
   - `deleteItem`
4. Handle each thunk's three stages (`pending`, `fulfilled`, `rejected`) in the slice's `extraReducers`.
5. The slice state should look roughly like this:
   ```js
   {
     items: [],
     status: "idle",   // "idle" | "loading" | "succeeded" | "failed"
     error: null,
     editingItem: null // the item currently being edited, or null
   }
   ```
6. Regular (non-server) changes like "start editing this item" or "stop editing" go in normal `reducers` in the slice.
7. Wrap the whole app in `<Provider store={store}>` in `main.jsx`.
8. In components, use `useSelector` to **read** and `useDispatch` to **send actions**.
9. **Do not** keep the items list in `useState`. It lives in Redux only. (`useState` is fine for small things like the text in the search box or form boxes.)
10. Use `createSelector` to work out the summary numbers, the low stock count, the category list and the filtered list from the items in the store. **Do not store these calculated values separately.**
11. Keep all server calls (the `axios` code) in the thunks or in one small `api` helper file. Components must not call `axios` directly.
12. **No RTK Query.** (See section 2.)

### 7.2 A note on the thunk error handling

When the server replies with an error, use `rejectWithValue` so the message the server sent (like "Item not found") reaches your slice and can be displayed on screen. Don't just show a generic "Something went wrong" every time.

### 7.3 Suggested front end structure

```
client/
  src/
    app/
      store.js
    api/
      inventoryApi.js         <- small axios helper (base URL + functions)
    features/
      inventory/
        inventorySlice.js     <- state, reducers, thunks, extraReducers
        inventorySelectors.js <- createSelector functions
    components/
      Summary.jsx
      ItemForm.jsx
      SearchFilter.jsx
      ItemList.jsx
      ItemRow.jsx
      Loader.jsx
      ErrorMessage.jsx
    App.jsx
    main.jsx
    index.css
  .env                        <- VITE_API_URL=http://localhost:5000/api
```

In plain words:

- **store.js**: creates the central data box.
- **inventoryApi.js**: the only place that knows the server's address.
- **inventorySlice.js**: holds the state, the simple actions, the thunks and how the state reacts to them.
- **inventorySelectors.js**: the smart "calculate from the items" helpers.
- **The components**: the visible pieces of the page.

### 7.4 Form checks (validation)

Check on the front end before sending anything to the server:

- Name must not be empty.
- Category must not be empty.
- Quantity must be a number and **0 or more**.
- Price must be a number and **more than 0**.
- Low stock limit must be a number and **0 or more**.

If something is wrong, show a short message near the form (like "Please enter a name") and do **not** send it. Remember, the server checks too, so also display any error message the server sends back.

### 7.5 What the page should look like

Top to bottom:

1. **Title**: "Inventory Manager"
2. **Summary row**: four boxes with the numbers from 5.2.I
3. **Form**: to add or edit an item
4. **Search box and category dropdown**
5. **Items table** with all the buttons
6. A loading message while fetching.
7. An error message if something fails.
8. If nothing matches the search/filter, show "No items found".
9. If the database has no items at all, show "Your inventory is empty. Add your first item!"

Design is your choice. Keep it clean and readable. Plain CSS is fine. Bootstrap or Tailwind is allowed but not required.

---

## 8. Sample starting data

Add these into your database yourself (using the form in your app, MongoDB Compass, or a small seed script) so the page has content:

| Name | Category | Quantity | Price | Low Stock Limit |
|---|---|---|---|---|
| Blue Pen | Stationery | 50 | 10 | 10 |
| Notebook | Stationery | 8 | 45 | 10 |
| School Bag | Bags | 3 | 650 | 5 |
| Water Bottle | Accessories | 20 | 120 | 5 |
| Calculator | Electronics | 0 | 350 | 2 |

Notebook and School Bag should show "Low Stock". Calculator should show "Out of Stock".

*Bonus:* write a `seed.js` script in the server folder that clears the collection and inserts these items with one command (`npm run seed`).

---

## 9. Step by step plan (follow this order)

Building in small steps makes this far less confusing. Test after every step. Don't move on if the current one is broken.

**Back end first**

1. Set up the `server` folder and install packages.
2. Connect to MongoDB and print a success message.
3. Create the Item model.
4. Build `GET /api/items` and test it with Postman, Thunder Client or the browser.
5. Build POST, PUT, PATCH (quantity) and DELETE. Test each one.
6. Add validation and proper error responses.

**Front end next**

7. Set up the Vite `client`, install packages, create the store, wrap the app in `Provider`.
8. Create the slice and the `fetchItems` thunk. Show the items from the database on screen (a plain list is fine at first).
9. Add loading and error display.
10. Add the `deleteItem` thunk and button.
11. Add the `addItem` thunk and the form.
12. Add the `changeQuantity` thunk and the + / − buttons.
13. Add editing (`editingItem` state and the `updateItem` thunk).
14. Add low stock and out of stock styling and labels.
15. Add the selectors and the summary numbers.
16. Add search and category filter (working together).
17. Add form validation.
18. Clean up styling, then test everything once more from start to finish.

---

## 10. Bonus (optional, for extra marks)

Pick any you like:

- Seed script (see section 8).
- Sort the table by name, price or quantity.
- "Confirm before delete" pop-up.
- "Low stock only" checkbox filter.
- Server-side search and category filter using query strings (like `/api/items?search=pen&category=Stationery`).
- Pagination.
- Optimistic updates for the + / − buttons (update the screen first, undo if the server fails).
- Export the inventory as a CSV file.
- Make the page look good on mobile.
- Deploy: back end on Render, front end on Vercel or Netlify, database on MongoDB Atlas.

---

## 11. What to submit

1. Your whole project (`server` and `client`) uploaded to **one** GitHub repository.
2. A `README.md` at the top that says:
   - What the app does (2 to 3 lines).
   - How to run the back end (install, `.env` setup, start command).
   - How to run the front end (install, `.env` setup, start command).
   - A list of your API routes.
   - Screenshots of your app.
3. A `.env.example` in both `server` and `client`.
4. Do **not** upload `node_modules` or real `.env` files. Your real database password must never appear on GitHub.

---

## 12. How you will be checked

| Part | Marks |
|---|---|
| Both server and client run without errors | 5 |
| MongoDB connection and Item model with rules | 10 |
| All 6 API routes work with correct status codes and JSON errors | 15 |
| Redux store and slice set up correctly | 10 |
| `createAsyncThunk` used for every server call, `extraReducers` handles pending / fulfilled / rejected | 15 |
| Add, edit, delete working end to end (data survives refresh) | 10 |
| + / − quantity works and never goes below 0 (front and back) | 5 |
| Low stock and out of stock highlighting | 5 |
| Summary numbers use `createSelector` and update automatically | 5 |
| Search and category filter working together | 5 |
| Form validation (front and back) | 5 |
| Loading and error messages shown on screen | 5 |
| Clean code and folder structure, no RTK Query, no items in `useState` | 5 |
| **Total** | **100** |
| Bonus | up to 10 extra |

---

## 13. Quick checklist before you submit

**Back end**
- [ ] Server starts and prints that MongoDB is connected.
- [ ] All 6 routes work when tested with Postman or Thunder Client.
- [ ] Bad data gets a 400 with a helpful message. Unknown id gets a 404.
- [ ] Quantity can't go below 0 even if I send a wrong request directly.
- [ ] `.env` is not on GitHub. `.env.example` is.

**Front end**
- [ ] App starts with `npm run dev` with no red errors in the browser console.
- [ ] Items load from the database when the page opens.
- [ ] I can add, edit and delete an item, and after a refresh the changes are still there.
- [ ] `+` and `−` work and quantity never goes below 0.
- [ ] Low stock rows are highlighted; zero quantity shows "Out of Stock".
- [ ] The four summary numbers change when I change items.
- [ ] Search works. Category filter works. Both work together.
- [ ] Empty or wrong form values are rejected with a message.
- [ ] Loading text appears while waiting, and an error message appears if I switch the server off.
- [ ] Items live in Redux, not `useState`.
- [ ] I used `createAsyncThunk` and did **not** use RTK Query.
- [ ] Components don't call `axios` directly.

**Submission**
- [ ] README added with run steps and screenshots.
- [ ] `node_modules` not uploaded.

---

## 14. Tips if you get stuck

- Use the **Redux DevTools** browser extension. It shows every action (like `inventory/fetchItems/pending`, then `fulfilled`) and how the data changed. This is the best way to understand what's going on.
- Test your server with Postman or Thunder Client **before** writing the front end for it. If the server is wrong, no amount of React fixing will help.
- If the browser says "CORS error", you forgot `cors()` on the server (or it's placed after your routes).
- If nothing updates on screen, check that you wrapped the app in `Provider`.
- If you get "cannot read properties of undefined", check the name you used in `useSelector` matches the name you gave in the store.
- If MongoDB won't connect, double check the connection string, your password (special characters need encoding), and that your IP is allowed in Atlas.
- Remember MongoDB uses `_id`, not `id`. Use `_id` in your React code (for example as the `key` in lists and when finding an item to update).
- Make each small piece work before adding the next one.
- Read the official Redux Toolkit "Quick Start" and the `createAsyncThunk` page once. They're short.

Good luck, and have fun with it!
