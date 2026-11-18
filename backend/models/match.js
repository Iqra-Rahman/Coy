"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.User, {
        foreignKey: "user_one_id",
        as: "userOne",
      });

      Match.belongsTo(models.User, {
        foreignKey: "user_two_id",
        as: "userTwo",
      });
    }
  }

  Match.init(
    {
      user_one_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_two_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Match",
      tableName: "Matches",
      indexes: [
        {
          unique: true,
          fields: ["user_one_id", "user_two_id"],
        },
      ],
    }
  );

  return Match;
};