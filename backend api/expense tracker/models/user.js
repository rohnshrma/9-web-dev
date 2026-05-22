// Import Mongoose to define schema and model for user documents.
import mongoose from "mongoose";

// Define user schema: structure + validation rules for each user document.
const userSchema = new mongoose.Schema(
  {
    // User display name is required.
    name: { type: String, required: true },
    // Email is required and unique to prevent duplicate accounts.
    email: { type: String, required: true, unique: true },
    // Password is required (stored as bcrypt hash, not plain text).
    password: { type: String, required: true },
  },
  // Auto-add createdAt and updatedAt timestamps.
  { timestamps: true }
);

// Compile schema into a model class mapped to "users" collection.
const User = mongoose.model("User", userSchema);

// Export model for use in controllers and other modules.
export default User;
