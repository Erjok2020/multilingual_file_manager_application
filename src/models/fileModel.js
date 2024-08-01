module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    File.associate = (models) => {
        File.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    };

    return File;
};
