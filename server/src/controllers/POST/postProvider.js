const { Provider } = require("../../db");

async function postProvider(req, res) {
    try {
        const { name, identification, email, numPhone, address } = req.body;
        if (!name || !identification || !email || !numPhone || !address) {
            return res.status(401).send("Missing Data");
        };

        const newProvider = await Provider.create({
            name,
            identification,
            email,
            numPhone,
            address,
        });

        return res.status(201).json(newProvider);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postProvider
};