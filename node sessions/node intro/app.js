// const fs = require("fs");
const fs = require("fs/promises");

// async
// fs.readFile("./hello.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log("hello world");

// sync (blocking)
// const data = fs.readFileSync("./hello.txt", "utf-8");
// console.log(data);

// console.log("hello world");

// create a file if not exists and overwrites any data if exists
// fs.writeFile("./data.txt", "Hello James\nMy Name is Arron", (err) => {
//   if (err) throw err;
//   console.log("File Created");
// });

// fs.appendFile("./data.txt", "\nthis is some random text by\n\tArron", (err) => {
//   if (err) throw err;
//   console.log("Data written");
// });

// fs.unlink("./data.txt", (err) => {
//   if (err) throw err;
//   console.log("File Deleted");
// });

// fs.mkdir("myNewFolder", (err) => {
//   if (err) throw err;
//   console.log("folder created");
// });

// fs.readdir(".", (err, files) => {
//   if (err) throw err;
//   console.log(files);
// });

async function readFile(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

readFile("hello.txt");
