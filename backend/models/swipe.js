"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Swipe extends Model {
    static associate(models) {
      Swipe.belongsTo(models.User, {
        foreignKey: "swiper_id",
        as: "swiper",
      });

      Swipe.belongsTo(models.User, {
        foreignKey: "target_id",
        as: "target",
      });
    }
  }

  Swipe.init(
    {
      swiper_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      target_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["like", "pass"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Swipe",
      tableName: "Swipes",
      indexes: [
        {
          unique: true,
          fields: ["swiper_id", "target_id"],
        },
      ],
    }
  );

  return Swipe;
};