const express = require('express');
const Router = express.Router();
const rankController = require('../controllers/rank');

Router.post('/', rankController.calculateRank);

module.exports = Router;
