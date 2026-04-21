# Class Notes - April 21, 2026

## Topic: Node.js File System (`fs`)

Today we learned how to work with files and folders in Node.js.

## 1) Importing `fs`

```js
const fs = require("fs");
```

For Promise-based syntax:

```js
const fs = require("fs/promises");
```

## 2) Reading Files

Callback style (asynchronous):

```js
fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

Synchronous style (blocking):

```js
const data = fs.readFileSync("./hello.txt", "utf-8");
console.log(data);
```

Promise + `async/await` style:

```js
async function readFile(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

readFile("hello.txt");
```

## 3) Writing and Appending

Create or overwrite a file:

```js
fs.writeFile("./data.txt", "Hello James\nMy Name is Arron", (err) => {
  if (err) throw err;
  console.log("File Created");
});
```

Append data to existing file:

```js
fs.appendFile("./data.txt", "\nthis is some random text by\n\tArron", (err) => {
  if (err) throw err;
  console.log("Data written");
});
```

## 4) Deleting and Folder Operations

Delete a file:

```js
fs.unlink("./data.txt", (err) => {
  if (err) throw err;
  console.log("File Deleted");
});
```

Create a folder:

```js
fs.mkdir("myNewFolder", (err) => {
  if (err) throw err;
  console.log("folder created");
});
```

Read files in a directory:

```js
fs.readdir(".", (err, files) => {
  if (err) throw err;
  console.log(files);
});
```

## Key Takeaways

- `readFile` is non-blocking and preferred for most cases.
- `readFileSync` blocks the thread and should be used carefully.
- `fs/promises` + `async/await` gives cleaner modern code.
- Always handle errors when doing file operations.
