const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Category = mongoose.model('Category', categoriesSchema);

module.exports = Category;
