const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG and PNG files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});

// POST /api/profile/update
router.post('/update', upload.single('profilePhoto'), async (req, res) => {
  try {
    const {
      username,
      gender,
      customGender,
      dateOfBirth,
      currentPassword,
      newPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter
    } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    const existingUser = await User.findOne({ username });
    let hashedPassword;

    // If new password provided, validate and hash
    if (newPassword) {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          error: 'Password must be at least 8 characters with 1 number and 1 special character'
        });
      }

      if (existingUser && currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }
      }

      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const profilePhotoPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (existingUser) {
      const updateData = {
        gender,
        dateOfBirth,
        profession,
        addressLine1,
        country,
        state,
        city,
        subscriptionPlan,
        newsletter: newsletter === 'true'
      };

      if (gender === 'Other') updateData.customGender = customGender;
      if (profession === 'Entrepreneur') updateData.companyName = companyName;
      if (hashedPassword) updateData.password = hashedPassword;
      if (profilePhotoPath) updateData.profilePhoto = profilePhotoPath;

      await User.findByIdAndUpdate(existingUser._id, updateData, { new: true });
      return res.json({ message: 'Profile updated successfully' });
    } else {
      // Validate required fields for new user
      if (!newPassword || !profilePhotoPath) {
        return res.status(400).json({
          error: 'Password and profile photo are required for new users'
        });
      }

      const userData = {
        username,
        password: hashedPassword,
        gender,
        dateOfBirth,
        profilePhoto: profilePhotoPath,
        profession,
        addressLine1,
        country,
        state,
        city,
        subscriptionPlan,
        newsletter: newsletter === 'true'
      };

      if (gender === 'Other') userData.customGender = customGender;
      if (profession === 'Entrepreneur') userData.companyName = companyName;

      const newUser = new User(userData);
      await newUser.save();

      return res.json({ message: 'Profile created successfully' });
    }
  } catch (error) {
    console.error('🔥 Profile update error:', error);
    res.status(500).json({ error: 'Server error occurred. Please try again.' });
  }
});

module.exports = router;
