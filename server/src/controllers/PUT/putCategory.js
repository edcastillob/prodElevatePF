const { Category } = require("../../db");

async function putCategory(req, res) {
    const categoryId = req.params.id;
    const newData = req.body;

    try {
        const category = await Category.findOne({
            where: { id: categoryId }
        });

        if (!category) {
            return res.status(404).json({ error: "Category not Found" })
        };

        await Category.update(newData, {
            where: { id: categoryId }
        });

        const updatedCategory = await Category.findOne({
            where: { id: categoryId }
        });

        return res.status(200).json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    putCategory
};