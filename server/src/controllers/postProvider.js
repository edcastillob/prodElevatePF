const { Provider } = require("../db");

async function postProvider(req, res) {
    try {
        const { name, identification, email, cellPhone, companyPhone, address, isActive } = req.body;
        if (!name || !identification || !email || !cellPhone || !companyPhone || !address) {
            return res.status(401).send("Missing Data");
        };

        const newProvider = await Provider.create({
            name,
            identification,
            email,
            cellPhone,
            companyPhone,
            address,
            isActive
        });

        return res.status(201).json(newProvider);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postProvider
};