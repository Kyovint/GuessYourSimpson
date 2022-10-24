module.exports = (sequelize, DataTypes) => {

    const names = sequelize.define("names", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );
    return names;
};