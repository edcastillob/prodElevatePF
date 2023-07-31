const { Provider } = require("../../db");

async function getProviderId(req, res) {
  try {
    const { id } = req.params;
    const providerID = await Provider.findByPk(id);
    // console.log(providerID);

    return res.status(200).json(providerID);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProviderId,
};
