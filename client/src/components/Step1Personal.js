import React, { useState, useEffect } from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { validateStep1 } from '../utils/validation';

const Step1Personal = ({ formData, updateFormData, errors, updateErrors, nextStep }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    if (formData.username.length >= 4) {
      checkUsernameAvailability(formData.username);
    }
  }, [formData.username]);

  const checkUsernameAvailability = async (username) => {
    if (username.length < 4) return;
    
    setCheckingUsername(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/check-username`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const result = await response.json();
      setUsernameAvailable(result.available);
    } catch (error) {
      console.error('Username check failed:', error);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        updateErrors({ profilePhoto: 'File size must be less than 2MB' });
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        updateErrors({ profilePhoto: 'Only JPG and PNG files are allowed' });
        return;
      }

      updateFormData({ profilePhoto: file });
      updateErrors({ profilePhoto: '' });
      
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep1(formData, usernameAvailable, passwordValid);
    updateErrors(stepErrors);
    
    if (Object.keys(stepErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>Step 1: Personal Information</h2>
      
      <div className="form-group">
        <label>Profile Photo *</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
          className={errors.profilePhoto ? 'error' : ''}
        />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        {errors.profilePhoto && <span className="error-message">{errors.profilePhoto}</span>}
      </div>

      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => updateFormData({ username: e.target.value })}
          className={errors.username ? 'error' : ''}
          placeholder="4-20 characters, no spaces"
        />
        {checkingUsername && <span className="checking">Checking availability...</span>}
        {usernameAvailable === false && <span className="error-message">Username not available</span>}
        {usernameAvailable === true && <span className="success-message">Username available</span>}
        {errors.username && <span className="error-message">{errors.username}</span>}
      </div>


<div className="form-group">
  <label>Gender *</label>
  <select
    value={formData.gender}
    onChange={(e) => {
      updateFormData({ gender: e.target.value, customGender: '' });
    }}
    className={errors.gender ? 'error' : ''}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  {errors.gender && <span className="error-message">{errors.gender}</span>}
</div>

{formData.gender === 'Other' && (
  <div className="form-group">
    <label>Custom Gender *</label>
    <input
      type="text"
      value={formData.customGender}
      onChange={(e) => updateFormData({ customGender: e.target.value })}
      className={errors.customGender ? 'error' : ''}
      placeholder="Please specify"
    />
    {errors.customGender && <span className="error-message">{errors.customGender}</span>}
  </div>
)}

<div className="form-group">
  <label>Date of Birth *</label>
  <input
    type="date"
    value={formData.dateOfBirth}
    onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
    className={errors.dateOfBirth ? 'error' : ''}
    max={new Date().toISOString().split('T')[0]}
  />
  {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
</div>

      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          value={formData.currentPassword}
          onChange={(e) => updateFormData({ currentPassword: e.target.value })}
          placeholder="Required if changing password"
        />
        {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
      </div>

      <div className="form-group">
        <label>New Password *</label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => updateFormData({ newPassword: e.target.value })}
          className={errors.newPassword ? 'error' : ''}
          placeholder="8+ chars, 1 special char, 1 number"
        />
        <PasswordStrengthMeter 
          password={formData.newPassword} 
          onValidChange={setPasswordValid}
        />
        {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Personal;