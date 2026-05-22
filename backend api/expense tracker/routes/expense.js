// Import Router for grouping expense endpoints.
import { Router } from "express";
// Import expense controllers (read/create/delete/update handlers).
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
} from "../controllers/expense.js";
// Import auth middleware to protect routes with JWT verification.
import authMiddleware from "../middleware/authMiddleware.js";

// Create router dedicated to expense API endpoints.
const router = Router();

// Route group for collection endpoint: "/".
router
  .route("/")
  // GET / -> list current user's expenses (protected).
  .get(authMiddleware, GET_EXPENSES)
  // POST / -> create an expense for current user (protected).
  .post(authMiddleware, ADD_EXPENSE);

// Route group for single resource endpoint: "/:id".
router
  .route("/:id")
  // DELETE /:id -> remove one expense by id (protected).
  .delete(authMiddleware, DELETE_EXPENSE)
  // PUT /:id -> update one expense by id (protected).
  .put(authMiddleware, UPDATE_EXPENSE);

// Export router so app.js can mount it under /api/expense.
export default router;
