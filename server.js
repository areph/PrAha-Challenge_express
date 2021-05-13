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
  res.send(req.body);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} ...`);
