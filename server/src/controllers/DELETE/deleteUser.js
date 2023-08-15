const { User } = require("../../db");

async function deleteUser(req, res) {
    const { id } = req.params;
  
    try {
      await User.destroy({ where: { id } });
      const allUsers = await User.findAll();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json({ message: "Failed to Delete User", error });
    }
};

module.exports = {
    deleteUser
};