const express = require('express');
const app = express();
const wordsRouter = require('./routes/words');
const rankRouter = require('./routes/rank');
const { request } = require('express');

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/words', wordsRouter);
app.use('/rank', rankRouter);

// app.listen(request.path, request.method);

app.listen(3000, (req, res) => {
  console.log('Backend server is running');
});
