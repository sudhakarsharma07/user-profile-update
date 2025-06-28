import React, { useState, useEffect } from 'react';
import { validateStep3 } from '../utils/validation';

const Step3Preferences = ({ formData, updateFormData, errors, updateErrors, nextStep, prevStep }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://user-profile-update.onrender.com';

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetchStates(formData.country);
      updateFormData({ state: '', city: '' }); // Reset state and city
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      fetchCities(formData.country, formData.state);
      updateFormData({ city: '' }); // Reset city
    }
  }, [formData.state]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/location/countries`);
      const data = await response.json();
      console.log('Fetched Countries:', data);
      setCountries(data);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await fetch(`${API_BASE}/api/location/states/${country}`);
      const data = await response.json();
      console.log('Fetched States:', data);
      setStates(data);
    } catch (error) {
      console.error('Failed to fetch states:', error);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(`${API_BASE}/api/location/cities/${country}/${state}`);
      const data = await response.json();
      console.log('Fetched Cities:', data);
      setCities(data);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep3(formData);
    updateErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>Step 3: Preferences</h2>

      {/* Country */}
      <div className="form-group">
        <label>Country *</label>
        <select
          value={formData.country}
          onChange={(e) => updateFormData({ country: e.target.value })}
          className={errors.country ? 'error' : ''}
        >
          <option value="">Select Country</option>
          {countries.length > 0 ? (
            countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))
          ) : (
            <option disabled>Loading countries...</option>
          )}
        </select>
        {errors.country && <span className="error-message">{errors.country}</span>}
      </div>

      {/* State */}
      <div className="form-group">
        <label>State *</label>
        <select
          value={formData.state}
          onChange={(e) => updateFormData({ state: e.target.value })}
          className={errors.state ? 'error' : ''}
          disabled={!formData.country}
        >
          <option value="">Select State</option>
          {states.length > 0 ? (
            states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
          ) : (
            formData.country && <option disabled>Loading states...</option>
          )}
        </select>
        {errors.state && <span className="error-message">{errors.state}</span>}
      </div>

      {/* City */}
      <div className="form-group">
        <label>City *</label>
        <select
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          className={errors.city ? 'error' : ''}
          disabled={!formData.state}
        >
          <option value="">Select City</option>
          {cities.length > 0 ? (
            cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          ) : (
            formData.state && <option disabled>Loading cities...</option>
          )}
        </select>
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      {/* Subscription Plan */}
      <div className="form-group">
        <label>Subscription Plan *</label>
        <div className="radio-group">
          {['Basic', 'Pro', 'Enterprise'].map((plan) => (
            <label key={plan} className="radio-label">
              <input
                type="radio"
                name="subscriptionPlan"
                value={plan}
                checked={formData.subscriptionPlan === plan}
                onChange={(e) => updateFormData({ subscriptionPlan: e.target.value })}
              />
              {plan}
            </label>
          ))}
        </div>
        {errors.subscriptionPlan && <span className="error-message">{errors.subscriptionPlan}</span>}
      </div>

      {/* Newsletter */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => updateFormData({ newsletter: e.target.checked })}
          />
          Subscribe to Newsletter
        </label>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="button" onClick={prevStep} className="btn-secondary">
          Previous
        </button>
        <button type="button" onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Preferences;
