import React from 'react';
import { validateStep2 } from '../utils/validation';

const Step2Professional = ({ formData, updateFormData, errors, updateErrors, nextStep, prevStep }) => {
  const handleNext = () => {
    const stepErrors = validateStep2(formData);
    updateErrors(stepErrors);
    
    if (Object.keys(stepErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>Step 2: Professional Details</h2>
      
      <div className="form-group">
        <label>Profession *</label>
        <select
          value={formData.profession}
          onChange={(e) => {
            updateFormData({ profession: e.target.value, companyName: '' });
          }}
          className={errors.profession ? 'error' : ''}
        >
          <option value="">Select Profession</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
        {errors.profession && <span className="error-message">{errors.profession}</span>}
      </div>

      {formData.profession === 'Entrepreneur' && (
        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            className={errors.companyName ? 'error' : ''}
            placeholder="Enter company name"
          />
          {errors.companyName && <span className="error-message">{errors.companyName}</span>}
        </div>
      )}

      <div className="form-group">
        <label>Address Line 1 *</label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) => updateFormData({ addressLine1: e.target.value })}
          className={errors.addressLine1 ? 'error' : ''}
          placeholder="Enter address"
        />
        {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
      </div>

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

export default Step2Professional;