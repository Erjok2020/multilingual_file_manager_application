const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://username:password@localhost:3306/database_name');

const File = sequelize.define('File', {
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { File };
