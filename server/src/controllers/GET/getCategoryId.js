const { Category } = require("../../db");

async function getCategoryId(req, res) {
    try {
        const { id } = req.params;
        const categoryID = await Category.findByPk(id);
        console.log(categoryID)
        
        return res.status(200).json(categoryID);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategoryId
};