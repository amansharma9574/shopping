const Order = require('../models/order.model');
const User = require('../models/users.model');

const getOrders = async (req, res) => {
    try {
        const { userid } = req.body;
         

        const orders = await Order.findAll({
            where: { user_id: userid },
            include: [{ model: User, attributes: ['username', 'email'] }], 
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json({
            message: 'Orders list',
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getOrders };
