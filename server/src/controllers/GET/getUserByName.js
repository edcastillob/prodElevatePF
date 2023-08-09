const { User } = require("../../db");

async function getUserByName(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  try {
    const totalProduct = await User.count();
    const totalPages = Math.ceil(totalProduct / pageSize);

    const offset = (page - 1) * pageSize;

    const users = await User.findAll({
      where: {
        isActive: true,
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
      order: [["name", "DESC"]],
    });

    return res
      .status(200)
      .json({ data: users, currentPage: page, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserByName,
};
