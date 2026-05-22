// Import Mongoose, the ODM used to connect to MongoDB and define schemas/models.
import mongoose from "mongoose";

// Define an async function so we can await the database connection promise.
const connectDB = async () => {
  // Wrap connection logic in try/catch to handle startup failures cleanly.
  try {
    // Connect to MongoDB using the URI stored in environment variables.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log the connected host for quick verification during development/debugging.
    console.log("Connected to DB : ", conn.connection.host);
  } catch (err) {
    // Log a readable failure message plus the original error message.
    console.log("Failed to connect to DB\n", err.message);
    // Exit with non-zero status so deployment systems know startup failed.
    process.exit(1);
  }
};

// Export as default so app.js can call connectDB() during boot.
export default connectDB;
