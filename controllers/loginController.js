const User = require('../models/users.model'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
  
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // user by email
    const user = await User.findOne({ where: { email } });

  
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const accessToken = jwt.sign(
      { userId: user.user_id }, 
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '35m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' } 
    );

    
    user.refreshToken = refreshToken;
    await user.save();

    
    res.status(200).json({
      message: "Login successful",
      accessToken,
      
      user: {
        id: user.user_id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
