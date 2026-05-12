import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job title is required."],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required."],
  },
  location: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Remote"],
    default: "Full-time",
  },
  description: {
    type: String,
    required: [true, "Job description is required."],
  },
  salary: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
