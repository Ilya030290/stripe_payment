const express = require('express');

const getStartPage = require('./../controller/startController');

const startRouter = express.Router();

startRouter.get('/', getStartPage);

module.exports = startRouter;
