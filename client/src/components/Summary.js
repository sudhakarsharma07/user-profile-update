// client/src/components/Summary.js
import React from "react";

const Summary = ({ formData, prevStep, handleSubmit, isSubmitting }) => {
  return (
    <div className="form-step">
      <h2>Step 4: Summary</h2>

      <div className="summary-section">
        <h3>Personal Information</h3>
        <div className="summary-item">
          <strong>Username:</strong> {formData.username}
        </div>
        <div className="summary-item">
          <strong>Profile Photo:</strong>{" "}
          {formData.profilePhoto ? "Uploaded" : "Not uploaded"}
        </div>
        <div className="summary-item">
          <strong>Password:</strong>{" "}
          {formData.newPassword ? "Will be updated" : "No change"}
        </div>
      </div>

      <div className="summary-section">
        <h3>Professional Details</h3>
        <div className="summary-item">
          <strong>Profession:</strong> {formData.profession}
        </div>
        {formData.profession === "Entrepreneur" && (
          <div className="summary-item">
            <strong>Company Name:</strong> {formData.companyName}
          </div>
        )}
        <div className="summary-item">
          <strong>Address:</strong> {formData.addressLine1}
        </div>
      </div>

      <div className="summary-section">
        <h3>Personal Information</h3>
        <div className="summary-item">
          <strong>Username:</strong> {formData.username}
        </div>
        <div className="summary-item">
          <strong>Gender:</strong>{" "}
          {formData.gender === "Other"
            ? formData.customGender
            : formData.gender}
        </div>
        <div className="summary-item">
          <strong>Date of Birth:</strong> {formData.dateOfBirth}
        </div>
        <div className="summary-item">
          <strong>Profile Photo:</strong>{" "}
          {formData.profilePhoto ? "Uploaded" : "Not uploaded"}
        </div>
        <div className="summary-item">
          <strong>Password:</strong>{" "}
          {formData.newPassword ? "Will be updated" : "No change"}
        </div>
      </div>

      <div className="summary-section">
        <h3>Preferences</h3>
        <div className="summary-item">
          <strong>Location:</strong> {formData.city}, {formData.state},{" "}
          {formData.country}
        </div>
        <div className="summary-item">
          <strong>Subscription Plan:</strong> {formData.subscriptionPlan}
        </div>
        <div className="summary-item">
          <strong>Newsletter:</strong>{" "}
          {formData.newsletter ? "Subscribed" : "Not subscribed"}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={prevStep} className="btn-secondary">
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Summary;
