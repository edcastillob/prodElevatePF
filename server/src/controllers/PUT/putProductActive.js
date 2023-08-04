const { Product } = require("../../db");

async function putProductActive(req, res) {
  const productId = req.params.id;
  console.log(productId)
  
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not Found" });
    }

    // Establecer el campo isActive a true en el objeto newData
    const newData = {
      isActive: true,
    };

    // Actualizar el campo isActive en la base de datos
    await Product.update(newData, {
      where: { id: productId },
    });

    // Obtener el producto actualizado después de la actualización
    const updatedProduct = await Product.findByPk(productId);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  putProductActive,
};
