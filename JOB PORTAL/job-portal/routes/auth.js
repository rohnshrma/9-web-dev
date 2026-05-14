import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = Router();

router
  .route("/register")
  .get((req, res) => {
    res.render("auth/register", {
      error: req.query.error || "",
    });
  })
  .post(async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.redirect("/register?error=Passwords+do+not+match");
      }

      const existinguser = await User.findOne({ email });

      if (existinguser) {
        console.log("User already exists with email : ", email);
        return res.redirect("/login?error=Account+already+exists");
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hash });

      console.log("User Successfully Registered", user);
      res.redirect("/login");
    } catch (err) {
      console.log(err);
      res.redirect("/register?error=Unable+to+register+right+now");
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("auth/login", {
      error: req.query.error || "",
    });
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login?error=Invalid+email+or+password",
    })
  );

router.route("/logout").get((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
export default router;
