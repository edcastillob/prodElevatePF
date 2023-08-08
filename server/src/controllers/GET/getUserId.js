const { User } = require("../../db");

async function getUserId(req, res) {
  try {
    const { id } = req.params;
    const userID = await User.findByPk(id);
    // console.log(userID);

    return res.status(200).json(userID);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserId

};
