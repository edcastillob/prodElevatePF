const { Provider } = require("../../db");

async function getAllProviders(req, res) {
    try {
        const providers = await Provider.findAll({
            attributes: [
                'id',
                'name', 
                'identification', 
                'email',  
                'numPhone',
                'address', 
                'isActive',
                'country'
            ],
        });
        console.log(providers)
        return res.status(200).json(providers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProviders
};