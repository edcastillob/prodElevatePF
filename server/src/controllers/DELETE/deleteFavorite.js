const { Favorite } = require("../../db");

const deleteFavorite = async (req, res) => {
  console.log("req", req.params);
  const { id } = req.params;

  try {
    await Favorite.destroy({ where: { id } });
    const allFavorites = await Favorite.findAll();
    return res.status(201).json(allFavorites);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { deleteFavorite };
