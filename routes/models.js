const express = require('express');

const getModel = require('../controller/modelsController');

const modelsRouter = express.Router();

modelsRouter.get('/models/:modelName', getModel);

module.exports = modelsRouter;
