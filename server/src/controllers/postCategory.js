const { Category } = require("../db");

async function postCategory(req, res) {
    try {
        const { name, description, isActive } = req.body;
        if (!name || !description) {
            return res.status(401).send("Missing Data");
        };

        const newCategory = await Category.create({
            name,
            description,
            isActive
        });
        
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postCategory
};