const express = require('express');

const {
  getShopItems,
  getShopItem,
} = require('./../controller/shopItemsController');

const shopItemsRouter = express.Router();

shopItemsRouter.get('/shop-items', getShopItems);
shopItemsRouter.get('/shop-items/:id', getShopItem);

module.exports = shopItemsRouter;
