import express from "express";

const app = express();

app.use(express.static("public"));

//routes

// home route / root route
app.route("/").get((req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});
app.route("/about").get((req, res) => {
  res.write("<h1>Welcome to aboutpage</h1>");
  res.write("<p>my name is john doe</p>");
  res.send();
});

app.use((req, res, next) => {
  res.status(404).send(`
    <h1>404 - PAGE NOT FOUND</h1>
    <a href="/">HOMEPAGE</a>`);
  next();
});

// creating a node server
app.listen(3000, () => console.log("Server Started on port :", 3000));
