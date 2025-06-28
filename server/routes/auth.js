// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Check username availability
router.post('/check-username', async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    res.json({ available: !existingUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify current password
router.post('/verify-password', async (req, res) => {
  try {
    const { username, currentPassword } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    res.json({ valid: isMatch });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;