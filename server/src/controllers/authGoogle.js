const { User } = require("../db");

const checkEmail = async (req, res) => {
//   console.log('desde check email: ', req.body);
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
    //   return console.log('El email existe');
    } else {
    //   console.log('El email no existe');
      const { displayName, uid, email, photoURL, phoneNumber } = req.body;

      const name = displayName;
      const identification = uid;
      const image = [photoURL];
      const numPhone = phoneNumber || '000-0000'; 
      const address = 'Update Address';
      const country = 'Update Country';
      const password = '123456';
      const roleId = '2';

      const newUser = await User.create({
        name,
        identification,
        email,
        image,
        numPhone,
        address,
        country,
        roleId,
        password,
      });

      return console.log('El email NO existe. Usuario registrado:', newUser.toJSON());
    }
  } catch (error) {
    // console.error('Error checking email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  checkEmail,
};
