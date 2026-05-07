import express from "express";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
import connectDB from "./config/db.js";
import Task from "./model/task.js";

const app = express();
const PORT = 3000;

connectDB();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app
  .route("/")
  .get(async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.render("home", {
        date: new Date().toLocaleDateString(),
        tasks: tasks,
      });
    } catch (err) {
      console.log(err, "Failed To Load Tasks");
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    try {
      const { task } = req.body;

      const newTask = await Task.create({ name: task });

      console.log("Task Added =>", newTask);

      res.redirect("/"); // makes a get request to the home route
    } catch (err) {
      console.log(err, "Failed to add task");
      res.redirect("/");
    }
  });

app.route("/delete/:id").delete(async (req, res) => {
  try {
    const deleteID = req.params.id;

    const task = await Task.findById(deleteID);

    if (!task) {
      console.log("Task Not Found");
      return res.redirect("/");
    }

    await Task.findByIdAndDelete(deleteID);

    console.log("Task Deleted");

    res.redirect("/"); // makes a get request to the home route (refresh)
  } catch (err) {
    console.log(err, "Failed to delete task");
    res.redirect("/");
  }
});

app.route("/update/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body.task;

    const task = await Task.findById(id);

    if (!task) {
      console.log("Task Not Found");
      return res.redirect("/");
    }

    task.name = updatedTask;

    await task.save();

    console.log("Task Updated", task);

    res.redirect("/"); // makes a get request to the home route (refresh)
  } catch (err) {
    console.log(err, "Failed to update task");
    res.redirect("/");
  }
});

app.listen(PORT, () => console.log("Server started on port : 3000"));
