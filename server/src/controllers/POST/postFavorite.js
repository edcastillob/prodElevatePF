const { Favorite, User } = require("../../db");

const postFavorite = async (req, res) => {
  const {
    name,
    description,
    purchasePrice,
    salePrice,
    images,
    stock,
    minStock,
    isActive,
    user,
  } = req.body;
  if (
    !name ||
    !description ||
    !purchasePrice ||
    !salePrice ||
    !images ||
    !stock ||
    !minStock ||
    !isActive
  ) {
    return res.status(401).send("Faltan datos");
  }

  try {
    const favorite = await Favorite.create({
      name,
      description,
      purchasePrice,
      salePrice,
      images,
      stock,
      minStock,
      isActive,
    });

    await favorite.addUser(user);

    const allFav = await Favorite.findAll();
    return res.status(201).json(allFav);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { postFavorite };
