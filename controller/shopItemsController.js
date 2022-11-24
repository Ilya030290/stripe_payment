const mongoose = require('mongoose');
const ShopItem = require('./../models/shopItems');
const Categories = require('../models/categories');
const Brand = require('./../models/brand');

const getShopItems = async (req, res) => {
  try {
    let sort = req.query.sort || 'not selected';
    let brand = req.query.brand || 'All';
    let category = req.query.category || 'not selected';

    let brandOptions = [];
    let brands = await Brand.find();
    brands.forEach(brand => brandOptions.push(brand.name));

    let categoryOptions = [];
    let categories = await Categories.find();
    categories.forEach(category => categoryOptions.push(category.name));

    (brand === 'All') ? (brand = [...brandOptions]) : (brand = req.query.brand.split(','));
    (category === 'not selected') ? (category = [...categoryOptions]) : (category = req.query.category.split(','));
    req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = 'asc';
    }

    const shopItems = await ShopItem.find()
      .where('brand')
      .in([...brand])
      .where('category')
      .in([...category])
      .sort(sortBy)
    res.status(200).json(shopItems);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getShopItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`The id ${id} is not valid`);
  }
  try {
    const shopItem = await ShopItem.findById(id);
    res.status(200).json(shopItem);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getShopItems, getShopItem };
