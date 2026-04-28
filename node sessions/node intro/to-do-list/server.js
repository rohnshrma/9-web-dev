import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
const app = express();
const PORT = 3000;
let tasks = [];

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app
  .route("/")
  .get((req, res) => {
    res.render("home", {
      date: new Date().toLocaleDateString(),
      tasks: tasks,
    });
  })
  .post((req, res) => {
    console.log("Body =>", req.body.task);
    tasks.push({ task: req.body.task, id: uuidv4() });
    console.log(tasks);
    res.redirect("/"); // makes a get request to the home route
  });

app.route("/delete/:id").delete((req, res) => {
  const deleteID = req.params.id;
  tasks = tasks.filter((task) => task.id !== deleteID);
  res.redirect("/"); // makes a get request to the home route (refresh)
});

app.route("/update/:id").put((req, res) => {
  const id = req.params.id;
  const updatedTask = req.body.task;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, task: updatedTask } : task
  );
  console.log(tasks);

  res.redirect("/");
});

app.listen(PORT, () => console.log("Server started on port : 3000"));
