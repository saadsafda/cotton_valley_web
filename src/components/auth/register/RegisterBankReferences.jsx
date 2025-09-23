import ColumnSimpleInputField from "@/components/common/inputFields/ColumnSimpleInputField";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import React, { useEffect } from "react";
import { Col, Input, Label } from "reactstrap";

const RegisterBankReferences = ({ values, setFieldValue, t }) => {
  // Function to fetch city and state by zip code
  const fetchLocationByZip = async (zipCode, index) => {
    if (zipCode && zipCode.length >= 5) {
      try {
        // Using a free US ZIP code API - replace with your preferred API
        fetch(`https://api.zippopotam.us/us/${zipCode}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.places && data.places.length > 0) {
              const place = data.places[0];
              setFieldValue(`references[${index}].city`, place["place name"]);
              setFieldValue(`references[${index}].state`, place["state"]);
            }
          })
          .catch((error) => {
            console.error("Error fetching location:", error);
          });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
  };

  // Monitor zip code changes for each reference
  useEffect(() => {
    values.references.forEach((ref, index) => {
      if (ref.zip && ref.zip) {
        fetchLocationByZip(ref.zip, index);
      }
    });
  }, [values.references]);

  return (
    <>
      <Col xs={12}>
        <h4 className="mb-3">Business References</h4>
      </Col>
      {values.references.map((_, index) => (
        <React.Fragment key={index}>
          <Col xl={6} xs={12}>
            <SimpleInputField
              nameList={[
                {
                  name: `references[${index}].company_name`,
                  placeholder: t("Enter Company Name"),
                  title: "Company Name",
                  toplabel: "Company Name ",
                  require: "true",
                },
              ]}
            />
          </Col>
          <Col xl={6} xs={12}>
            <SimpleInputField
              nameList={[
                {
                  name: `references[${index}].email`,
                  placeholder: t("Enter Email"),
                  title: "Email",
                  toplabel: "Email ",
                  require: "true",
                },
              ]}
            />
          </Col>
          <Col md={12}>
            <SimpleInputField
              nameList={[
                {
                  name: `references[${index}].address`,
                  placeholder: t("Enter Address"),
                  title: "Address",
                  toplabel: "Address ",
                  require: "true",
                },
              ]}
            />
          </Col>
          <ColumnSimpleInputField
            nameList={[
              {
                name: `references[${index}].city`,
                placeholder: t("Enter City"),
                title: "City",
                toplabel: "City ",
                require: "true",
              },
              {
                name: `references[${index}].state`,
                placeholder: t("Enter State"),
                title: "State",
                toplabel: "State",
                require: "true",
              },
              {
                name: `references[${index}].zip`,
                placeholder: t("Enter Zip"),
                title: "Zip Code",
                toplabel: "Zip Code",
                require: "true",
                type: "text",
              },
              {
                name: `references[${index}].phone`,
                placeholder: t("Enter Phone"),
                title: "Phone",
                toplabel: "Phone ",
                require: "true",
                type: "number",
              },
              {
                name: `references[${index}].fax`,
                placeholder: t("Enter Fax"),
                title: "Fax",
                toplabel: "Fax ",
                require: "true",
                type: "number",
              },
            ]}
          />
          <hr className="my-4" />
        </React.Fragment>
      ))}

      {/* Terms */}
      <Col xs={12} className="mb-3">
        <Label for="sales_tax_certificate">Sales Tax Certificate *</Label>
        <Input
          id="sales_tax_certificate"
          name="sales_tax_certificate"
          type="file"
          onChange={(event) => {
            setFieldValue(
              "sales_tax_certificate",
              event.currentTarget.files[0]
            );
          }}
        />
      </Col>
      <Col xs={12}>
        <div className="forgot-box">
          <div className="form-check remember-box">
            <Input
              className="checkbox_animated check-box"
              type="checkbox"
              id="flexCheckDefault"
              name="terms_agreed"
              checked={values.terms_agreed}
              onChange={(e) => setFieldValue("terms_agreed", e.target.checked)}
            />
            <Label className="form-check-label" htmlFor="flexCheckDefault">
              {t("IAgreeWith")}
              <span>{t("Terms")}</span> {t("And")} <span>{t("Privacy")}</span>
            </Label>
          </div>
        </div>
      </Col>
    </>
  );
};

export default RegisterBankReferences;
