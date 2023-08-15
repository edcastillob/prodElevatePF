const { Product } = require("../../db");

async function getAllProductsInactive(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  try {
    const totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(totalProduct);

    const offset = (page - 1) * pageSize;

    const products = await Product.findAll({
      where: {
        isActive: false,
      },
      attributes: [
        "id",
        "name",
        "description",
        "salePrice",
        "stock",
        "images",
        "brand",
        "condition",
        "categoryId",
        "isActive",
      ],
      offset,
      limit: pageSize,
      order: [["id", "DESC"]],
    });

    return res
      .status(200)
      .json({ data: products, currentPage: page, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProductsInactive,
};
