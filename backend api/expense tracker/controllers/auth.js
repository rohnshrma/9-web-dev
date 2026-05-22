// Import the User model for user-related database operations.
import User from "../models/user.js";
// Import bcrypt helpers for secure password hashing/comparison.
import bcrypt from "bcryptjs";
// Import jsonwebtoken for creating signed login tokens.
import jwt from "jsonwebtoken";

// Controller: register a new user account.
export const REGISTER = async (req, res) => {
  // Use try/catch so unexpected errors return a controlled 500 response.
  try {
    // Read expected fields from request body.
    const { name, email, password } = req.body;
    // Check whether a user with the same email already exists.
    const existingUser = await User.findOne({ email });

    // If duplicate email exists, stop and return a client error.
    if (existingUser) {
      return res.status(400).json({
        // Keep payload shape consistent by returning null data on failure.
        data: null,
        // Human-readable status string used by frontend/UI.
        status: "Failed",
        // Message explains why registration was rejected.
        message: "Email Already Exists",
      });
    }

    // Hash the plain password with salt rounds = 10 before storing in DB.
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user document with hashed password (never store plain text passwords).
    const user = await User.create({ name, email, password: hashedPassword });

    // Return HTTP 201 Created with created user object.
    res.status(201).json({
      // Include created user data in response.
      data: user,
      // Success message for UI feedback.
      message: "User Registered Successfully",
      // Success marker.
      status: "Success",
    });
  } catch (err) {
    // Any unhandled failure returns generic 500 to avoid exposing internal details.
    res.status(500).json({
      data: null,
      status: "Failed",
      message: "Failed to Register User",
    });
  }
};

// Controller: authenticate an existing user and issue JWT token.
export const LOGIN = async (req, res) => {
  // Protect login flow with try/catch for controlled server errors.
  try {
    // Extract login credentials from request body.
    const { email, password } = req.body;

    // Find user by email.
    const user = await User.findOne({ email });

    // If user is missing, reject authentication.
    if (!user) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid Email", data: null });
    }

    // Compare provided plain password with stored bcrypt hash.
    const isMatch = await bcrypt.compare(password, user.password);

    // If password is incorrect, reject authentication.
    if (!isMatch)
      return res
        .status(400)
        .json({ status: "Failed", message: "Invalid Password", data: null });

    // Create a JWT containing user id; signed with secret and 7-day expiration.
    const token = jwt.sign(
      {
        // Minimal payload: include only identifier needed for authorization checks.
        id: user._id,
      },
      // Use env secret when set; fallback helps local testing but should be replaced in production.
      process.env.JWT_SECRET || "helloworld",
      // Token expiry enforces periodic re-authentication.
      { expiresIn: "7d" }
    );

    // Return successful auth response including user data and token.
    res.status(200).json({
      data: { user, token },
      message: "User LoggedIn Successfully",
      status: "Success",
    });
  } catch (err) {
    // Unexpected errors in login flow return 500.
    res.status(500).json({
      data: null,
      status: "Failed",
      message: "Failed to Login User",
    });
  }
};
