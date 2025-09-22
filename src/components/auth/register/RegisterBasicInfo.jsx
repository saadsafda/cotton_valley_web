import ColumnSimpleInputField from "@/components/common/inputFields/ColumnSimpleInputField";
import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import { Col, Input, Label } from "reactstrap";
import RegisterShippingAddress from "./RegisterShippingAddress";
import RegisterBillingAddress from "./RegisterBillingAddress";
import SelectField from "@/components/common/inputFields/SelectField";

const RegisterBasicInfo = ({ values, countryList, allCountryCode }) => {
  return (
    <>
      <SimpleInputField
        nameList={[
          {
            name: "first_name",
            placeholder: "Enter First Name",
            toplabel: "First Name",
            colprops: { xxl: 6, lg: 12, sm: 6 },
            require: "true",
          },
          {
            name: "last_name",
            placeholder: "Enter Last Name",
            toplabel: "Last Name",
            colprops: { xxl: 6, lg: 12, sm: 6 },
            require: "true",
          },
        ]}
      />
      <ColumnSimpleInputField
        nameList={[
          {
            name: "email",
            placeholder: "Email Address",
            title: "Email",
            toplabel: "Email Address",
            require: "true",
          },
          {
            name: "cell_phone",
            placeholder: "Cell Phone",
            toplabel: "Cell Phone",
            type: "number",
          },
        ]}
      />
      <Col md={4}>
        <div className="country-input">
          <div className="mt-10 custom-select-box">
            <SearchableSelectInput
              nameList={[
                {
                  name: "country_code",
                  notitle: "true",
                  require: "true",
                  inputprops: {
                    name: "country_code",
                    id: "country_code",
                    options: allCountryCode,
                  },
                },
              ]}
            />
          </div>
          <SimpleInputField
            nameList={[
              {
                name: "phone",
                type: "number",
                require: "true",
                placeholder: "Enter Phone Number",
                colclass: "country-input-box",
                toplabel: "Phone",
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
              placeholder: "Password",
              type: "password",
              toplabel: "Password",
              require: "true",
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
              placeholder: "Confirm Password",
              toplabel: "Confirm Password",
              require: "true",
            },
          ]}
        />
      </Col>
      <ColumnSimpleInputField
        nameList={[
          {
            name: "company_name",
            placeholder: "Company Name",
            title: "Company Name",
            toplabel: "Company Name ",
            require: "true",
          },
          {
            name: "store_name",
            placeholder: "Store Name",
            title: "Store Name",
            toplabel: "Store Name",
          },
          {
            name: "square_footage",
            placeholder: "Store Area",
            title: "Square Footage",
            toplabel: "Square Footage",
          },
          {
            name: "federal_tax_id",
            placeholder: "Federal Tax ID",
            title: "Federal Tax ID",
            toplabel: "Federal Tax ID",
            type: "number",
          },
          {
            name: "website",
            placeholder: "Website",
            title: "Website",
            toplabel: "Website",
          },
          {
            name: "manager_name",
            placeholder: "Manager Name",
            title: "Manager Name",
            toplabel: "Manager Name",
          },
          {
            name: "manager_number",
            placeholder: "Manager Number",
            title: "Manager Number",
            toplabel: "Manager Number",
          },
          {
            name: "years_in_business",
            placeholder: "Years In Business",
            title: "Years in Business",
            toplabel: "How long (Years)?",
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
            checked={values.shipping_billing_same}
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
      <RegisterShippingAddress values={values} countryList={countryList} />

      {/* Billing Address (only show if not same as shipping) */}
      <RegisterBillingAddress values={values} countryList={countryList} />
    </>
  );
};

export default RegisterBasicInfo;
