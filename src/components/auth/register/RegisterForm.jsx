import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Input, Label } from "reactstrap";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/helper/i18NextContext";
import {
  YupObject,
  emailSchema,
  nameSchema,
  passwordConfirmationSchema,
  passwordSchema,
  phoneSchema,
} from "@/utils/validation/ValidationSchemas";
import FormBtn from "@/components/common/FormBtn";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import { AllCountryCode } from "../../../data/AllCountryCode";
import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import { requestForReal } from "@/utils/axiosUtils";
import SelectField from "@/components/common/inputFields/SelectField";
import ColumnSimpleInputField from "@/components/common/inputFields/ColumnSimpleInputField";
import Btn from "@/elements/buttons/Btn";

const RegisterForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [step, setStep] = useState(1);
  const [countryList, setCountryList] = useState([]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const initialValues = {
    // Basic Information
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    country_code: "1",
    phone: "",
    cell_phone: "",

    // Company Information
    company_name: "",
    store_name: "",
    manager_name: "",
    manager_number: "",
    federal_tax_id: "",
    square_footage: "",
    website: "",
    business_type: "",
    years_in_business: "",
    hear_about_us: "",

    // Bank Information
    bank_name: "",
    bank_address: "",
    bank_phone: "",
    bank_fax: "",
    bank_city: "",
    bank_state: "",
    bank_zip_code: "",
    account_type: "",
    account_number: "",
    bank_email: "",

    // Business References
    references: [
      {
        company_name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
        email: "",
      },
    ],

    // Address Information
    shipping_billing_same: true, // Default checked
    shipping_address: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    billing_address: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },

    // Additional
    sales_tax_certificate: null,
    terms_agreed: false,
  };

  async function getCountry() {
    try {
      const response = await requestForReal({
        method: "GET",
        url: "/api/method/cotton_valley.api.get_country_list",
      });
      console.log(response.data?.message);

      setCountryList(response.data?.message);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  }

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={YupObject({
        first_name: nameSchema,
        last_name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        password_confirmation: passwordConfirmationSchema,
        phone: phoneSchema,
        company_name: nameSchema,
        // billing_address: YupObject({
        //   address_line1: nameSchema,
        //   city: nameSchema,
        //   state: nameSchema,
        //   zip: nameSchema,
        //   country: nameSchema,
        // }),
        // shipping_address: YupObject({
        //   address_line1: nameSchema,
        //   city: nameSchema,
        //   state: nameSchema,
        //   zip: nameSchema,
        //   country: nameSchema,
        // }),
        bank_name: nameSchema,
        account_number: nameSchema,
        bank_phone: phoneSchema,
        account_type: nameSchema,
        // sales_tax_certificate: nameSchema,
      })}
      onSubmit={async (values, { resetForm }) => {
        try {
          // Prepare addresses data
          const addressData = values.shipping_billing_same
            ? [values.shipping_address]
            : [values.shipping_address, values.billing_address];

          await requestForReal({
            method: "POST",
            url: "/api/method/cotton_valley.api.register_customer",
            data: {
              data: values,
            },
            // data: {
            //   customer_name: values.first_name,
            //   custom_last_name: values.last_name,
            //   custom_email_address: values.email,
            //   custom_cell_phone: values.cell_phone,
            //   custom_phone_number: `${values.country_code}${values.phone}`,
            //   custom_password: values.password,
            //   custom_confirm_password: values.password_confirmation,
            //   custom_company_name: values.company_name,
            //   custom_store_name: values.store_name,
            //   custom_storewarehouse_area_sqft: values.square_footage,
            //   tax_id: values.federal_tax_id,
            //   website: values.website,
            //   custom_manager_name: values.manager_name,
            //   custom_manager_number: values.manager_number,
            //   custom_how_long_have_you_been_in_years: values.years_in_business,
            //   customer_type: "Individual",
            //   custom_type_of_buiness: values.business_type,
            //   custom_how_did_you_hear_about_us: values.hear_about_us,
            //   custom_bank_name: values.bank_name,
            //   custom_bank_address: values.bank_address,
            //   custom_bank_phone: values.bank_phone,
            //   custom_bank_fax: values.bank_fax,
            //   custom_bank_account_number: values.account_number,
            //   custom_bank_city: values.bank_city,
            //   custom_bank_state: values.bank_state,
            //   custom_bank_zip_code: values.bank_zip_code,
            //   custom_account_type: values.account_type,
            //   custom_bank_email: values.bank_email,
            //   custom_trade_referances: values.references,
            //   addresses: addressData,
            // },
          });
          resetForm();
          // navigate to home page
          window.location.href = `/`;
        } catch (err) {
          console.error("Customer creation failed:", err);
        }
      }}
    >
      {({ values, setFieldValue, validateForm, setFieldTouched }) => (
        <Form className="row g-md-4 g-3">
          {/* Name fields */}
          {step === 1 && (
            <>
              <Col md={6}>
                <SimpleInputField
                  nameList={[
                    {
                      name: "first_name",
                      placeholder: t("EnterFirstName"),
                      title: "First Name",
                      label: "First Name",
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
                      label: "Last Name",
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
                    label: "Email Address",
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
                        label: "Phone",
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
                      label: "Password",
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
                      label: "Confirm Password",
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
                    label: "Company Name",
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
                  <Label
                    className="form-check-label"
                    htmlFor="shipping_billing_same"
                  >
                    Shipping and billing address are the same
                  </Label>
                </div>
              </Col>

              {/* Shipping Address */}
              <Col xs={12}>
                <h5 className="mb-3">
                  {values.shipping_billing_same
                    ? "Address"
                    : "Shipping Address"}
                </h5>
              </Col>
              <Col md={6}>
                <SimpleInputField
                  nameList={[
                    {
                      name: "shipping_address.address_line1",
                      placeholder: t("EnterAddressLine1"),
                      title: "Address Line 1",
                      label: "Address Line 1",
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
                    label: "City",
                  },
                  {
                    name: "shipping_address.state",
                    placeholder: t("EnterState"),
                    title: "State",
                    label: "State",
                  },
                  {
                    name: "shipping_address.zip",
                    placeholder: t("EnterZip"),
                    title: "Zip Code",
                    label: "Zip Code",
                  },
                ]}
              />

              <Col md={6}>
                <SelectField
                  name="shipping_address.country"
                  placeholder={t("EnterCountry")}
                  notitle="true"
                  label="Country"
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
              {!values.shipping_billing_same && (
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
                          label: "Address Line 1",
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
                        label: "City",
                      },
                      {
                        name: "billing_address.state",
                        placeholder: t("EnterState"),
                        title: "State",
                        label: "State",
                      },
                      {
                        name: "billing_address.zip",
                        placeholder: t("EnterZip"),
                        title: "Zip Code",
                        label: "Zip Code",
                      },
                    ]}
                  />
                  <SelectField
                    name="billing_address.country"
                    placeholder={t("EnterCountry")}
                    notitle="true"
                    label="Country"
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
          )}

          {/* Bank Information */}
          {step === 2 && (
            <>
              <Col md="6">
                <SimpleInputField
                  nameList={[
                    {
                      name: "bank_name",
                      placeholder: t("EnterBankName"),
                      title: "Bank Name",
                      label: "Bank Name",
                    },
                  ]}
                />
              </Col>
              <Col md="6">
                <SimpleInputField
                  nameList={[
                    {
                      name: "account_number",
                      placeholder: t("AccountNumber"),
                      title: "Account Number",
                      label: "Account Number",
                    },
                  ]}
                />
              </Col>
              <Col md="12">
                <SimpleInputField
                  nameList={[
                    {
                      name: "bank_address",
                      placeholder: t("EnterBankAddress"),
                      title: "Bank Address",
                      label: "Bank Address",
                    },
                  ]}
                />
              </Col>
              <ColumnSimpleInputField
                nameList={[
                  {
                    name: "bank_phone",
                    placeholder: t("EnterBankPhone"),
                    title: "Bank Phone",
                    label: "Bank Phone",
                  },
                  {
                    name: "bank_fax",
                    placeholder: t("EnterFax"),
                    title: "Fax",
                    label: "Fax",
                  },
                  {
                    name: "bank_city",
                    placeholder: t("EnterCity"),
                    title: "City",
                    label: "City",
                  },
                  {
                    name: "bank_zip_code",
                    placeholder: t("EnterZip"),
                    title: "Zip Code",
                    label: "Zip Code",
                  },
                  {
                    name: "bank_state",
                    placeholder: t("EnterState"),
                    title: "State",
                    label: "State",
                  },
                  {
                    name: "bank_email",
                    placeholder: t("EnterEmail"),
                    title: "Email",
                    label: "Email",
                  },
                ]}
              />
              <Col xl={6} xs={12}>
                <SelectField
                  name="account_type"
                  label="Account Type"
                  notitle="true"
                  inputprops={{
                    id: "account_type",
                    name: "account_type",
                    options: [
                      { id: "", name: "Select" },
                      { id: "Saving", name: "Saving " },
                      { id: "Checking", name: "Checking" },
                      { id: "Other", name: "Other" },
                    ],
                  }}
                />
              </Col>
            </>
          )}

          {/* Business References */}
          {step === 3 && (
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
                          placeholder: t("EnterCompanyName"),
                          title: "Company Name",
                          label: "Company Name",
                        },
                      ]}
                    />
                  </Col>
                  <Col xl={6} xs={12}>
                    <SimpleInputField
                      nameList={[
                        {
                          name: `references[${index}].email`,
                          placeholder: t("EnterEmail"),
                          title: "Email",
                          label: "Email",
                        },
                      ]}
                    />
                  </Col>
                  <Col md={12}>
                    <SimpleInputField
                      nameList={[
                        {
                          name: `references[${index}].address`,
                          placeholder: t("EnterAddress"),
                          title: "Address",
                          label: "Address",
                        },
                      ]}
                    />
                  </Col>
                  <ColumnSimpleInputField
                    nameList={[
                      {
                        name: `references[${index}].city`,
                        placeholder: t("EnterCity"),
                        title: "City",
                        label: "City",
                      },
                      {
                        name: `references[${index}].state`,
                        placeholder: t("EnterState"),
                        title: "State",
                        label: "State",
                      },
                      {
                        name: `references[${index}].zip`,
                        placeholder: t("EnterZip"),
                        title: "Zip Code",
                        label: "Zip Code",
                      },
                      {
                        name: `references[${index}].phone`,
                        placeholder: t("EnterPhone"),
                        title: "Phone",
                        label: "Phone",
                      },
                      {
                        name: `references[${index}].fax`,
                        placeholder: t("EnterFax"),
                        title: "Fax",
                        label: "Fax",
                      },
                    ]}
                  />
                  {index > 0 && (
                    <Col xs={12} className="mb-3">
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => {
                          const refs = [...values.references];
                          refs.splice(index, 1);
                          setFieldValue("references", refs);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  )}
                  <hr className="my-4" />
                </React.Fragment>
              ))}
              <Col xs={12}>
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => {
                    const refs = [...values.references];
                    refs.push({
                      company_name: "",
                      address: "",
                      city: "",
                      state: "",
                      zip: "",
                      phone: "",
                      fax: "",
                      email: "",
                    });
                    setFieldValue("references", refs);
                  }}
                >
                  Add Reference
                </Button>
              </Col>

              {/* Terms */}
              <Col xs={12} className="mb-3">
                <Label for="sales_tax_certificate">Sales Tax Certificate</Label>
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
                      onChange={(e) =>
                        setFieldValue("terms_agreed", e.target.checked)
                      }
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {t("IAgreeWith")}
                      <span>{t("Terms")}</span> {t("And")}{" "}
                      <span>{t("Privacy")}</span>
                    </Label>
                  </div>
                </div>
              </Col>
            </>
          )}

          {step === 4 && (
            <div>
              <h3>Review & Confirm</h3>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          )}

          <div className="mt-4 d-flex justify-content-between">
            {step > 1 && <Button onClick={prevStep}>Back</Button>}
            {step < 4 && (
              <Button
                type="button"
                className="btn btn-animation"
                onClick={async () => {
                  const errors = await validateForm();

                  // Helper function to check if an error path matches any step field
                  const hasErrorInFields = (errorKeys, stepFields) => {
                    return errorKeys.some((errorKey) =>
                      stepFields.some((stepField) => {
                        // Handle nested object notation (e.g., shipping_address.city)
                        if (stepField.includes(".")) {
                          return (
                            errorKey === stepField ||
                            errorKey.startsWith(stepField + ".")
                          );
                        }
                        // Handle array notation (e.g., references[0].company_name)
                        if (stepField.includes("[")) {
                          const baseField = stepField.split("[")[0];
                          return (
                            errorKey.startsWith(baseField + "[") ||
                            errorKey.startsWith(baseField + ".")
                          );
                        }
                        // Handle direct field match
                        return (
                          errorKey === stepField ||
                          errorKey.startsWith(stepField + ".")
                        );
                      })
                    );
                  };

                  // Helper function to touch nested fields
                  const touchFields = (fields) => {
                    fields.forEach((field) => {
                      if (field.includes("[")) {
                        // Handle array fields like references[0].company_name
                        const matches = field.match(/(\w+)\[(\d+)\]\.(\w+)/);
                        if (matches) {
                          const [, arrayName, index, fieldName] = matches;
                          setFieldTouched(
                            `${arrayName}[${index}].${fieldName}`,
                            true,
                            false
                          );
                        }
                      } else if (field.includes(".")) {
                        // Handle nested object fields like shipping_address.city
                        setFieldTouched(field, true, false);
                      } else {
                        // Handle regular fields
                        setFieldTouched(field, true, false);
                      }
                    });
                  };

                  // Step-specific field definitions
                  let stepFields = [];
                  if (step === 1) {
                    stepFields = [
                      "first_name",
                      "last_name",
                      "email",
                      "password",
                      "password_confirmation",
                      "phone",
                      "company_name",
                      "shipping_address.address_line1",
                      "shipping_address.city",
                      "shipping_address.state",
                      "shipping_address.zip",
                      "shipping_address.country",
                      // Add billing address fields if not same as shipping
                      ...(values.shipping_billing_same
                        ? []
                        : [
                            "billing_address.address_line1",
                            "billing_address.city",
                            "billing_address.state",
                            "billing_address.zip",
                            "billing_address.country",
                          ]),
                    ];
                  } else if (step === 2) {
                    stepFields = [
                      "bank_name",
                      "account_number",
                      "bank_phone",
                      "account_type",
                    ];
                  } else if (step === 3) {
                    stepFields = [
                      "terms_agreed",
                      "sales_tax_certificate",
                      // Add reference fields dynamically based on current references
                      ...values.references.flatMap((_, index) => [
                        `references[${index}].company_name`,
                        `references[${index}].email`,
                        `references[${index}].address`,
                        `references[${index}].city`,
                        `references[${index}].state`,
                        `references[${index}].zip`,
                        `references[${index}].phone`,
                      ]),
                    ];
                  }

                  // Check if there are errors for this step
                  const errorKeys = Object.keys(errors);
                  const hasStepErrors = hasErrorInFields(errorKeys, stepFields);

                  if (!hasStepErrors) {
                    // ✅ No errors → go to next step
                    nextStep();
                  } else {
                    // ❌ Show errors by marking fields as touched
                    touchFields(stepFields);

                    // Also touch any error fields that weren't caught above
                    errorKeys.forEach((errorKey) => {
                      if (
                        stepFields.some(
                          (field) =>
                            errorKey === field ||
                            errorKey.startsWith(field.split("[")[0]) ||
                            errorKey.startsWith(field.split(".")[0])
                        )
                      ) {
                        setFieldTouched(errorKey, true, false);
                      }
                    });
                  }
                }}
              >
                Next
              </Button>
            )}
            {step === 4 && (
              <FormBtn
                title={"Sign Up"}
                type={"submit"}
                classes={{ btnClass: "btn btn-animation w-100" }}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
