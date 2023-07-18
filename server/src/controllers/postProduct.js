const { Product, Provider } = require("../db");

async function postProduct(req, res) {
    try {
        const { name, category, description, images, provider, isActive } = req.body;
        let { purchasePrice, salePrice, stock, minimunStock } = req.body;
        if (!name || !category || !description || !purchasePrice || !salePrice || !images || !provider) {
            return res.status(401).send("Missing Data");
        } 
        purchasePrice ? purchasePrice = parseInt(purchasePrice) : purchasePrice = 0;
        salePrice ? salePrice = parseInt(salePrice) : salePrice = 0;
        stock ? stock = parseInt(stock) : stock = 0;
        minimunStock ? minimunStock = parseInt(minimunStock) : minimunStock = 0;

        let minStock = minimunStock;
        let categoryId = parseInt(category);

        const product = await Product.create({
            name,
            description,
            purchasePrice,
            salePrice,
            images,
            stock,
            minStock,
            isActive,
            categoryId
        });

        for (const providerId of provider) {
            const providerInstance = await Provider.findByPk(providerId);
            if (providerInstance) {
                await providerInstance.addProduct(product);
            }
        }

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postProduct
};