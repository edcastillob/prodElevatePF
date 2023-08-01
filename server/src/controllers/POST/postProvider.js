const { Provider, User } = require("../../db");

async function postProvider(req, res) {
  try {
    const { name, identification, email, numPhone, country, address, password,image} = req.body;
  

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({
      where: { email },
    });

    let user;
    if (existingUser) {
      // Si ya existe un usuario con el mismo correo electrónico, usarlo
      user = existingUser;
    } else {
      // Si no, crear un nuevo usuario con los datos proporcionados
      user = await User.create({
        name,
        identification,
        email,
        numPhone,
        address,
        password : "ProviderProdelevate",
        image: ["https://res.cloudinary.com/debskxhfb/image/upload/v1690885045/vecteezy_user-icon-design_8844895_865_rev4hp.png"]
      });
    }

    // Crear el proveedor y asociarlo al usuario creado o existente
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
