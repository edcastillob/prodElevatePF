const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "sale",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currencyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    { timestamps: false }
  );
};
