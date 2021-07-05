"use strict";

const express = require("express");
const helmet = require("helmet");

const HOST = "0.0.0.0";
const PORT = 8080;

// App
const app = express();
const app2 = express();

// use module
app.use(helmet());

// set a cookie
app.use((req, res, next) => {
  const sigunature = req.cookies.sigunature;
  if (sigunature === undefined) {
    res.cookie("sigunature", "meeee!", { maxAge: 1000, httpOnly: true });
  } else {
    console.log("cookie exists", req.cookies);
  }
  next();
});
// use static files
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(
    `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT} ...`
  )
);

// -------------------------------------------------------------------------------------------
// other express server for 3rd party cookie
app2.get("/file/:name", (req, res, next) => {
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
app2.use(express.static("public"));
app2.listen(8081, () =>
  console.log(
    `Running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${8081} ...`
  )
);
