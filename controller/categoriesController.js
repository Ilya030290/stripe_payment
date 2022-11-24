const Categories = require('./../models/categories');

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = getCategories;
