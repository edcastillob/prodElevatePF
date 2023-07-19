const { Provider } = require("../../db");

async function putProvider(req, res) {
    const providerId = req.params.id;
    const newData = req.body;

    try {
        const provider = await Provider.findOne({
            where: { id: providerId }
        });

        if (!provider) {
            return res.status(404).json({ error: "Provider not Found" })
        };

        await Provider.update(newData, {
            where: { id: providerId }
        });

        const updatedProvider = await Provider.findOne({
            where: { id: providerId }
        });

        return res.status(200).json(updatedProvider);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    putProvider
};