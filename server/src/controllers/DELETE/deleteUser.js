const { User } = require("../../db");
const { Op } = require("sequelize");

async function deleteUser(req, res) {
    // const { id } = req.params;
    
    const idsParam = req.params.id;
    let ids;

    if (idsParam.includes(',')) {
      ids = idsParam.split(',');
    } else {
      ids = [idsParam];
    }

    try {
      await User.destroy({
        where: { 
          id: { 
            [Op.in]: ids
          }
        }
      });
      const allUsers = await User.findAll();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json({ message: "Failed to Delete User", error: error.message });
    }
};

module.exports = {
    deleteUser
};