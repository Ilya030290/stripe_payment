const mongoose = require('mongoose');

const shopItemsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  modelFile: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ShopItem = mongoose.model('ShopItem', shopItemsSchema);

module.exports = ShopItem;
