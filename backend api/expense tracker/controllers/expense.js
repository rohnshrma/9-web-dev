import Expense from "../models/expense.js";

export const GET_EXPENSES = async (req, res) => {
  try {
    const expenses = await Expense.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      data: expenses,
      message: "Expenses Fetched Successfully",
      status: "Success",
    });
  } catch (err) {
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};

export const ADD_EXPENSE = async (req, res) => {
  try {
    const { name, amount } = req.body;

    if (!name || name.length < 3 || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Name and Amount are invalid",
        data: null,
        status: "Failed",
      });
    }

    const newExpense = await Expense.create({
      name,
      amount,
    });

    res.status(201).json({
      data: newExpense,
      message: "Expense Added Successfully",
      status: "Success",
    });
  } catch (err) {
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};

export const DELETE_EXPENSE = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        data: null,
        status: "Failed",
      });
    }

    await Expense.findByIdAndDelete(id);

    res.status(200).json({
      data: null,
      message: "Expense Deleted Successfully",
      status: "Success",
    });
  } catch (err) {
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};

export const UPDATE_EXPENSE = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        data: null,
        status: "Failed",
      });
    }

    if (!name || name.length < 3 || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Name and Amount are invalid",
        data: null,
        status: "Failed",
      });
    }

    expense.name = name;
    expense.amount = amount;

    await expense.save();

    res.status(201).json({
      data: expense,
      message: "Expense Updated Successfully",
      status: "Success",
    });
  } catch (err) {
    res
      .status(500)
      .json({ data: null, message: err.message, status: "Failed" });
  }
};
