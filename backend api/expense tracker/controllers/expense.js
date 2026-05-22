// Import Expense model for CRUD operations on expenses collection.
import Expense from "../models/expense.js";

// Controller: fetch all expenses that belong to currently authenticated user.
export const GET_EXPENSES = async (req, res) => {
  // Use try/catch to handle DB/query errors gracefully.
  try {
    // Query expenses filtered by user id and sort newest first.
    const expenses = await Expense.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    // Return fetched data with standard success response structure.
    res.status(200).json({
      data: expenses,
      message: "Expenses Fetched Successfully",
      status: "Success",
    });
  } catch (err) {
    // Return 500 and include error message for debugging.
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};

// Controller: create a new expense for the authenticated user.
export const ADD_EXPENSE = async (req, res) => {
  // Wrap logic in try/catch to avoid crashing on runtime or DB errors.
  try {
    // Read expected fields from incoming JSON payload.
    const { name, amount } = req.body;

    // Validate required fields and basic business rules before DB write.
    if (!name || name.length < 3 || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Name and Amount are invalid",
        data: null,
        status: "Failed",
      });
    }

    // Log authenticated user context (useful while debugging auth wiring).
    console.log("REQ USER =>", req.user);
    // Create expense document and associate it with current user id.
    const newExpense = await Expense.create({
      name,
      amount,
      user: req.user.id,
    });

    // Return HTTP 201 Created with newly created expense document.
    res.status(201).json({
      data: newExpense,
      message: "Expense Added Successfully",
      status: "Success",
    });
  } catch (err) {
    // Handle failures with a standard error payload.
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};

// Controller: delete one expense by id.
export const DELETE_EXPENSE = async (req, res) => {
  // Use try/catch for robust error handling around DB operations.
  try {
    // Read route parameter /:id.
    const { id } = req.params;
    // Check if expense exists before attempting delete.
    const expense = await Expense.findById(id);

    // If no matching expense, return 404 Not Found.
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        data: null,
        status: "Failed",
      });
    }

    // Delete the expense document by id.
    await Expense.findByIdAndDelete(id);

    // Return success response (no data payload needed after deletion).
    res.status(200).json({
      data: null,
      message: "Expense Deleted Successfully",
      status: "Success",
    });
  } catch (err) {
    // Return server error for invalid ids or database failures.
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};

// Controller: update an existing expense by id.
export const UPDATE_EXPENSE = async (req, res) => {
  // Catch runtime/DB errors and convert to HTTP responses.
  try {
    // Read target expense id from URL.
    const { id } = req.params;
    // Read updated values from request body.
    const { name, amount } = req.body;

    // Fetch expense to confirm it exists and get mutable document instance.
    const expense = await Expense.findById(id);

    // If expense does not exist, return 404.
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        data: null,
        status: "Failed",
      });
    }

    // Validate updated fields using same rules as create flow.
    if (!name || name.length < 3 || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Name and Amount are invalid",
        data: null,
        status: "Failed",
      });
    }

    // Mutate the loaded document fields.
    expense.name = name;
    expense.amount = amount;

    // Persist updates to database.
    await expense.save();

    // Return updated document.
    res.status(201).json({
      data: expense,
      message: "Expense Updated Successfully",
      status: "Success",
    });
  } catch (err) {
    // Handle any failure with status 500 response.
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};
