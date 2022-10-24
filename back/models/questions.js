module.exports = (sequelize, DataTypes) => {

    const questions = sequelize.define("questions", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Type: {
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
    return questions;
};