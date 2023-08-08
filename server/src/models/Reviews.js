const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    text: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
  });
};