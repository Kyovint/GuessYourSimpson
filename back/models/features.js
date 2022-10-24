module.exports = (sequelize, DataTypes) => {

    const features = sequelize.define("features", {
        feature: {
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
    return features;
};