const { User } = require("../../db");

async function verifyUser(req, res) {    
    console.log(req.body)
  try {
    
    const { email, password } = req.body; 
    const user = await User.findOne({ where: { email } });
    console.log('user Controller: ', user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }    
    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  verifyUser,
};
