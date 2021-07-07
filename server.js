'use strict';

const express = require('express');
const helmet = require('helmet');

const HOST = '0.0.0.0';
const PORT = 8080;

// Blog posts
const POSTS = {
  1: { post: 'This is the first blog post.' },
  2: { post: 'This is the second blog post.' },
  3: { post: 'This is the third blog post.' },
};

// App
const app = express();

// use module
app.use(helmet());
app.use(express.json());

app.get('/api/posts', (req, res) => {
  res.json(POSTS);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} ...`);
