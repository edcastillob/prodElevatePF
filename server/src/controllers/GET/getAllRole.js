const { Role } = require("../../db");

async function getAllRole(req, res) {
    try {
        const role = await Role.findAll({
            attributes: [
                'id',
                'name', 
                'description'
            ],
        });
        
        // console.log(role)
        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRole
};