import { v4 as uuidv4 } from "uuid";

var blogs = [];
export const GET_HOME = (req, res) => {
  res.render("Home");
};

export const GET_COMPOSE = (req, res) => {
  res.render("Compose");
};
export const GET_BLOGS = (req, res) => {
  res.render("Blogs", { blogs });
};

export const DELETE_BLOG = (req, res) => {
  const { id } = req.params;
  blogs = blogs.filter((blog) => blog.id !== id);
  res.redirect("/blogs");
};

export const ADD_BLOG = (req, res) => {
  console.log(req.body);
  blogs.push({ ...req.body, id: uuidv4() });

  console.log(blogs);
  res.redirect("/blogs");
};

export const UPDATE_BLOG = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  blogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, title, description } : blog
  );

  res.redirect("/blogs");
};
