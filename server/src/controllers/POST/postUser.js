const { User } = require("../../db");

async function postUser(req, res) {
    try {
        const { name, identification, email, images, numPhone, address, password, role } = req.body;
        if (!name || !identification || !email || !images || !numPhone || !address || !password || !role) {
            return res.status(401).send("Missing Data");
        };
        const image = images;
        const roleId = parseInt(role);

        const newUser = await User.create({
            name,
            identification,
            email,
            image,
            numPhone,
            address,
            password,
            roleId
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postUser
};