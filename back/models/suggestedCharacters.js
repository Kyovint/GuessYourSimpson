module.exports = (sequelize, DataTypes) => {

    const suggestedCharacters = sequelize.define("suggestedCharacters", {
        idClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idAudit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idResults: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        updatedAt: false,
    }
    );

    return suggestedCharacters;
};