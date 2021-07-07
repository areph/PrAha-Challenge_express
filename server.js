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
const isPreflight = (req) => {
  const isHTTPOptions = req.method === 'OPTIONS';
  const hasOriginHeader = req.headers['origin'];
  const hasRequestMethod = req.headers['access-control-request-method'];
  return isHTTPOptions && hasOriginHeader && hasRequestMethod;
};

const corsHandler = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  if (isPreflight(req)) {
    console.log('-- Receive Preflight Request --');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'X-Super-Header');
    res.status(204).end();
    return;
  }
  next();
};
app.use(corsHandler);

// API
app.post('/api/posts/:id', (req, res) => {
  const id = req.params['id'];
  delete POSTS[id];
  res.status(204).end();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT} ...`);
