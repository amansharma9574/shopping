const Order = require("../models/placedOrders.model");
const User = require("../models/users.model");

const placeOrder = async (req, res) => {
  const { userId, total_price, order_status } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const newOrder = await Order.create({
      user_id: userId,
      total_price,
      order_status: "pending",
    });

    res.status(201).json({
      message: "Order placed!",
      order: {
        id: newOrder.id,
        user_id: newOrder.user_id,
        total_price: newOrder.total_price,
        order_status: newOrder.order_status,
        created_at: newOrder.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while placing the order" });
  }
};

module.exports = { placeOrder };
