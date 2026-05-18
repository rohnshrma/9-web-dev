import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expense.js";

config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/expense", expenseRoutes);

app.listen(PORT, () => console.log("Server started on port : ", PORT));
