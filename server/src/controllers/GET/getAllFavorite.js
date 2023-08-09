const { Favorite, User } = require("../../db");

const getAllFavorite = async (req, res) => {
  const { user } = req.body;

  console.log(user);

  if (!user) {
    return res.status(401).send("Faltan datos");
  }

  try {
    const searchUser = await User.findOne({ where: { email: user } });
    const user = await User.findByPk(searchUser.id, {
      include: {
        model: Favorite,
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(201).json(user.Favorites);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { getAllFavorite };
