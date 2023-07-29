const { Provider } = require("../../db");

async function postProvider(req, res) {  
    // console.log(req.body)  
    try {
        const { name, identification, email, numPhone, country, address } = req.body;
        if (!name || !identification || !email || !numPhone || !country || !address) {
            return res.status(401).send("Missing Data");
        };

        const newProvider = await Provider.create({
            name,
            identification,
            email,
            numPhone,
            country,
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