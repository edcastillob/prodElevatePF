// const { Product } = require("../../db");

// async function putProduct(req, res) {
//     const productId = req.params.id;
//     const newData = req.body;
//     if (!newData.purchasePrice) {
//         if (typeof newData.purchasePrice === "string") {
//             newData.purchasePrice = parseFloat(newData.purchasePrice);
//         }
//     };

//     if (!newData.salePrice) {
//         if (typeof newData.salePrice === "string") {
//             newData.salePrice = parseFloat(newData.salePrice);
//         }
//     };

//     if (!newData.stock) {
//         if (typeof newData.stock === "string") {
//             newData.stock = parseInt(newData.stock);
//         }
//     };

//     if (!newData.minStock) {
//         if (typeof newData.minStock === "string") {
//             newData.minStock = parseInt(newData.minStock);
//         }
//     };

//     try {
//         const product = await Product.findOne({
//             where: { id: productId }
//         });

//         if (!product) {
//             return res.status(404).json({ error: "Product not Found" })
//         };

//         await Product.update(newData, {
//             where: { id: productId }
//         });

//         const updatedProduct = await Product.findOne({
//             where: { id: productId }
//         });
        
//         return res.status(200).json(updatedProduct);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     putProduct
// };

const { Product } = require("../../db");

async function putProduct(req, res) {
    const productId = req.params.id;
    const newData = req.body;
    console.log(req.body)

    // Convertir campos numéricos de tipo string a números
    if (typeof newData.purchasePrice === "string") {
        newData.purchasePrice = parseFloat(newData.purchasePrice);
    }

    if (typeof newData.salePrice === "string") {
        newData.salePrice = parseFloat(newData.salePrice);
    }

    if (typeof newData.stock === "string") {
        newData.stock = parseInt(newData.stock);
    }

    if (typeof newData.minStock === "string") {
        newData.minStock = parseInt(newData.minStock);
    }

    try {
        const product = await Product.findOne({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ error: "Product not Found" });
        }

        await Product.update(newData, {
            where: { id: productId }
        });

        // Obtener el producto actualizado después de la actualización
        const updatedProduct = await Product.findByPk(productId);

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    putProduct
};
