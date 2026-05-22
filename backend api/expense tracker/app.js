// Import Express to create the HTTP server and define API routes.
import express from "express";
// Import dotenv's config function so environment variables from .env are loaded into process.env.
import { config } from "dotenv";
// Import the database connection helper that initializes MongoDB using Mongoose.
import connectDB from "./config/db.js";
// Import expense-related route definitions (CRUD for expenses).
import expenseRoutes from "./routes/expense.js";
// Import authentication route definitions (register/login).
import authRoutes from "./routes/auth.js";

// Load environment variables as early as possible so the rest of the app can read them safely.
config();

// Initialize MongoDB connection before serving requests.
connectDB();

// Create an Express application instance (the main app object).
const app = express();

// Read the server port from environment variables; fall back to 3000 for local development.
const PORT = process.env.PORT || 3000;

// Register built-in JSON middleware so req.body is parsed when clients send application/json.
app.use(express.json());

// Mount auth routes under /api/auth, e.g. POST /api/auth/login.
app.use("/api/auth", authRoutes);
// Mount expense routes under /api/expense, e.g. GET /api/expense.
app.use("/api/expense", expenseRoutes);

// Start the HTTP server and log the port when it becomes ready.
app.listen(PORT, () => console.log("Server started on port : ", PORT));
