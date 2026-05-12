import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/jobPortal";

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "PixelCraft Labs",
    location: "Bengaluru",
    type: "Full-time",
    description:
      "Build and maintain responsive user interfaces using modern JavaScript and EJS templates.",
    salary: "₹10-14 LPA",
  },
  {
    title: "Backend Node.js Engineer",
    company: "CloudNova",
    location: "Hyderabad",
    type: "Remote",
    description:
      "Design APIs, manage MongoDB data models, and optimize server performance.",
    salary: "₹12-18 LPA",
  },
  {
    title: "MERN Stack Intern",
    company: "StartEdge",
    location: "Pune",
    type: "Part-time",
    description:
      "Support full-stack development tasks, bug fixes, and UI improvements for web products.",
    salary: "₹20,000/month",
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    await Job.deleteMany({});
    await Job.insertMany(sampleJobs);

    console.log("Dummy jobs inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedJobs();
