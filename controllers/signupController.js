const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password, name } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, password, and email" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const accessToken = jwt.sign(
      { userId: username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "35m" }
    );

    const refreshToken = jwt.sign(
      { userId: username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      refreshToken,
    });

    res.status(201).json({
      message: "User registered!",
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        accessToken,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup };
