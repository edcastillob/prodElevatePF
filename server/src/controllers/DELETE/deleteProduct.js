const { Product } = require("../../db");

async function deleteProduct(req, res) {
    const { id } = req.params;
  
    try {
      await Product.destroy({ where: { id } });
      const allProducts = await Product.findAll();
      return res.status(200).json(allProducts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to Delete Product", error });
    }
};

module.exports = {
    deleteProduct
};