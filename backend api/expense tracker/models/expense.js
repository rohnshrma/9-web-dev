import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, trim: true },
    amount: { type: Number, required: true, min: 0 },
    addedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
