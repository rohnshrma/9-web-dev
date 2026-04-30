import express from "express";
import blogRoutes from "./routes/blogRoutes.js";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;

// middlewares

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

// routes
app.use(blogRoutes);

app.listen(PORT, () => console.log("Server started on port :", PORT));
