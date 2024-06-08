const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1h' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      data: user,
      token,
      message: 'User logged in successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error', error: e.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      data: newUser,
      message: 'User signed up successfully',
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error', error: e.message });
  }
};

module.exports = {
  login,
  signup,
};
