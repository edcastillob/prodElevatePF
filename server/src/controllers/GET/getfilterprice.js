const { Product } = require("../../db");

async function getFilterPriceMajor(req, res) {
  try {
    // Realiza la consulta en la base de datos utilizando Sequelize para obtener los datos filtrados
    const datosFiltrados = await Product.findAll({
      order: [["salePrice", "DESC"]],
    });

    // Devuelve los resultados filtrados como respuesta en formato JSON
    res.json(datosFiltrados);
  } catch (error) {
    console.error("Error al filtrar los datos:", error.message);
    res.status(500).json({ error: "Error al obtener los datos filtrados" });
  }
}

async function getFilterPriceMinor(req, res) {
  try {
    // Realiza la consulta en la base de datos utilizando Sequelize para obtener los datos filtrados
    const datosFiltrados = await Product.findAll({
      order: [["salePrice", "ASC"]],
    });

    // Devuelve los resultados filtrados como respuesta en formato JSON
    res.json(datosFiltrados);
  } catch (error) {
    console.error("Error al filtrar los datos:", error.message);
    res.status(500).json({ error: "Error al obtener los datos filtrados" });
  }
}

module.exports = {
  getFilterPriceMajor,
  getFilterPriceMinor,
};
