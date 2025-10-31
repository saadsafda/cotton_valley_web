import ColumnSimpleInputField from "@/components/common/inputFields/ColumnSimpleInputField";
import SelectField from "@/components/common/inputFields/SelectField";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import React, { useEffect } from "react";
import { Col } from "reactstrap";

const RegisterBankInformation = ({ values, countryList }) => {
  // Fetch state and country when pincode changes
  useEffect(() => {
    const pincode = values.bank_zip_code.toString();
    if (pincode && pincode.length >= 5) {
      // Using Zippopotam.us API to fetch location details by pincode
      fetch(`https://api.zippopotam.us/us/${pincode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.places && data.places.length > 0) {
            const locationData = data.places[0];
            if (locationData) {
              // You'll need to update these values in the parent component
              // or use a callback function passed as prop
              values.bank_state = locationData.state;
              values.bank_city = locationData["place name"];
              // Note: Country code from this API is in full name, you might need to map it to your country IDs
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  }, [values.bank_zip_code]);
  return (
    <>
      <Col md="6">
        <SimpleInputField
          nameList={[
            {
              name: "bank_name",
              placeholder: "Enter Bank Name",
              title: "Bank Name",
              toplabel: "Bank Name ",
              require: "true",
            },
          ]}
        />
      </Col>
      <Col md="6">
        <SimpleInputField
          nameList={[
            {
              name: "account_number",
              placeholder: "Account Number",
              title: "Account Number",
              toplabel: "Account Number ",
              require: "true",
            },
          ]}
        />
      </Col>
      <Col md="12">
        <SimpleInputField
          nameList={[
            {
              name: "bank_address",
              placeholder: "Enter Bank Address",
              title: "Bank Address",
              toplabel: "Bank Address",
            },
          ]}
        />
      </Col>
      <ColumnSimpleInputField
        nameList={[
          {
            name: "bank_phone",
            placeholder: "Enter Bank Phone",
            title: "Bank Phone",
            toplabel: "Bank Phone ",
            require: "true",
            type: "number",
          },
          {
            name: "bank_fax",
            placeholder: "Enter Fax",
            title: "Fax",
            toplabel: "Fax",
            type: "number",
          },
          {
            name: "bank_email",
            placeholder: "Enter Email",
            title: "Email",
            toplabel: "Email",
          },
          {
            name: "bank_zip_code",
            placeholder: "Enter Zip",
            title: "Zip Code",
            toplabel: "Zip Code",
            require: "true",
            type: "text",
          },
          {
            name: "bank_city",
            placeholder: "Enter City",
            title: "City",
            toplabel: "City",
            require: "true",
          },
          {
            name: "bank_state",
            placeholder: "Enter State",
            title: "State",
            toplabel: "State",
            require: "true",
          },
        ]}
      />
      <Col xl={6} xs={12}>
        <SelectField
          name="account_type"
          label="Account Type "
          require="true"
          notitle="true"
          inputprops={{
            id: "account_type",
            name: "account_type",
            options: [
              { id: "", name: "Select" },
              { id: "Saving", name: "Saving" },
              { id: "Checking", name: "Checking" },
              { id: "Other", name: "Other" },
            ],
          }}
        />
      </Col>
    </>
  );
};

export default RegisterBankInformation;
