// server/routes/location.js
const express = require('express');
const router = express.Router();

// Sample location data - In production, this would come from database
const locationData = {
  countries: [
    {
      name: 'India',
      states: [
        {
          name: 'Delhi',
          cities: ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini']
        },
        {
          name: 'Maharashtra',
          cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik']
        },
        {
          name: 'Karnataka',
          cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore']
        }
      ]
    },
    {
      name: 'United States',
      states: [
        {
          name: 'California',
          cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento']
        },
        {
          name: 'New York',
          cities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse']
        },
        {
          name: 'Texas',
          cities: ['Houston', 'Dallas', 'Austin', 'San Antonio']
        }
      ]
    },
    {
      name: 'United Kingdom',
      states: [
        {
          name: 'England',
          cities: ['London', 'Manchester', 'Birmingham', 'Liverpool']
        },
        {
          name: 'Scotland',
          cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee']
        }
      ]
    }
  ]
};

// Get all countries
router.get('/countries', (req, res) => {
  const countries = locationData.countries.map(country => country.name);
  res.json(countries);
});

// Get states by country
router.get('/states/:country', (req, res) => {
  const country = locationData.countries.find(c => c.name === req.params.country);
  if (country) {
    const states = country.states.map(state => state.name);
    res.json(states);
  } else {
    res.json([]);
  }
});

// Get cities by country and state
router.get('/cities/:country/:state', (req, res) => {
  const country = locationData.countries.find(c => c.name === req.params.country);
  if (country) {
    const state = country.states.find(s => s.name === req.params.state);
    if (state) {
      res.json(state.cities);
    } else {
      res.json([]);
    }
  } else {
    res.json([]);
  }
});

module.exports = router;