// Create web server

// import modules
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static file
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/comments", (req, res) => {
  fs.readFile(path.join(__dirname, "comments.json"), (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.post("/comments", (req, res) => {
  const { name, comment } = req.body;
  const newComment = {
    name,
    comment,
  };
  fs.readFile(path.join(__dirname, "comments.json"), (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(
      path.join(__dirname, "comments.json"),
      JSON.stringify(comments),
      (err) => {
        if (err) throw err;
        res.send("success");
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});