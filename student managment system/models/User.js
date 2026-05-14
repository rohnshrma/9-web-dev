import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
      // TODO: Add validation constraints
    },
    email: {
      type: String,
      unique: true
      // TODO: Add validation constraints
    },
    password: {
      type: String
      // TODO: Store hashed password only
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

// TODO: Add schema methods/statics as needed
const User = mongoose.model('User', userSchema);
export default User;
