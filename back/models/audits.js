module.exports = (sequelize, DataTypes) => {

    const audits = sequelize.define("audits", {
        idClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        updatedAt: false,
    }
    );

    return audits;
};