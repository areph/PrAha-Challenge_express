'use strict';

const express = require('express');

const HOST = '0.0.0.0';
const PORT = 8080;

// App
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('{text: hello world}');
});

app.post('/', (req, res) => {
  if (req.get('Content-Type') === "application/json") {
    res.send(req.body);
  }
  res.sendStatus(400);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} ...`);
