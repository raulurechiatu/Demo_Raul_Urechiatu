const http = require('http');
const express = require('express');
const mongo = require('./mongo');

var app = express();
const hostname = '0.0.0.0';
const port = 8000;

app.get('')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});