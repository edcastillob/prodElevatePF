const { Category } = require("../../db");
const { Op } = require("sequelize");

async function deleteCategory(req, res) {
    // const { id } = req.params;
    const idsParam = req.params.id;
    let ids;

    if (idsParam.includes(',')) {
      ids = idsParam.split(',').map(Number);
    } else {
      ids = [Number(idsParam)];
    }
  
    try {
      await Category.destroy({
        where: { 
          id: { 
            [Op.in]: ids
          }
        }
      });
      const allCategories = await Category.findAll();
      return res.status(200).json(allCategories);
    } catch (error) {
      return res.status(500).json({ message: "Failed to Delete Category", error });
    }
};

module.exports = {
    deleteCategory
};