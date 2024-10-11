const User = require('../models/users.model');

const logout = async (req, res) => {
    const { userId } = req.body; 

    try {
    
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

module.exports = { logout };
