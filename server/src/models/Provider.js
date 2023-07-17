const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('provider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true
    },
    cellPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, { timestamps: false });
};