// client/src/components/MultiStepForm.js
import React, { useState } from 'react';
import Step1Personal from './Step1Personal';
import Step2Professional from './Step2Professional';
import Step3Preferences from './Step3Preferences';
import Summary from './Summary';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const initialFormState = {
    profilePhoto: null,
    username: '',
    gender: '',
    customGender: '',
    dateOfBirth: '',
    currentPassword: '',
    newPassword: '',
    profession: '',
    companyName: '',
    addressLine1: '',
    country: '',
    state: '',
    city: '',
    subscriptionPlan: '',
    newsletter: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const updateErrors = (newErrors) => {
    setErrors(prev => ({ ...prev, ...newErrors }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'profilePhoto' && value) {
        formDataToSend.append(key, value); // File
      } else if (typeof value === 'boolean') {
        formDataToSend.append(key, value.toString()); // Convert boolean to string
      } else if (value !== undefined && value !== null) {
        formDataToSend.append(key, value); // Add other fields
      }
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://user-profile-update.onrender.com'}/api/profile/update`,
        {
          method: 'POST',
          body: formDataToSend
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert('✅ Profile updated successfully!');
        setCurrentStep(1);
        setFormData(initialFormState);
      } else {
        alert(result.error || '❌ Submission failed.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Personal
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            updateErrors={updateErrors}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2Professional
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            updateErrors={updateErrors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3Preferences
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            updateErrors={updateErrors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Summary
            formData={formData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-steps">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="progress-labels">
          <span>Personal</span>
          <span>Professional</span>
          <span>Preferences</span>
          <span>Summary</span>
        </div>
      </div>

      {/* Form step content */}
      <div className="form-container">{renderStep()}</div>
    </div>
  );
};

export default MultiStepForm;
