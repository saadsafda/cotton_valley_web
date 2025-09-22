"use client"
import ColumnSimpleInputField from "@/components/common/inputFields/ColumnSimpleInputField";
import SelectField from "@/components/common/inputFields/SelectField";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import React, { useEffect } from "react";
import { Col } from "reactstrap";

const RegisterShippingAddress = ({ values, countryList }) => {
  
  // Fetch state and country when pincode changes
  useEffect(() => {
    const pincode = values.shipping_address.zip.toString();
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
              values.shipping_address.state = locationData.state;
              values.shipping_address.city = locationData["place name"];
              // Note: Country code from this API is in full name, you might need to map it to your country IDs
              values.shipping_address.country = data.country;
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        });
    }
  }, [values.shipping_address.zip]);

  return (
    <>
      <Col xs={12}>
        <h5 className="mb-3">
          {values.shipping_billing_same ? "Address" : "Shipping Address"}
        </h5>
      </Col>
      <Col md={6}>
        <SimpleInputField
          nameList={[
            {
              name: "shipping_address.address_line1",
              placeholder: "Enter Address Line1",
              toplabel: "Address Line 1 ",
              require: "true",
            },
          ]}
        />
      </Col>
      <Col md={6}>
        <SimpleInputField
          nameList={[
            {
              name: "shipping_address.address_line2",
              placeholder: "Enter Address Line2",
              toplabel: "Address Line 2 (Optional)",
            },
          ]}
        />
      </Col>
      <ColumnSimpleInputField
        nameList={[
          {
            name: "shipping_address.city",
            placeholder: "Enter City",
            toplabel: "City ",
            require: "true",
          },
          {
            name: "shipping_address.state",
            placeholder: "Enter State",
            toplabel: "State ",
            require: "true",
          },
          {
            name: "shipping_address.zip",
            placeholder: "Enter Zip",
            toplabel: "Zip Code ",
            require: "true",
            type: "number",
          },
        ]}
      />

      <Col md={6}>
        <SelectField
          name="shipping_address.country"
          placeholder={"Enter Country"}
          notitle="true"
          label="Country *"
          require="true"
          inputprops={{
            id: "shipping_address.country",
            name: "shipping_address.country",
            options: countryList
              ? countryList.map((cou) => ({
                  id: cou.id,
                  name: cou.id,
                }))
              : [],
          }}
        />
      </Col>
    </>
  );
};

export default RegisterShippingAddress;
