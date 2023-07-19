const { Role } = require("../../db");

async function postRole(req, res) {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(401).send("Missing Data");
        };

        const newRole = await Role.create({
            name,
            description
        });
        
        return res.status(201).json(newRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postRole
};