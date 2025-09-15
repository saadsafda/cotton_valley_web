import React from "react";
import { Col, Input, Label } from "reactstrap";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import ColumnSimpleInputField from "@/components/common/inputFields/ColumnSimpleInputField";
import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import SelectField from "@/components/common/inputFields/SelectField";
import { AllCountryCode } from "../../../data/AllCountryCode";

const StepBasicInfo = ({ values, setFieldValue, t, countryList }) => (
  <>
    <Col xs={12}>
      <div className="mb-4">
        <h3 className="text-primary mb-2">Personal Information</h3>
        <p className="text-muted mb-0">Please provide your basic information</p>
      </div>
    </Col>
    <Col md={6}>
      <SimpleInputField
        nameList={[
          {
            name: "first_name",
            placeholder: t("EnterFirstName"),
            title: "First Name",
            label: "First Name *",
          },
        ]}
      />
    </Col>
    <Col md={6}>
      <SimpleInputField
        nameList={[
          {
            name: "last_name",
            placeholder: t("EnterLastName"),
            title: "Last Name",
            label: "Last Name *",
          },
        ]}
      />
    </Col>
    <ColumnSimpleInputField
      nameList={[
        {
          name: "email",
          placeholder: t("EmailAddress"),
          title: "Email",
          label: "Email Address *",
        },
        {
          name: "cell_phone",
          placeholder: t("CellPhone"),
          title: "Cell Phone",
          label: "Cell Phone",
        },
      ]}
    />
    <Col md={4}>
      <div className="country-input">
        <SearchableSelectInput
          nameList={[
            {
              name: "country_code",
              notitle: "true",
              inputprops: {
                name: "country_code",
                id: "country_code",
                options: AllCountryCode,
              },
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            {
              name: "phone",
              type: "number",
              placeholder: t("EnterPhoneNumber"),
              colclass: "country-input-box",
              title: "Phone",
              label: "Phone *",
            },
          ]}
        />
      </div>
    </Col>
    <Col md={6}>
      <SimpleInputField
        nameList={[
          {
            name: "password",
            placeholder: t("Password"),
            type: "password",
            title: "Password",
            label: "Password *",
          },
        ]}
      />
    </Col>
    <Col md={6}>
      <SimpleInputField
        nameList={[
          {
            name: "password_confirmation",
            type: "password",
            placeholder: t("ConfirmPassword"),
            title: "Confirm Password",
            label: "Confirm Password *",
          },
        ]}
      />
    </Col>
    <ColumnSimpleInputField
      nameList={[
        {
          name: "company_name",
          placeholder: t("CompanyName"),
          title: "Company Name",
          label: "Company Name *",
        },
        {
          name: "store_name",
          placeholder: t("StoreName"),
          title: "Store Name",
          label: "Store Name",
        },
        {
          name: "square_footage",
          placeholder: t("StoreArea"),
          title: "Square Footage",
          label: "Square Footage",
        },
        {
          name: "federal_tax_id",
          placeholder: t("FederalTaxID"),
          title: "Federal Tax ID",
          label: "Federal Tax ID",
        },
        {
          name: "website",
          placeholder: t("Website"),
          title: "Website",
          label: "Website",
        },
        {
          name: "manager_name",
          placeholder: t("ManagerName"),
          title: "Manager Name",
          label: "Manager Name",
        },
        {
          name: "manager_number",
          placeholder: t("ManagerNumber"),
          title: "Manager Number",
          label: "Manager Number",
        },
        {
          name: "years_in_business",
          placeholder: t("YearsInBusiness"),
          title: "Years in Business",
          label: "How long (Years)?",
        },
      ]}
    />
    {/* Business Type */}
    <Col xl={6} xs={12}>
      <SelectField
        name="business_type"
        label="Type of Business"
        notitle="true"
        inputprops={{
          id: "business_type",
          name: "business_type",
          options: [
            { id: "", name: "Select" },
            { id: "Retail", name: "Retail" },
            { id: "Wholesale", name: "Wholesale" },
            { id: "Manufacturing", name: "Manufacturing" },
            { id: "Service", name: "Service" },
            { id: "E-commerce", name: "E-commerce" },
            { id: "Agriculture", name: "Agriculture" },
            { id: "Discount Store", name: "Discount Store" },
            { id: "Chain Store", name: "Chain Store" },
          ],
        }}
      />
    </Col>

    {/* How did you hear */}
    <Col xl={6} xs={12}>
      <SelectField
        name="hear_about_us"
        label="How did you hear about us?"
        notitle="true"
        inputprops={{
          id: "hear_about_us",
          name: "hear_about_us",
          options: [
            { id: "", name: "Select" },
            { id: "Colleagues", name: "Colleagues" },
            { id: "Social Media", name: "Social Media" },
            { id: "Others", name: "Others" },
          ],
        }}
      />
    </Col>

    {/* Address Section */}
    <Col xs={12}>
      <h4 className="mt-4 mb-3">Address Information</h4>
    </Col>

    {/* Shipping/Billing Same Checkbox */}
    <Col xs={12}>
      <div className="form-check mb-3">
        <Input
          className="checkbox_animated check-box"
          type="checkbox"
          id="shipping_billing_same"
          name="shipping_billing_same"
          checked={values?.shipping_billing_same}
          onChange={(e) => {
            setFieldValue("shipping_billing_same", e.target.checked);
            // Clear billing address when same as shipping
            if (e.target.checked) {
              setFieldValue("billing_address", {
                address_line1: "",
                address_line2: "",
                city: "",
                state: "",
                zip: "",
                country: "",
              });
            }
          }}
        />
        <Label className="form-check-label" htmlFor="shipping_billing_same">
          Shipping and billing address are the same
        </Label>
      </div>
    </Col>

    {/* Shipping Address */}
    <Col xs={12}>
      <h5 className="mb-3">
        {values?.shipping_billing_same ? "Address" : "Shipping Address"}
      </h5>
    </Col>
    <Col md={6}>
      <SimpleInputField
        nameList={[
          {
            name: "shipping_address.address_line1",
            placeholder: t("EnterAddressLine1"),
            title: "Address Line 1",
            label: "Address Line 1 *",
          },
        ]}
      />
    </Col>
    <Col md={6}>
      <SimpleInputField
        nameList={[
          {
            name: "shipping_address.address_line2",
            placeholder: t("EnterAddressLine2"),
            title: "Address Line 2",
            label: "Address Line 2 (Optional)",
          },
        ]}
      />
    </Col>
    <ColumnSimpleInputField
      nameList={[
        {
          name: "shipping_address.city",
          placeholder: t("EnterCity"),
          title: "City",
          label: "City *",
        },
        {
          name: "shipping_address.state",
          placeholder: t("EnterState"),
          title: "State",
          label: "State *",
        },
        {
          name: "shipping_address.zip",
          placeholder: t("EnterZip"),
          title: "Zip Code",
          label: "Zip Code *",
        },
      ]}
    />

    <Col md={6}>
      <SelectField
        name="shipping_address.country"
        placeholder={t("EnterCountry")}
        notitle="true"
        label="Country *"
        inputprops={{
          id: "shipping_address.country",
          name: "shipping_address.country",
          options: countryList
            ? countryList.map((cou) => ({
                id: cou.name,
                name: cou.name,
              }))
            : [],
        }}
      />
    </Col>

    {/* Billing Address (only show if not same as shipping) */}
    {!values?.shipping_billing_same && (
      <>
        <Col xs={12}>
          <h5 className="mb-3 mt-4">Billing Address</h5>
        </Col>
        <Col md={6}>
          <SimpleInputField
            nameList={[
              {
                name: "billing_address.address_line1",
                placeholder: t("EnterAddressLine1"),
                title: "Address Line 1",
                label: "Address Line 1 *",
              },
            ]}
          />
        </Col>
        <Col md={6}>
          <SimpleInputField
            nameList={[
              {
                name: "billing_address.address_line2",
                placeholder: t("EnterAddressLine2"),
                title: "Address Line 2",
                label: "Address Line 2 (Optional)",
              },
            ]}
          />
        </Col>
        <ColumnSimpleInputField
          nameList={[
            {
              name: "billing_address.city",
              placeholder: t("EnterCity"),
              title: "City",
              label: "City *",
            },
            {
              name: "billing_address.state",
              placeholder: t("EnterState"),
              title: "State",
              label: "State *",
            },
            {
              name: "billing_address.zip",
              placeholder: t("EnterZip"),
              title: "Zip Code",
              label: "Zip Code *",
            },
          ]}
        />
        <SelectField
          name="billing_address.country"
          placeholder={t("EnterCountry")}
          notitle="true"
          label="Country *"
          inputprops={{
            id: "billing_address.country",
            name: "billing_address.country",
            options: countryList
              ? countryList.map((cou) => ({
                  id: cou.name,
                  name: cou.name,
                }))
              : [],
          }}
        />
      </>
    )}
  </>
);

export default StepBasicInfo;
