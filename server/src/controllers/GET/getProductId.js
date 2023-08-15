const { Product, Provider } = require("../../db");

async function getProductId(req, res) {
    try {
        const { id } = req.params;
        const productID = await Product.findByPk(id, {
            include:  {model: Provider }
        });
        // console.log(productID)
        
        return res.status(200).json(productID);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProductId
};