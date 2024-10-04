const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as needed

// API endpoint to create a new user
router.post('/register', async (req, res) => {
  try {
    const { firstName,lastName, email, password,phoneNumber,dateOfBirth,gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({firstName,lastName,email,password,phoneNumber,dateOfBirth,gender});
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// API endpoint for login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and password
    const user = await User.findOne({ email, password });

    if (user) {
      // Return the user details if found
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
