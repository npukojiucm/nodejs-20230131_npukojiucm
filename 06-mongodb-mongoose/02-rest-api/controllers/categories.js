const mapCategory = require('../mappers/category');
const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();

  ctx.body = {
    categories: categories.map(
        (category) => mapCategory(category),
    ),
  };
};
