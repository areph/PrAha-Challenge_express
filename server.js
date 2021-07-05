"use strict";

const express = require("express");
const helmet = require("helmet");

const HOST = "0.0.0.0";
const PORT = 8080;

// App
const app = express();

// use module
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set a cookie
app.use((req, res, next) => {
  const sigunature = req.cookies.sigunature;
  if (sigunature === undefined) {
    res.cookie("sigunature", "meeee!", { maxAge: 1000, httpOnly: true });
  } else {
    console.log("cookie exists");
  }
  next();
});
// use static files
app.use(express.static("public"));

app.get("/file/:name", (req, res, next) => {
  const fileName = req.params.name;
  const options = {
    // root: path.join(__dirname, 'public'),
    root: __dirname + "/public",
    dotfiles: "deny",
    headers: {},
  };
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent", fileName);
    }
  });
});

app.listen(PORT, HOST);
console.log(
  `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT} ...`
);
