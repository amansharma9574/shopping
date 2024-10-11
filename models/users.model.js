const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING(500),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;
