const { Product } = require("../../db");
const { Op } = require("sequelize");

async function deleteProduct(req, res) {
    // const { id } = req.params;
    const idsParam = req.params.id;
    let ids;

    if (idsParam.includes(',')) {
      ids = idsParam.split(',');
    } else {
      ids = [idsParam];
    }
  
    try {
      await Product.destroy({
        where: { 
          id: { 
            [Op.in]: ids
          }
        }
      });
      const allProducts = await Product.findAll();
      return res.status(200).json(allProducts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to Delete Product", error });
    }
};

module.exports = {
    deleteProduct
};