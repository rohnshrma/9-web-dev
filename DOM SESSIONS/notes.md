# DOM Notes from `script.js`

These notes explain everything taught in [`script.js`](/Users/rohan/Desktop/Rohan%20Desktop/Classes/9-web-dev/DOM%20SESSIONS/script.js), including the commented code, and connect it with the HTML in [`index.html`](/Users/rohan/Desktop/Rohan%20Desktop/Classes/9-web-dev/DOM%20SESSIONS/index.html).

## 1. What Is the DOM?

DOM stands for **Document Object Model**.

When the browser reads an HTML page, it does not just see plain text. It converts the HTML into a structured tree of objects. That tree is called the DOM.

Each HTML element becomes an object that JavaScript can access and change.

Example from your HTML:

```html
<div id="main">
  <h1 id="headone" style="font-size: 4rem; color: teal; text-shadow: -2px 2px 0 orange">
    hello <u> world</u>
  </h1>
  <p class="para">...</p>
  <p class="para">...</p>
  <p class="para">...</p>
</div>
```

JavaScript can:

- find the `div`
- read the `h1`
- change the heading text
- change styles
- read attributes like `id` and `style`
- add or update attributes

So DOM manipulation means:

- selecting elements from the page
- reading information from them
- changing their content, style, or attributes

## 2. Why `document` Is Used

In the browser, `document` represents the whole HTML page.

So when you write:

```js
document.getElementById("main")
```

you are saying:

"From this webpage, find the element whose `id` is `main`."

`document` is the entry point for DOM work.

## 3. Topic 1: Selectors

Your code starts with selectors, which means ways to locate elements in the DOM.

### `getElementById()`

Code:

```js
console.log(document.getElementById("main"));
```

Meaning:

- Finds one element by its `id`
- `id` should usually be unique in a page
- Returns a single element object or `null` if not found

In your HTML:

```html
<div id="main">
```

So this line selects that whole `div`.

Why this is useful:

- When you know the exact element by id
- It is simple and fast
- Good for unique sections like navbar, container, heading, form, etc.

Important concept:

- `id` is meant for one specific element
- That is why `getElementById()` gives only one element

### `getElementsByClassName()`

Code:

```js
console.log(document.getElementsByClassName("para"));
```

Meaning:

- Finds all elements with class `para`
- Returns an **HTMLCollection**

In your HTML there are three:

```html
<p class="para">...</p>
<p class="para">...</p>
<p class="para">...</p>
```

So JavaScript returns a collection of those three `<p>` elements.

Important concept: HTMLCollection

- It looks like an array
- But it is **not a real array**
- You can access elements using index like `collection[0]`
- Many array methods like `.map()` do not directly work on it

Example:

```js
var paras = document.getElementsByClassName("para");
console.log(paras[0]);
```

Why your comment says "kind of array":

- because it stores multiple items with indexes
- but technically it is a different object type

### `getElementsByTagName()`

Code:

```js
console.log(document.getElementsByTagName("h1"));
```

Meaning:

- Finds all elements by tag name
- Here it selects all `<h1>` tags
- Returns an **HTMLCollection**

Since your page has one `<h1>`, the collection contains one item.

This is useful when:

- you want all paragraphs
- all buttons
- all `li` items
- all headings of one type

Example:

```js
var headings = document.getElementsByTagName("h1");
console.log(headings[0]);
```

### `querySelector()`

Code:

```js
console.log(document.querySelector(".para"));
```

Meaning:

- Selects **one single element**
- Uses CSS selector syntax

That means you can select with:

- `#id`
- `.class`
- `tagname`

Examples:

```js
document.querySelector("#main");
document.querySelector(".para");
document.querySelector("h1");
```

Very important rule:

- If multiple elements match, `querySelector()` returns only the **first matching element**

So in your page, there are three `.para` elements, but this line returns only the first paragraph.

Why this method is popular:

- one method handles id, class, and tag
- same style as CSS selectors
- flexible and easy to remember

### `querySelectorAll()`

Code:

```js
console.log(document.querySelectorAll(".para"));
```

Meaning:

- Selects all matching elements
- Returns a **NodeList**

This selects all paragraphs with class `para`.

Important concept: NodeList

- also looks like an array
- also not exactly a normal array
- often easier to work with than HTMLCollection
- usually supports `forEach()`

Example:

```js
var allParas = document.querySelectorAll(".para");
allParas.forEach(function (para) {
  console.log(para);
});
```

### Difference Between HTMLCollection and NodeList

This is one of the most important beginner concepts.

`getElementsByClassName()` and `getElementsByTagName()` return:

- `HTMLCollection`

`querySelectorAll()` returns:

- `NodeList`

Simple understanding:

- both store multiple DOM items
- both are array-like
- neither is a true array
- `NodeList` is usually more convenient in modern JS

Shortcut memory:

- old-style selectors often return `HTMLCollection`
- modern CSS-style selection with `querySelectorAll()` returns `NodeList`

## 4. Topic 2: Getters and Setters

Your code then moves to getters and setters.

Code:

```js
var headingOne = document.querySelector("h1");
```

This stores the first `h1` element in a variable.

In your HTML that is:

```html
<h1
  id="headone"
  style="font-size: 4rem; color: teal; text-shadow: -2px 2px 0 orange"
>
  hello <u> world</u>
</h1>
```

Why store it in a variable?

- So you do not have to select it again and again
- It makes code shorter and easier to read

Example:

```js
var headingOne = document.querySelector("h1");
```

Now `headingOne` refers to the `h1` DOM object.

### What is a getter?

A getter reads data from an element.

Examples:

- getting text
- getting HTML inside the tag
- getting styles
- getting attributes

### What is a setter?

A setter changes data in an element.

Examples:

- changing text
- changing HTML
- changing styles
- changing attributes

So DOM manipulation is often:

1. select the element
2. get something from it
3. set or update something on it

## 5. `innerText`

Your commented code:

```js
// console.log(headingOne.innerText);
// headingOne.innerText = "This is the newly set heading";
```

### Getting `innerText`

Code:

```js
console.log(headingOne.innerText);
```

This reads the visible text inside the element.

For your heading:

```html
<h1>hello <u> world</u></h1>
```

The text seen by the user is roughly:

```txt
hello world
```

So `innerText` gives the human-readable text content.

Use `innerText` when:

- you want plain visible text
- you do not care about the HTML tags inside

### Setting `innerText`

Code:

```js
headingOne.innerText = "This is the newly set heading";
```

This replaces all existing text inside the element with new text.

Important effect:

- the old content is removed
- any child tags inside are also replaced as content

So this:

```html
hello <u> world</u>
```

becomes:

```html
This is the newly set heading
```

The `<u>` tag would no longer matter because the content is replaced with plain text.

## 6. `innerHTML`

Your commented code:

```js
// console.log(headingOne.innerHTML);
// headingOne.innerHTML = "my name is <span style='color:red'>john doe</span>";
```

### Getting `innerHTML`

Code:

```js
console.log(headingOne.innerHTML);
```

This gives the HTML content inside the element, not just text.

For your heading, the result is approximately:

```html
hello <u> world</u>
```

Notice the difference:

- `innerText` gives text only
- `innerHTML` gives tags plus text

### Setting `innerHTML`

Code:

```js
headingOne.innerHTML = "my name is <span style='color:red'>john doe</span>";
```

This inserts actual HTML inside the `h1`.

The result would look like:

```html
<h1>my name is <span style="color:red">john doe</span></h1>
```

And on screen, `john doe` would appear red.

Why this is powerful:

- you can create formatted content
- add new tags
- wrap text in `span`, `b`, `i`, etc.

Important warning:

- `innerHTML` parses HTML
- so it is powerful but should be used carefully
- if unsafe user input is inserted, it can create security problems

Beginner rule:

- use `innerText` for plain text
- use `innerHTML` when you intentionally want HTML tags inside

## 7. Styles in the DOM

Your script teaches both reading style and writing style.

### Getting style object

Commented code:

```js
// console.log(headingOne.style);
// console.log(headingOne.style.color);
```

`headingOne.style` gives access to the element's **inline styles**.

Your HTML heading has inline styles:

```html
style="font-size: 4rem; color: teal; text-shadow: -2px 2px 0 orange"
```

So when you inspect:

```js
console.log(headingOne.style);
```

you get a style object containing those inline style values.

When you do:

```js
console.log(headingOne.style.color);
```

you get:

```js
"teal"
```

Important concept:

- `.style` mainly deals with inline styles
- it does not mean "all CSS from everywhere"
- it directly reflects styles set in the `style=""` attribute or styles added through JavaScript

### Setting specific style properties

Commented code:

```js
// headingOne.style.color = "red";
// headingOne.style.fontSize = "10rem";
// headingOne.style.fontFamily = "cursive";
```

This changes individual CSS properties from JavaScript.

Important syntax rule:

- CSS uses kebab-case like `font-size`
- JavaScript style properties use camelCase like `fontSize`

Examples:

- `font-size` becomes `fontSize`
- `background-color` becomes `backgroundColor`
- `text-shadow` becomes `textShadow`

After these lines, the heading would:

- become red
- grow to `10rem`
- use cursive font

This is called assigning values to specific style properties.

This approach is good because:

- it changes only what you need
- other existing inline styles stay as they are unless overwritten individually

### Overwriting the whole inline style

Commented code:

```js
// headingOne.style =
//   "color:powderblue;font-size:5rem;text-shadow:-2px 0 0 orange";
```

This replaces the whole inline style string.

That means instead of updating one property, you rewrite the entire inline style.

Important difference:

- `headingOne.style.color = "red"` changes one property
- `headingOne.style = "..."` overwrites the entire inline style definition

Why this matters:

- if old inline styles were there, they may be removed if not included again

For example, original style in HTML:

```html
font-size: 4rem; color: teal; text-shadow: -2px 2px 0 orange
```

After overwriting:

```html
color: powderblue; font-size: 5rem; text-shadow: -2px 0 0 orange
```

Only the new style string remains.

Beginner advice:

- use individual properties when possible
- use full overwrite only when you intentionally want total replacement

## 8. Attributes

Your active code then teaches attributes.

HTML attributes are things written inside the opening tag, like:

- `id="headone"`
- `class="para"`
- `style="..."`
- `src="..."`
- `href="..."`

### Get all attributes

Code:

```js
console.log(headingOne.attributes);
```

This returns all attributes of the `h1` element.

For your heading, it includes at least:

- `id="headone"`
- `style="font-size: 4rem; color: teal; text-shadow: -2px 2px 0 orange"`

Important concept:

- attributes are metadata about an element
- they describe the element
- JavaScript can read them and change them

### Get one attribute value

Code:

```js
console.log(headingOne.getAttribute("id"));
console.log(headingOne.getAttribute("style"));
```

This reads the value of a specific attribute.

Results:

- `getAttribute("id")` returns `"headone"`
- `getAttribute("style")` returns the inline style string

Why use `getAttribute()`?

- when you want exact attribute values
- works for common and custom attributes

Examples:

```js
element.getAttribute("href");
element.getAttribute("src");
element.getAttribute("data-id");
```

### Set an attribute

Code:

```js
headingOne.setAttribute("id", "headddddddddone");
```

This changes the `id` attribute of the `h1`.

Before:

```html
<h1 id="headone" ...>
```

After:

```html
<h1 id="headddddddddone" ...>
```

Important concept:

- `setAttribute()` creates the attribute if it does not exist
- if it already exists, it updates it

So it can both add and replace.

Example:

```js
headingOne.setAttribute("title", "This is a heading");
```

This adds a new `title` attribute.

## 9. Big Concept: Property vs Attribute

This lesson touches an important DOM concept.

These are related but not always exactly the same:

- DOM properties
- HTML attributes

Examples from your code:

- `headingOne.innerText` is a property
- `headingOne.innerHTML` is a property
- `headingOne.style.color` is a property access
- `headingOne.getAttribute("id")` reads an attribute
- `headingOne.setAttribute("id", "...")` writes an attribute

Simple way to remember:

- attributes come from HTML markup
- properties are JavaScript object values on the DOM element

In beginner practice, both are used often, so it is enough to know:

- `getAttribute()` and `setAttribute()` work with HTML attributes
- `.innerText`, `.innerHTML`, `.style` work with DOM properties

## 10. What Happens Step by Step in Your Script

Here is the exact teaching flow of your file.

### Step 1: Intro comment

```js
// dom manipulation
```

This tells us the topic is changing the webpage using JavaScript.

### Step 2: Selecting by id

```js
console.log(document.getElementById("main"));
```

You inspect the main container.

### Step 3: Selecting by class

```js
console.log(document.getElementsByClassName("para"));
```

You inspect all paragraph elements with class `para`.

### Step 4: Selecting by tag

```js
console.log(document.getElementsByTagName("h1"));
```

You inspect all `h1` elements.

### Step 5: Selecting first match with querySelector

```js
console.log(document.querySelector(".para"));
```

You inspect the first paragraph with class `para`.

### Step 6: Selecting all matches with querySelectorAll

```js
console.log(document.querySelectorAll(".para"));
```

You inspect all paragraph elements with class `para`.

### Step 7: Store `h1` in a variable

```js
var headingOne = document.querySelector("h1");
```

Now you can perform multiple operations on the heading.

### Step 8: Teach getters and setters through comments

You show how to:

- get and set text with `innerText`
- get and set HTML with `innerHTML`
- read styles
- change styles one by one
- overwrite full inline style

These are commented out right now, so they are examples for learning, not currently running.

### Step 9: Read attributes

```js
console.log(headingOne.attributes);
console.log(headingOne.getAttribute("id"));
console.log(headingOne.getAttribute("style"));
```

These lines actively run and show attribute information.

### Step 10: Change the `id`

```js
headingOne.setAttribute("id", "headddddddddone");
```

This actively changes the heading's id at runtime.

## 11. What Will Actually Print in the Console?

Approximate output understanding:

- `document.getElementById("main")`
  gives the whole `<div id="main">...</div>`
- `document.getElementsByClassName("para")`
  gives an HTMLCollection with three paragraphs
- `document.getElementsByTagName("h1")`
  gives an HTMLCollection with one `h1`
- `document.querySelector(".para")`
  gives the first paragraph only
- `document.querySelectorAll(".para")`
  gives a NodeList with three paragraphs
- `headingOne.attributes`
  gives the attributes of the `h1`
- `headingOne.getAttribute("id")`
  gives `"headone"` before the update
- `headingOne.getAttribute("style")`
  gives the inline style string

Then:

```js
headingOne.setAttribute("id", "headddddddddone");
```

changes the id in the DOM.

If you inspect the element after that line, its id is no longer `headone`.

## 12. Important Beginner Mistakes to Avoid

### Mistake 1: Thinking HTMLCollection is a real array

It is not a full array. It is array-like.

### Mistake 2: Thinking `querySelector()` returns all matches

It returns only the first matching element.

### Mistake 3: Mixing CSS property names with JavaScript names

In CSS:

```css
font-size
```

In JavaScript:

```js
fontSize
```

### Mistake 4: Confusing `innerText` and `innerHTML`

- `innerText` means plain visible text
- `innerHTML` means HTML markup inside the element

### Mistake 5: Overwriting all styles accidentally

If you do:

```js
element.style = "color:red";
```

you may remove other inline styles not included in that string.

### Mistake 6: Changing an `id` and forgetting that selectors may stop working

If code later uses:

```js
document.getElementById("headone")
```

it will fail after you change the id to something else.

## 13. Interview-Style Understanding Questions

These are the concepts your lesson covers deeply:

### What is the difference between `getElementById()` and `querySelector()`?

- `getElementById()` only selects by id
- `querySelector()` uses CSS selector syntax and can select id, class, tag, and more

### What is the difference between `getElementsByClassName()` and `querySelectorAll()`?

- both can select multiple elements
- first returns `HTMLCollection`
- second returns `NodeList`

### What is the difference between `innerText` and `innerHTML`?

- `innerText` gives or sets text only
- `innerHTML` gives or sets HTML markup

### What is the difference between style property assignment and full style overwrite?

- `element.style.color = "red"` changes one property
- `element.style = "color:red"` rewrites the whole inline style

### What is the difference between `getAttribute()` and normal DOM properties?

- `getAttribute()` reads attribute values from the HTML side
- DOM properties like `innerText` and `style` are accessed directly on the element object

## 14. Practice Tasks

Try these in the same project to become comfortable with the DOM.

### Task 1: Select the main div

Use `getElementById()` to select `main` and print it.

### Task 2: Select all paragraphs

Use both:

- `getElementsByClassName("para")`
- `querySelectorAll(".para")`

Print both and observe the difference.

### Task 3: Change heading text

Use `innerText` to change the heading to:

```txt
Learning DOM is fun
```

### Task 4: Add HTML inside heading

Use `innerHTML` so one word appears in red using a `span`.

### Task 5: Read current heading color

Use:

```js
headingOne.style.color
```

and print it.

### Task 6: Change three styles

Change:

- color
- font size
- font family

using individual style property assignments.

### Task 7: Overwrite the whole inline style

Replace the heading's whole inline style with a new one and see what old styles disappear.

### Task 8: Read attributes

Print:

- all attributes
- `id`
- `style`

### Task 9: Add a new attribute

Use:

```js
setAttribute("title", "DOM heading")
```

Then hover over the heading in the browser.

### Task 10: Change paragraph text

Select the first paragraph and change its text.

### Task 11: Change all paragraph colors

Use `querySelectorAll(".para")` and loop through all paragraphs to make them blue.

Example idea:

```js
var paras = document.querySelectorAll(".para");
paras.forEach(function (para) {
  para.style.color = "blue";
});
```

### Task 12: Give each paragraph different text

Update each paragraph one by one with different content.

## 15. Challenge Tasks

If you want stronger DOM practice, try these too.

### Challenge 1

When the page loads, change the heading text and paragraph colors automatically.

### Challenge 2

Add a button in HTML and when the button is clicked, change the heading color.

### Challenge 3

Add another button that restores the original heading text and styles.

### Challenge 4

Change the id of the heading and then try selecting it again using the old id and the new id. Observe what happens.

### Challenge 5

Create a new paragraph using `innerHTML` inside `#main`.

## 16. Final Summary

Your `script.js` teaches the foundation of DOM manipulation:

- selecting elements
- understanding single vs multiple selection
- understanding `HTMLCollection` vs `NodeList`
- using getters and setters
- reading and changing text
- reading and changing HTML
- reading and changing inline styles
- reading and changing attributes

This is the core starting point for interactive web development.

Once these concepts are clear, the next natural topics are:

- event listeners
- creating elements
- appending elements
- removing elements
- class manipulation with `classList`
- form handling

If you want, this same `notes.md` can later be extended into a full DOM handbook chapter by chapter.
