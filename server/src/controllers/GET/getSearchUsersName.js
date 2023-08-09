const { Op } = require("sequelize");
const { User } = require("../../db");

async function getSearchUsersName(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  const name = req.query.name;
  console.log(name);
  try {
    const totalProduct = await User.count();
    const totalPages = Math.ceil(totalProduct / pageSize);
    console.log(totalProduct);

    const offset = (page - 1) * pageSize;

    if (name) {
      const users = await User.findAll({
        where: {
          isActive: true,
          name: { [Op.iLike]: `%${name}%` },
        },
        attributes: [
          "id",
          "name",
          "identification",
          "email",
          "image",
          "numPhone",
          "address",
          "country",
          "isActive",
        ],
        offset,
        limit: pageSize,
        order: [["name", "ASC"]],
      });

      console.log(users);

      return res.status(200).json(users);
    } else {
      const users = await User.findAll();

      return res.status(200).json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getSearchUsersName };
