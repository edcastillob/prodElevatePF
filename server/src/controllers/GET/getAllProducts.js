const { Op } = require("sequelize");
const { Product } = require("../../db");

async function getAllProducts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  const name = req.query.name;
  try {
    const totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(totalProduct);

    const offset = (page - 1) * pageSize;

    if (name) {
      const products = await Product.findAll({
        where: {
          isActive: true,
          name: { [Op.iLike]: `%${name}%` },
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
        order: [["name", "ASC"]],
      });

      return res
        .status(200)
        .json({ data: products, currentPage: page, totalPages: totalPages });
    }

    const products = await Product.findAll({
      where: {
        isActive: true,
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

async function getAllProductsByName(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  try {
    const totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(totalProduct);

    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({
      where: {
        isActive: true,
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
      order: [["name", "ASC"]],
    });

    return res
      .status(200)
      .json({ data: products, currentPage: page, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllProductsHighestPrice(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  try {
    const totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(totalProduct);

    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({
      where: {
        isActive: true,
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
      order: [["salePrice", "DESC"]],
    });

    return res
      .status(200)
      .json({ data: products, currentPage: page, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllProductsLowestPrice(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  try {
    const totalProduct = await Product.count();
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(totalProduct);

    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({
      where: {
        isActive: true,
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
      order: [["salePrice", "ASC"]],
    });

    return res
      .status(200)
      .json({ data: products, currentPage: page, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getAllProductsByName,
  getAllProductsHighestPrice,
  getAllProductsLowestPrice,
};
