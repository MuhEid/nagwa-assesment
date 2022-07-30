const express = require('express');
const Router = express.Router();
const rankController = require('../controllers/rank');

// get score from frontend

// Router.get('/', )

Router.post('/', rankController.calculateRank);

module.exports = Router;
