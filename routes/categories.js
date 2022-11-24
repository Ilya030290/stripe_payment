const express = require('express');

const getCategories = require('./../controller/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.get('/categories', getCategories);

module.exports = categoriesRouter;
