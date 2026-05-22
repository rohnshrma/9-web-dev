// Import Express Router factory for modular route definitions.
import { Router } from "express";
// Import authentication controllers that implement route logic.
import { LOGIN, REGISTER } from "../controllers/auth.js";
// Create isolated router instance for auth endpoints.
const router = Router();

// Define POST /register endpoint and map it to REGISTER controller.
router.route("/register").post(REGISTER);
// Define POST /login endpoint and map it to LOGIN controller.
router.route("/login").post(LOGIN);

// Export router so app.js can mount it under /api/auth.
export default router;
