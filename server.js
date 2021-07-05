"use strict";

const express = require("express");

const HOST = "0.0.0.0";
const PORT = 8080;

// App
const app = express();
const app2 = express();

// set a cookie
app.use((req, res, next) => {
  res.cookie("sigunature", "meeee!", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
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
  res.cookie("3rdParty", "Hi!", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
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
