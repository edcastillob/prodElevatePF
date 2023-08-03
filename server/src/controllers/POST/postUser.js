const { User } = require("../../db");

async function postUser(req, res) {
    try {
        
       
        console.log(req.body)
        const { name, identification, email, images, numPhone, address, password } = req.body;
        if (!name || !identification || !email || !images || !numPhone || !address || !password ) {
            return res.status(401).send("Missing Data");
        };
        const image = images;        

        const newUser = await User.create({
            name,
            identification,
            email,
            image,
            numPhone,
            address,
            password,
            rol: "User"
           
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postUser
};