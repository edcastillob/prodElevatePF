const { DataTypes} = require("sequelize");



module.exports = (sequelize) => {sequelize.define( "comment",
{
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
    )
};