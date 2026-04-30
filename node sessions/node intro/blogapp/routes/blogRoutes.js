import { Router } from "express";
import {
  ADD_BLOG,
  DELETE_BLOG,
  GET_BLOGS,
  GET_COMPOSE,
  GET_HOME,
  UPDATE_BLOG,
} from "../controllers/blogController.js";

const router = Router();

router.route("/").get(GET_HOME);
router.route("/compose").get(GET_COMPOSE).post(ADD_BLOG);
router.route("/blogs").get(GET_BLOGS);
router.route("/blogs/:id").delete(DELETE_BLOG).put(UPDATE_BLOG);

export default router;
