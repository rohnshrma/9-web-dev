import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import jobRoutes from "./routes/jobs.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jobPortal";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/jobs", jobRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.redirect("/jobs");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
