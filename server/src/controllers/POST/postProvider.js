const { Provider, User } = require("../../db");

async function postProvider(req, res) {
  try {
    const { name, identification, email, numPhone, country, address, password,image} = req.body;
  

    
    const existingUser = await User.findOne({
      where: { email },
    });

    let user;
    if (existingUser) {
      
      user = existingUser;
    } else {
      
      user = await User.create({
        name,
        identification,
        email,
        numPhone,
        address,
        password : "ProviderProdelevate",
        image: ["https://res.cloudinary.com/debskxhfb/image/upload/v1690885045/vecteezy_user-icon-design_8844895_865_rev4hp.png"],
        rol: 'Provider',
      });
    }
    
    
    const newProvider = await Provider.create({
      name,
      identification,
      email,
      numPhone,
      country,
      address,
    });


    return res.status(201).json({ provider: newProvider, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  postProvider,
};
