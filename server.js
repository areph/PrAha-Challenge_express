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
// use static files
app.use(express.static("public"));

app.listen(PORT, HOST);
console.log(
  `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT} ...`
);
