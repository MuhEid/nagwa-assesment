const express = require('express');
const app = express();
const wordsRouter = require('./routes/words');
const rankRouter = require('./routes/rank');
const { request } = require('express');

app.use(express.json());

app.use('/words', wordsRouter);
app.use('/rank', rankRouter);

// app.listen(request.path, request.method);

app.listen(3000, () => {
  console.log('Backend server is running');
});
