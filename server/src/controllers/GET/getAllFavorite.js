const { User, Favorite } = require("../../db");

const getAllFavorite = async (req, res) => {
  const userEmail = req.query.user;
  console.log(userEmail);
  if (!userEmail) {
    return res.status(401).send("Faltan datos");
  }

  try {
    const searchUser = await User.findOne({ where: { email: userEmail } });

    console.log(searchUser.id);

    const userWithFavorites = await User.findByPk(searchUser.id, {
      include: [{ model: Favorite }],
    });

    if (!userWithFavorites) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const favorites = userWithFavorites.favorites;

    return res.status(200).json(favorites);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", details: error.message });
  }
};

module.exports = { getAllFavorite };
