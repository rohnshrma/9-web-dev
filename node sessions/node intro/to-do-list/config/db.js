import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/9-tdl-db");
    console.log("DB CONNECTED =>", conn.connection.host);
  } catch (err) {
    console.log("Failed to connect to DB");
    process.exit(1);
  }
};

export default connectDB;
