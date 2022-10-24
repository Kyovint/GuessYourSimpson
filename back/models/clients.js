module.exports = (sequelize, DataTypes) => {

    const clients = sequelize.define("clients", {
        USERNAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PASSWORD: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );
    return clients;
};