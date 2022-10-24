module.exports = (sequelize, DataTypes) => {

    const facts = sequelize.define("facts", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        feature: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );
    return facts;
};