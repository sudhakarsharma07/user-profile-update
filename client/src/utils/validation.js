// client/src/utils/validation.js

export const validateStep1 = (formData, usernameAvailable, passwordValid) => {
  const errors = {};

  if (!formData.profilePhoto) {
    errors.profilePhoto = 'Profile photo is required';
  }

  if (!formData.username) {
    errors.username = 'Username is required';
  } else if (formData.username.length < 4 || formData.username.length > 20) {
    errors.username = 'Username must be 4-20 characters';
  } else if (/\s/.test(formData.username)) {
    errors.username = 'Username cannot contain spaces';
  } else if (usernameAvailable === false) {
    errors.username = 'Username is not available';
  }

  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }

  if (formData.gender === 'Other' && !formData.customGender) {
    errors.customGender = 'Please specify your gender';
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  }

  if (!formData.newPassword) {
    errors.newPassword = 'Password is required';
  } else if (!passwordValid) {
    errors.newPassword = 'Password does not meet requirements';
  }

  return errors;
};
  
  export const validateStep2 = (formData) => {
    const errors = {};
  
    if (!formData.profession) {
      errors.profession = 'Profession is required';
    }
  
    if (formData.profession === 'Entrepreneur' && !formData.companyName) {
      errors.companyName = 'Company name is required for entrepreneurs';
    }
  
    if (!formData.addressLine1) {
      errors.addressLine1 = 'Address is required';
    }
  
    return errors;
  };
  
  export const validateStep3 = (formData) => {
    const errors = {};
  
    if (!formData.country) {
      errors.country = 'Country is required';
    }
  
    if (!formData.state) {
      errors.state = 'State is required';
    }
  
    if (!formData.city) {
      errors.city = 'City is required';
    }
  
    if (!formData.subscriptionPlan) {
      errors.subscriptionPlan = 'Subscription plan is required';
    }
  
    return errors;
  };