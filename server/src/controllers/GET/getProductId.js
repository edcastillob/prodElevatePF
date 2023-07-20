const { Product } = require("../../db");

async function getProductId(req, res) {
    try {
        const { id } = req.params;
        console.log("El id es: ", id)
        const productID = await Product.findByPk(id);
        
        return res.status(200).json(productID);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProductId
};