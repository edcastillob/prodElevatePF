const { Favorite, User } = require("../../db");

const postFavorite = async (req, res) => {
  console.log(req.body);
  const { id, name, description, salePrice, images, stock, isActive, user } =
    req.body;
  if (!name || !description || !salePrice || !images || !stock || !isActive) {
    return res.status(401).send("Faltan datos");
  }

  try {
    const favorite = await Favorite.create({
      id,
      name,
      description,
      salePrice,
      images,
      stock,
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
