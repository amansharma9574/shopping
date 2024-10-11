const Cart = require('../models/carts.model');
const User = require('../models/users.model'); 
const Product = require('../models/products.model');

const addToCart = async (req, res) => {
    const { userid, productId, quantity } = req.body; 
    try {
        // user exists
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // product exists
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        
        const existingItem = await Cart.findOne({
            where: { user_id: userid, product_id: productId },
        });

        if (existingItem) {
        
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({ message: 'Item quantity updated in cart', cartItem: existingItem });
        }

        
        const newCartItem = await Cart.create({
            user_id: userid,
            product_id: productId,
            quantity,
        });

        res.status(201).json({
            message: 'Item added!',
            cartItem: newCartItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while adding item to cart' });
    }
};

module.exports = { addToCart };
