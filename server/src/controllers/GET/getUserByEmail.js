const { User } = require("../../db");

async function getUserByEmail(req, res) {
  try {
  //  console.log("LLegando: ", req.params); 
    const { email } = req.params; 
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log('user ', user)
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserByEmail,
};
