const express = require('express');
const app = express();
const wordsRouter = require('./routes/words');
const rankRouter = require('./routes/rank');

app.use(express.json());

// headers to make sure axios sends the request
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// created two endpoints as per instructions
app.use('/words', wordsRouter);
app.use('/rank', rankRouter);
app.use('/', (req, res) => {
  res.send('use the /words for words and /rank for rank');
});

app.listen(3000, (req, res) => {
  console.log('Backend server is running');
});
