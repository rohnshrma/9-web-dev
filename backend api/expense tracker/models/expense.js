// Import Mongoose to define expense schema/model.
import mongoose from "mongoose";

// Define expense schema with validation and relationship fields.
const expenseSchema = new mongoose.Schema(
  {
    // Expense title/name is required, trimmed, and must be at least 3 characters.
    name: { type: String, required: true, minlength: 3, trim: true },
    // Amount is required numeric value and cannot be negative.
    amount: { type: Number, required: true, min: 0 },
    // Reference to owning user document (foreign-key-like relation).
    user: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Logical expense date defaults to current timestamp when not provided.
    date: { type: Date, default: Date.now },
  },
  // Auto-maintained createdAt/updatedAt metadata.
  { timestamps: true }
);

// Compile schema into Expense model (backed by "expenses" collection).
const Expense = mongoose.model("Expense", expenseSchema);
// Export Expense model for route controllers.
export default Expense;
