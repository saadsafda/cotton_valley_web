import React from "react";

const modernStyles = {
  container: {
    padding: "30px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    display: "flex",        // Enable Flexbox
    flexWrap: "wrap",       // Allow items to wrap to the next line
    gap: "20px",            // Main gap between sections (columns and rows)
  },
  section: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "6px",
    borderLeft: "5px solid #007bff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
    // Flex property to make two columns on one line, accounting for the gap
    flex: "1 1 calc(50% - 10px)", // Take 50% width minus half the gap
    minWidth: "350px", // Ensure good readability on smaller screens
  },
  fullWidthSection: {
    // Style for the references section, which spans the full width
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "6px",
    borderLeft: "5px solid #007bff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
    marginTop: "0", // Gap is handled by the container
  },
  title: {
    color: "#333",
    fontSize: "1.5rem",
    marginBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  referenceSectionContainer: {
    // Inner container for references to create an internal two-column layout
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "10px",
  },
  referenceItem: {
    padding: "15px",
    border: "1px dashed #ccc",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
    flex: "1 1 calc(50% - 10px)", // Two reference blocks per row
    minWidth: "300px",
  },
  paragraph: {
    lineHeight: "1.6",
    fontSize: "0.95rem",
    color: "#555",
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    borderBottom: "1px dotted #eee",
  },
  label: {
    fontWeight: "600",
    color: "#333",
    marginRight: "10px",
    flexShrink: 0,
    width: "150px",
  },
  value: {
    textAlign: "right",
    flexGrow: 1,
  }
};

const ReviewStep = ({ values }) => {
  const renderField = (label, value) => (
    <p style={modernStyles.paragraph}>
      <span style={modernStyles.label}>{label}:</span>
      <span style={modernStyles.value}>{value}</span>
    </p>
  );

  return (
    // The main container uses flexbox to manage all sections
    <div className="review-step" style={modernStyles.container}>

      {/* PERSONAL INFO (col-6) */}
      <div className="review-section" style={modernStyles.section}>
        <h4 style={modernStyles.title}>Personal Info</h4>
        {renderField("First Name", values.first_name)}
        {renderField("Last Name", values.last_name)}
        {renderField("Email", values.email)}
        {renderField("Phone", values.phone)}
      </div>

      {/* COMPANY INFO (col-6) */}
      <div className="review-section" style={modernStyles.section}>
        <h4 style={modernStyles.title}>Company Info</h4>
        {renderField("Company Name", values.company_name)}
        {renderField("Bank Name", values.bank_name)}
        {renderField("Bank Phone", values.bank_phone)}
        {renderField("Account Number", values.account_number)}
        {renderField("Account Type", values.account_type)}
      </div>

      {/* SHIPPING ADDRESS (col-6) */}
      <div className="review-section" style={modernStyles.section}>
        <h4 style={modernStyles.title}>Shipping Address</h4>
        {renderField("Address Line 1", values.shipping_address?.address_line1)}
        {renderField("Address Line 2", values.shipping_address?.address_line2)}
        {renderField("City", values.shipping_address?.city)}
        {renderField("State", values.shipping_address?.state)}
        {renderField("Zip", values.shipping_address?.zip)}
        {renderField("Country", values.shipping_address?.country)}
      </div>

      {/* OTHER (col-6) */}
      <div className="review-section" style={modernStyles.section}>
        <h4 style={modernStyles.title}>Other</h4>
        {renderField(
          "Sales Tax Certificate",
          values.sales_tax_certificate ? values.sales_tax_certificate.name : "Not uploaded"
        )}
        {renderField("Agreed to Terms", values.terms_agreed ? "Yes" : "No")}
      </div>

      {/* REFERENCES (Full-width row) */}
      <div className="review-section" style={modernStyles.fullWidthSection}>
        <h4 style={modernStyles.title}>References</h4>
        <div style={modernStyles.referenceSectionContainer}>
          {values.references?.map((ref, i) => (
            <div key={i} className="reference" style={modernStyles.referenceItem}>
              <p style={{ ...modernStyles.label, marginBottom: "8px", borderBottom: "1px solid #eee", paddingBottom: "5px", color: "#007bff" }}>Reference {i + 1}</p>
              {renderField("Email", ref.email)}
              {renderField("Phone", ref.phone)}
              {renderField("Company", ref.company_name)}
              {renderField("Address", ref.address)}
              {renderField("City", ref.city)}
              {renderField("State", ref.state)}
              {renderField("Zip", ref.zip)}
              {renderField("Fax", ref.fax)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;