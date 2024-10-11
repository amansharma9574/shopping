const Order = require('../models/placedOrders.model');
const Product = require('../models/products.model');
const User = require('../models/users.model');
const checkout = async (req, res) => {
    const { userId, cartItems } = req.body; 

    try {
  
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let total_price = 0;
        const productIds = cartItems.map(item => item.productId);

        const products = await Product.findAll({
            where: {
                product_id: productIds,
            },
        });

       
        for (const item of cartItems) {
            const product = products.find(p => p.product_id === item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }

            
            product.stock -= item.quantity;
            await product.save();

            
            total_price += product.price * item.quantity;
        }

        // Create a new order
        const newOrder = await Order.create({
            user_id: userId,
            total_price,
            order_status: 'Confirmed',
        });

        res.status(201).json({
            message: 'Checkout successful!',
            order: {
                id: newOrder.order_id,
                user_id: newOrder.user_id,
                total_price: newOrder.total_price,
                order_status: newOrder.status,
                created_at: newOrder.created_at,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during checkout' });
    }
};

module.exports = { checkout };
