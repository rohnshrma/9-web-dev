# Assignment: Build an Inventory Management App (React + Redux + Vite)

## 1. What is this assignment about?

Imagine you run a small shop. You have shelves full of stuff: pens, notebooks, bags, whatever. You need a simple place to keep track of what you have, how many of each thing is left, and what it costs. Right now you probably do this in a notebook or in your head.

Your job is to build a small website that does this for you. You will be able to add new items, see all your items in a list, change them, delete them, and quickly spot which items are running out.

You will build it using:

- **React**: to build the screens you see.
- **Redux (Redux Toolkit)**: to keep all the item data in one central place that every part of your app can use.
- **Vite**: the tool that creates and runs your React project quickly.

There is **no backend and no database** in this assignment. Everything lives inside the browser while the app is open. (There's an optional bonus for saving data so it survives a refresh.)

---

## 2. Why are we using Redux here?

In a normal React app, data lives inside a component, and if another component far away needs it, you keep passing it down through props. That gets messy fast.

Redux fixes this by giving you **one big box (called the store)** that holds all your data. Any component can:

- **Read** from the box.
- **Ask the box to change** something (by sending an "action").

Think of it like a school office. Students (components) don't change the records themselves. They fill in a request form (action), and the office (reducer) updates the records. Everyone then sees the same updated records.

---

## 3. Setting up the project

Do these steps in order.

1. Open your terminal and go to the folder where you want the project.
2. Create the project with Vite:
   ```
   npm create vite@latest inventory-app -- --template react
   ```
3. Go inside the folder and install the basics:
   ```
   cd inventory-app
   npm install
   ```
4. Install Redux tools:
   ```
   npm install @reduxjs/toolkit react-redux
   ```
5. Start the app:
   ```
   npm run dev
   ```
6. Open the link it shows you (usually `http://localhost:5173`). You should see the starter Vite page. Clear out the default demo stuff (the logo, the counter button) so you start with a clean page.

---

## 4. What your app must do (the requirements)

### 4.1 Each item has these details

Every inventory item must have:

| Detail | What it means | Example |
|---|---|---|
| **id** | A unique number or code so the app can tell items apart. You don't type this, the app makes it. | 1, 2, 3 or a random code |
| **name** | What the item is called | "Blue Pen" |
| **category** | What group it belongs to | "Stationery" |
| **quantity** | How many you have right now | 25 |
| **price** | Cost of one piece, in rupees or dollars (your choice) | 10 |
| **lowStockLimit** | If quantity goes at or below this number, the item counts as "low stock" | 5 |

### 4.2 Things a user can do

**A. Add an item**
- There is a form with boxes for name, category, quantity, price and low stock limit.
- There is an "Add Item" button.
- When clicked, the new item appears in the list.
- The form clears after adding.

**B. See all items**
- Show all items in a table (or cards, your choice).
- Each row shows name, category, quantity, price, and the total value of that item (quantity × price).

**C. Edit an item**
- Each item has an "Edit" button.
- Clicking it fills the form with that item's current details.
- The button changes to "Update Item".
- After updating, the list shows the new details.

**D. Delete an item**
- Each item has a "Delete" button.
- Clicking it removes the item from the list.

**E. Increase / decrease stock quickly**
- Each item has a **+** and a **−** button next to its quantity.
- **+** adds 1, **−** removes 1.
- Quantity must **never go below 0**.

**F. Low stock warning**
- If an item's quantity is **less than or equal to** its low stock limit, highlight that row (for example a red or orange background) and show a small "Low Stock" label.
- If quantity is 0, show "Out of Stock".

**G. Search**
- A search box above the list.
- As the user types, only items whose name matches (ignoring capital/small letters) are shown.

**H. Filter by category**
- A dropdown that lists all the categories that exist in your items, plus an "All" option.
- Choosing a category shows only items from it.
- Search and category filter should work **together**.

**I. Summary at the top**
Show these four numbers on the page:
- Total number of different items
- Total quantity of everything in stock (add up all quantities)
- Total inventory value (add up quantity × price for each item)
- Number of items that are low on stock

These numbers must update automatically whenever something changes.

---

## 5. Rules for how you must build it (this is the "Redux part")

This is what makes it a Redux assignment, so please follow these carefully.

1. **Create a store** using `configureStore` from Redux Toolkit.
2. **Create one slice** for inventory using `createSlice`. Name it something like `inventorySlice`.
3. The slice must have:
   - An **initial state** (start with 4 to 5 sample items so the page isn't empty when it opens).
   - **Reducers** for: add item, delete item, update item, increase quantity, decrease quantity.
4. Wrap your whole app with `<Provider store={store}>` in `main.jsx`.
5. In components, use:
   - `useSelector` to **read** data from the store.
   - `useDispatch` to **send actions** to the store.
6. **Do not** keep the list of items in `useState`. The item list must live only in Redux. (It's fine to use `useState` for small things like what's currently typed in the search box or the form boxes.)
7. **Do not change state directly outside of reducers.** All changes to items must go through dispatching an action.
8. Calculations like totals and low stock counts should be **worked out from the items in the store**, not stored separately.

---

## 6. Suggested folder structure

You don't have to copy this exactly, but keep things tidy.

```
inventory-app/
  src/
    app/
      store.js
    features/
      inventory/
        inventorySlice.js
    components/
      Summary.jsx
      ItemForm.jsx
      ItemList.jsx
      ItemRow.jsx
      SearchFilter.jsx
    App.jsx
    main.jsx
    index.css
```

What each file is for, in plain words:

- **store.js**: creates the central data box.
- **inventorySlice.js**: holds the starting items and the rules for changing them.
- **Summary.jsx**: shows the four summary numbers.
- **ItemForm.jsx**: the form to add or edit an item.
- **ItemList.jsx**: shows the table of items.
- **ItemRow.jsx**: one single item row with its buttons.
- **SearchFilter.jsx**: the search box and category dropdown.
- **App.jsx**: puts all the pieces together on one page.

---

## 7. Form checks (validation)

Don't let bad data in. Before adding or updating, check:

- Name must not be empty.
- Category must not be empty.
- Quantity must be a number and **0 or more**.
- Price must be a number and **more than 0**.
- Low stock limit must be a number and **0 or more**.

If something is wrong, show a short message near the form (like "Please enter a name") and do **not** add the item.

---

## 8. Sample starting data

Use something like this so your page has content on first load:

| Name | Category | Quantity | Price | Low Stock Limit |
|---|---|---|---|---|
| Blue Pen | Stationery | 50 | 10 | 10 |
| Notebook | Stationery | 8 | 45 | 10 |
| School Bag | Bags | 3 | 650 | 5 |
| Water Bottle | Accessories | 20 | 120 | 5 |
| Calculator | Electronics | 0 | 350 | 2 |

With this data, Notebook and School Bag should show "Low Stock" and Calculator should show "Out of Stock".

---

## 9. What the page should look like

Top to bottom:

1. **Title**: "Inventory Manager"
2. **Summary row**: four boxes with the numbers from section 4.I
3. **Form**: to add or edit an item
4. **Search box and category dropdown**
5. **Items table**: with all the buttons
6. If nothing matches the search or filter, show a message like "No items found".
7. If there are no items at all, show "Your inventory is empty. Add your first item!"

Design is your choice. Keep it clean and readable. Plain CSS is fine. You can use a library like Bootstrap or Tailwind if you want, but it's not required.

---

## 10. Step by step plan (follow this order)

Building it in small steps makes it far less confusing.

1. Set up the Vite project and install Redux packages.
2. Create the store and wrap the app in `Provider`.
3. Create the slice with only initial state and show the items in a plain list. Make sure you can see them on screen.
4. Add the **delete** reducer and button.
5. Add the **add item** reducer and the form.
6. Add the **increase / decrease** buttons.
7. Add **edit / update**.
8. Add the **low stock** highlighting and labels.
9. Add the **summary** numbers.
10. Add **search** and **category filter**.
11. Add **form validation**.
12. Clean up the styling and test everything once more.

Test after every step. Don't move ahead if the current step is broken.

---

## 11. Bonus (optional, for extra marks)

Pick any you like:

- Save the items in `localStorage` so they're still there after refreshing the page.
- Sort the table by name, price or quantity.
- Add a "Confirm before delete" pop-up.
- Add a "Low stock only" checkbox filter.
- Export the inventory as a CSV file.
- Make the page look good on mobile.

---

## 12. What to submit

1. Your project uploaded to a GitHub repository.
2. A `README.md` inside your project which says:
   - What the app does (2 to 3 lines).
   - How to run it (the install and start commands).
   - A screenshot of your app.
3. Do **not** upload the `node_modules` folder.

---

## 13. How you will be checked

| Part | Marks |
|---|---|
| Project runs without errors | 10 |
| Redux store and slice set up correctly | 20 |
| Add, delete, edit working | 20 |
| Increase / decrease quantity (never below 0) | 10 |
| Low stock and out of stock highlighting | 10 |
| Summary numbers correct and auto-updating | 10 |
| Search and category filter working together | 10 |
| Form validation | 5 |
| Clean code and folder structure | 5 |
| **Total** | **100** |
| Bonus | up to 10 extra |

---

## 14. Quick checklist before you submit

- [ ] The app starts with `npm run dev` and shows no red errors in the browser console.
- [ ] Sample items show on first load.
- [ ] I can add an item and it appears.
- [ ] I can edit an item and the changes show.
- [ ] I can delete an item.
- [ ] `+` and `−` work and quantity never goes below 0.
- [ ] Low stock rows are highlighted; zero quantity shows "Out of Stock".
- [ ] The four summary numbers change when I change items.
- [ ] Search works. Category filter works. Both work together.
- [ ] Empty or wrong form values are rejected with a message.
- [ ] Item list is stored in Redux, not in `useState`.
- [ ] README added, `node_modules` not uploaded.

---

## 15. Tips if you get stuck

- Use the **Redux DevTools** browser extension. It lets you see every action and how the data changed. It's very helpful.
- If nothing updates on screen, check that you wrapped the app in `Provider`.
- If you get a "cannot read properties of undefined" error, check the name you used in `useSelector` matches the name you gave in the store.
- Make each small piece work before adding the next one.
- Read the official Redux Toolkit "Quick Start" page once. It's short.

Good luck, and have fun with it!
