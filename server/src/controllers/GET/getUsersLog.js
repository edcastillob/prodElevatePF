const { User, Role } = require("../../db");

async function getUsersLog(req, res) {
  try {
    const { email } = req.params; 
    const user = await User.findOne({ 
      where: { email },
      include: [{
        model: Role, 
        attributes: ['id']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userWithRoleId = {
      ...user.toJSON(),
      roleId: user.Role ? user.Role.id : null 
    };

    return res.status(200).json(userWithRoleId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
    getUsersLog
};