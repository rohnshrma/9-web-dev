import mongoose from "mongoose";

// document structure : Schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unqiue: true,
    trim: true,
  },
});

// model name / collection

const Task = mongoose.model("Task", taskSchema);

export default Task;
