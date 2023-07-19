const { User } = require("../../db");

async function putUser(req, res) {
    const userId = req.params.id;
    const newData = req.body;

    try {
        const user = await User.findOne({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: "User not Found" })
        };

        await User.update(newData, {
            where: { id: userId }
        });

        const updatedUser = await User.findOne({
            where: { id: userId }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    putUser
};