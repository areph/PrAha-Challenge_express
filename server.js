'use strict';

const express = require('express');

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

// use static files
app.use(express.static('public'));

// CORS settings
const corsHandler = () => {
  return (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  };
};
app.use(corsHandler());

// API
app.get('/api/posts', (req, res) => {
  res.json(POSTS);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} ...`);
