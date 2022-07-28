const express = require('express');
const app = express();
const wordsRouter = require('./routes/words');

app.use(express.json());
app.use('/words', wordsRouter);
app.listen(3000, () => {
  console.log('horrrnnsd');
});
