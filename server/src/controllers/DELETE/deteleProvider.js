const { Provider } = require("../../db");
const { Op } = require("sequelize");

async function deleteProvider(req, res) {
    // const { id } = req.params;
    // console.log(id, 'id only')
    // const ids = req.params.id.split(',').map(Number);
    
    // ========== //
    // const ids = req.params.id.includes(",") 
    //   ? req.params.id.split(',').map(Number)  // Array de IDs
    //   : [Number(req.params.id)];  // Un solo ID

    // =============== //
    const idsParam = req.params.id;
    let ids;

    if (idsParam.includes(',')) {
      ids = idsParam.split(',').map(Number);
    } else {
      ids = [Number(idsParam)];
    }
    
    console.log(idsParam, 'id prov')
  
    try {
      await Provider.destroy({ 
        where: { 
          id: { 
            [Op.in]: ids
          }
        }
      });
      const allProviders = await Provider.findAll();
      return res.status(200).json(allProviders);
    } catch (error) {
      console.log(error, 'er')
      return res.status(500).json({ message: "Failed to Delete Provider", error });
    }
};

module.exports = {
    deleteProvider
};