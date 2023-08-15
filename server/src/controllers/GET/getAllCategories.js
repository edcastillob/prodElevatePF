const { Category } = require("../../db");

async function getAllCategories(req, res) {
    try {
        const categories = await Category.findAll({
            attributes: [
                'id',
                'name', 
                'description', 
                'isActive'
            ],
        });
        
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategories
};