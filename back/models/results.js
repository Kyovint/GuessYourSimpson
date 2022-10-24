module.exports = (sequelize, DataTypes) => {

    const results = sequelize.define("results", {
        selection: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondOption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thirdOption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fourthOption: {
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
    return results;
};