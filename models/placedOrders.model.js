const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");
const User = require("./users.model");

const Order = sequelize.define("Orders", {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Order.belongsTo(User, { foreignKey: "user_id" });

module.exports = Order;
