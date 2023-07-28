const { Category } = require("../../db");

async function deleteCategory(req, res) {
    const { id } = req.params;
  
    try {
      await Category.destroy({ where: { id } });
      const allCategories = await Category.findAll();
      return res.status(200).json(allCategories);
    } catch (error) {
      return res.status(500).json({ message: "Failed to Delete Category", error });
    }
};

module.exports = {
    deleteCategory
};