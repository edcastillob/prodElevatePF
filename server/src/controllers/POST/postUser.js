const { User } = require("../../db");
const { sendMailNewUser } = require("../MAILER/mailerController");

async function postUser(req, res) {
    try {
        
       
        console.log(req.body)
        const { name, identification, email, images, numPhone, address, country, password } = req.body;
        if (!name || !identification || !email || !images || !numPhone || !address || !country || !password ) {
            return res.status(401).send("Missing Data");
        };
        const image = images; 
        const roleId = '2';       

        const newUser = await User.create({
            name,
            identification,
            email,
            image,
            numPhone,
            address,
            password,
            rol: "User",
            country,

            roleId,
            password
           
        });

        if (newUser) {
          sendMailNewUser(newUser)
        }

        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postUser
};