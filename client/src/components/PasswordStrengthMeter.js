// client/src/components/PasswordStrengthMeter.js
import React, { useEffect, useState } from 'react';

const PasswordStrengthMeter = ({ password, onValidChange }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const result = checkPasswordStrength(password);
    setStrength(result.strength);
    setFeedback(result.feedback);
    onValidChange(result.isValid);
  }, [password, onValidChange]);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const feedback = [];
    let isValid = false;

    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('At least 1 number');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('At least 1 special character');
    }

    if (/[a-z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('At least 1 lowercase letter');
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('At least 1 uppercase letter');
    }

    isValid = strength >= 3 && password.length >= 8 && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return { strength, feedback, isValid };
  };

  const getStrengthColor = () => {
    if (strength <= 2) return '#ff4757';
    if (strength <= 3) return '#ffa502';
    if (strength <= 4) return '#2ed573';
    return '#5352ed';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="password-strength-meter">
      <div className="strength-bar">
        <div 
          className="strength-fill"
          style={{ 
            width: `${(strength / 5) * 100}%`,
            backgroundColor: getStrengthColor()
          }}
        />
      </div>
      <div className="strength-text" style={{ color: getStrengthColor() }}>
        {getStrengthText()}
      </div>
      {feedback.length > 0 && (
        <div className="strength-feedback">
          <ul>
            {feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
