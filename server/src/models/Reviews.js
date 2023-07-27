const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('review', { 
    score: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
  }, { timestamps: false });
};