"use strict";

const express = require("express");
const helmet = require("helmet");
const csp = require(`helmet-csp`);
const cookieParser = require("cookie-parser");

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
  res.cookie("sigunature", "meeee!", {
    domain: ".ngrok.io",
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  next();
});
app.use(
  csp({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'", "*.ngrok.io"],
      scriptSrc: ["'self'", "*.ngrok.io"],
      imgSrc: ["'self'", "*.ngrok.io"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);
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
    domain: ".ngrok.io",
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
