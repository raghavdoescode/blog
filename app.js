const express = require("express");
const fs = require("fs");
const { join } = require("path");
const marked = require("marked");

const app = express();

app.use("/public", express.static("public"));

const articles = [
  {
    title: "Welcome",
    id: "welcome.md",
    desc: "A short welcome to this blog!",
    path: "articles/welcome.md",
    date: "2021-5-2",
  },
  {
    title: "Getting started with Docker",
    id: "docker.md",
    desc: "A short intro to Docker",
    path: "articles/docker.md",
    date: "2021-5-3",
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
    res.render("article", {
      content: content,
      title: result[0].title,
      date: result[0].date,
      desc: result[0].desc,
    });
  });
});
