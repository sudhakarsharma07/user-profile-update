// server/models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  countries: [{
    name: String,
    states: [{
      name: String,
      cities: [String]
    }]
  }]
});

module.exports = mongoose.model('Location', locationSchema);