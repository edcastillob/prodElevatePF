const { Op } = require("sequelize");
const { Product } = require("../../db");

async function postFilterData(req, res) {
  const { minPrice, maxPrice, category, brand, condition } = req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;

  try {
    const filter = {};

    const offset = (page - 1) * pageSize;

    if (minPrice && maxPrice) {
      filter.salePrice = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      filter.salePrice = { [Op.gte]: [minPrice] };
    } else if (maxPrice) {
      filter.salePrice = { [Op.lte]: [maxPrice] };
    }

    if (category) filter.categoryId = category;
    if (brand) filter.brand = { [Op.iLike]: `%${brand}%` };
    if (condition) filter.condition = condition;

    const filterData = await Product.findAll({
      where: filter,
      offset,
      limit: pageSize,
      order: [["id", "DESC"]],
    });
    const totalProduct = await Product.count({ where: filter });
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(filterData);

    return res
      .status(200)
      .json({ data: filterData, currentPage: page, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
}

module.exports = { postFilterData };
