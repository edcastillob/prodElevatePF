const { Op } = require("sequelize");
const { Product } = require("../../db");

async function postFilterData(req, res) {
  const { minPrice, maxPrice, category, brand, condition } = req.body;

  try {
    const filter = {};

    if (minPrice && maxPrice) {
      filter.salePrice = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      filter.salePrice = { [Op.gte]: [minPrice] };
    } else if (maxPrice) {
      filter.salePrice = { [Op.lte]: [maxPrice] };
    }

    if (category) filter.categoryId = category;
    if (brand) filter.brand = brand;
    if (condition) filter.condition = condition;
    console.log(brand);

    const filterData = await Product.findAll({ where: filter });
    console.log(filterData);

    return res.status(200).json(filterData);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
}

module.exports = { postFilterData };
