const express = require('express');
const Router = express.Router();
const wordsController = require('../controllers/words');

Router.get('/', wordsController.getData);

module.exports = Router;
