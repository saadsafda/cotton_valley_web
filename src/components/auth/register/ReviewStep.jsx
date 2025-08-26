import React from "react";

const ReviewStep = ({ values }) => {
  return (
    <div className="review-step">
      <div className="review-section">
        <h4>Personal Info</h4>
        <p><strong>First Name:</strong> {values.first_name}</p>
        <p><strong>Last Name:</strong> {values.last_name}</p>
        <p><strong>Email:</strong> {values.email}</p>
        <p><strong>Phone:</strong> {values.phone}</p>
      </div>

      <div className="review-section">
        <h4>Company Info</h4>
        <p><strong>Company Name:</strong> {values.company_name}</p>
        <p><strong>Bank Name:</strong> {values.bank_name}</p>
        <p><strong>Bank Phone:</strong> {values.bank_phone}</p>
        <p><strong>Account Number:</strong> {values.account_number}</p>
        <p><strong>Account Type:</strong> {values.account_type}</p>
      </div>

      <div className="review-section">
        <h4>Shipping Address</h4>
        <p><strong>Address Line 1:</strong> {values.shipping_address?.address_line1}</p>
        <p><strong>Address Line 2:</strong> {values.shipping_address?.address_line2}</p>
        <p><strong>City:</strong> {values.shipping_address?.city}</p>
        <p><strong>State:</strong> {values.shipping_address?.state}</p>
        <p><strong>Zip:</strong> {values.shipping_address?.zip}</p>
        <p><strong>Country:</strong> {values.shipping_address?.country}</p>
      </div>

      <div className="review-section">
        <h4>References</h4>
        {values.references?.map((ref, i) => (
          <div key={i} className="reference">
            <p><strong>Email:</strong> {ref.email}</p>
            <p><strong>Phone:</strong> {ref.phone}</p>
            <p><strong>Company:</strong> {ref.company_name}</p>
            <p><strong>Address:</strong> {ref.address}</p>
            <p><strong>City:</strong> {ref.city}</p>
            <p><strong>State:</strong> {ref.state}</p>
            <p><strong>Zip:</strong> {ref.zip}</p>
            <p><strong>Fax:</strong> {ref.fax}</p>
          </div>
        ))}
      </div>

      <div className="review-section">
        <h4>Other</h4>
        <p><strong>Sales Tax Certificate:</strong>
          {values.sales_tax_certificate ? values.sales_tax_certificate.name : "Not uploaded"}
        </p>
        <p><strong>Agreed to Terms:</strong> {values.terms_agreed ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default ReviewStep;
