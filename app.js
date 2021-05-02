const express = require("express");
const fs = require("fs");
const { join } = require("path");
const marked = require("marked");

const app = express();

const articles = [
  {
    title: "Welcome",
    id: "welcome.md",
    desc: "A short welcome to this blog!",
    path: "articles/welcome.md",
  },
];

app.set("view engine", "ejs");

app.listen(9002);

app.get("/", (req, res) => {
  res.render("main", { articles });
});

const articlesarr = fs.readdirSync(join(__dirname, "articles"));

articlesarr.forEach((article) => {
  app.get(`/articles/${article}`, (req, res) => {
    const md = fs.readFileSync(`./articles/${article}`);
    const content = marked(md.toString());
    const result = articles.filter((a) => {
      return a.id === article.toString();
    });
    res.render("article", { content: content, title: result[0].title });
  });
});
