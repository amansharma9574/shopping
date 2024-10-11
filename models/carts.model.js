const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");
const User = require("./users.model");
const Product = require("./products.model");

const Cart = sequelize.define("Cart", {
  cart_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

Cart.belongsTo(User, { foreignKey: "user_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Cart;
