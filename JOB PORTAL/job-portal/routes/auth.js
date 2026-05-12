import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = Router();

router
  .route("/register")
  .get((req, res) => {
    res.render("auth/register");
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existinguser = await User.findOne({ email });

      if (existinguser) {
        console.log("User already exists with email : ", email);
        return res.redirect("/login");
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hash });

      console.log("User Successfully Registered", user);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/register");
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("auth/login");
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;

      const existinguser = await User.findOne({ email });

      if (!existinguser) {
        console.log("User Doesn't exists with email : ", email);
        return res.redirect("/register");
      }

      const match = await bcrypt.compare(password, existinguser.password);

      if (!match) {
        console.log("Incorrect Password");
        return res.redirect("/login");
      }

      console.log("User Successfully Logged In");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/register");
    }
  });

export default router;
