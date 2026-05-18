import { Router } from "express";
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
} from "../controllers/expense.js";

const router = Router();

router.route("/").get(GET_EXPENSES).post(ADD_EXPENSE);
router.route("/:id").delete(DELETE_EXPENSE).put(UPDATE_EXPENSE);

export default router;
