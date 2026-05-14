import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, cb) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return cb(null, false, { message: "User not found" });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return cb(null, false, {
              message: "Invalid Password",
            });
          }

          return cb(null, user, {
            message: "Logged In",
          });
        } catch (err) {
          return cb(err);
        }
      }
    )
  );
};

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

export default initializePassport;
