const { Product } = require("../../db");

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll({
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
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
};