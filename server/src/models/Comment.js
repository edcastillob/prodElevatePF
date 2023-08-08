const { DataTypes} = require("sequelize");



module.exports = (sequelize) => {sequelize.define( "comment",
{
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  replies: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    defaultValue: [],
  },
}

    )
};