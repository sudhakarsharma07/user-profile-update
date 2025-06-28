// server/models/User.js
const mongoose = require('mongoose');

// Update User schema in server/models/User.js:

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
    validate: {
      validator: function(v) {
        return !/\s/.test(v);
      },
      message: 'Username cannot contain spaces'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  customGender: {
    type: String,
    required: function() {
      return this.gender === 'Other';
    }
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true,
    enum: ['Student', 'Developer', 'Entrepreneur']
  },
  companyName: {
    type: String,
    required: function() {
      return this.profession === 'Entrepreneur';
    }
  },
  addressLine1: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  subscriptionPlan: {
    type: String,
    required: true,
    enum: ['Basic', 'Pro', 'Enterprise']
  },
  newsletter: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);