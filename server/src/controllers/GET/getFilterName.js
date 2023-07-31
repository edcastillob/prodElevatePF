const { Product } = require("../../db");

async function getFilterNameDesc(req, res) {
  try {
    // Realiza la consulta en la base de datos utilizando Sequelize para obtener los datos filtrados
    const datosFiltrados = await Product.findAll({
      order: [["name", "DESC"]],
    });

    // Devuelve los resultados filtrados como respuesta en formato JSON
    res.json(datosFiltrados);
  } catch (error) {
    console.error("Error al filtrar los datos:", error.message);
    res.status(500).json({ error: "Error al obtener los datos filtrados" });
  }
}

async function getFilterNameAsc(req, res) {
  try {
    // Realiza la consulta en la base de datos utilizando Sequelize para obtener los datos filtrados
    const datosFiltrados = await Product.findAll({
      order: [["name", "ASC"]],
    });

    // Devuelve los resultados filtrados como respuesta en formato JSON
    res.json(datosFiltrados);
  } catch (error) {
    console.error("Error al filtrar los datos:", error.message);
    res.status(500).json({ error: "Error al obtener los datos filtrados" });
  }
}

module.exports = {
  getFilterNameAsc,
  getFilterNameDesc,
};
