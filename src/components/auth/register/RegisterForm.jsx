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
  referencesSchema,
  sales_tax_certificateSchema,
  shipping_addressSchema,
  shipping_billing_sameSchema,
  terms_agreedSchema,
} from "@/utils/validation/ValidationSchemas";
import FormBtn from "@/components/common/FormBtn";
import { AllCountryCode } from "../../../data/AllCountryCode";
import { requestForReal } from "@/utils/axiosUtils";
import ReviewStep from "./ReviewStep";
import { RiCheckFill } from "react-icons/ri";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import RegisterBasicInfo from "./RegisterBasicInfo";
import RegisterBankInformation from "./RegisterBankInformation";
import RegisterBankReferences from "./RegisterBankReferences";

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
    terms_agreed: true,
  };

  async function getCountry() {
    try {
      const response = await requestForReal({
        method: "GET",
        url: "/api/method/cotton_valley.api.api.get_country_list",
      });
      setCountryList(response.data?.message);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  }

  useEffect(() => {
    getCountry();
  }, []);

  const validationSchema = YupObject({
    last_name: nameSchema,
    first_name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: passwordConfirmationSchema,
    phone: phoneSchema,
    company_name: nameSchema,
    shipping_billing_same: shipping_billing_sameSchema,
    shipping_address: shipping_addressSchema,

    bank_name: nameSchema,
    account_number: nameSchema,
    bank_phone: phoneSchema,
    account_type: nameSchema,

    references: referencesSchema,

    // billing_address: billing_addressSchema,

    sales_tax_certificate: sales_tax_certificateSchema,
    terms_agreed: terms_agreedSchema,
  });

  const stepFieldsMap = {
    1: [
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
    ],
    2: ["bank_name", "account_number", "bank_phone", "account_type"],
    3: [
      "terms_agreed",
      "sales_tax_certificate",
      // references array fields
      ...initialValues.references.flatMap((_, i) => [
        `references[${i}].company_name`,
        `references[${i}].address`,
        `references[${i}].city`,
        `references[${i}].state`,
        `references[${i}].zip`,
        `references[${i}].phone`,
        `references[${i}].fax`,
        `references[${i}].email`,
      ]),
    ],
  };

  const getErrorKeys = (obj, prefix = "") => {
    let keys = [];
    for (const key in obj) {
      const value = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        keys = keys.concat(getErrorKeys(value, path));
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          keys = keys.concat(getErrorKeys(item, `${path}[${index}]`));
        });
      } else {
        keys.push(path);
      }
    }
    return keys;
  };

  // Helper function to set nested field as touched
  const setNestedFieldTouched = (setFieldTouched, fieldPath, value = true) => {
    const parts = fieldPath.split(/[\.\[\]]+/).filter((part) => part !== "");
    let touchedObj = {};

    // Build nested object structure
    const buildNestedObject = (parts, index = 0) => {
      const part = parts[index];
      if (index === parts.length - 1) {
        return value;
      }

      const nextPart = parts[index + 1];
      if (/^\d+$/.test(nextPart)) {
        // Next part is array index
        return { [part]: [buildNestedObject(parts, index + 2)] };
      } else {
        // Regular nested object
        return { [part]: buildNestedObject(parts, index + 1) };
      }
    };

    // Handle array notation like "references[0].company_name"
    if (fieldPath.includes("[")) {
      const arrayMatch = fieldPath.match(/^([^[]+)\[(\d+)\]\.(.+)$/);
      if (arrayMatch) {
        const [, arrayName, index, fieldName] = arrayMatch;
        const touchedArray = [];
        touchedArray[parseInt(index)] = { [fieldName]: value };
        touchedObj = { [arrayName]: touchedArray };
      }
    } else if (fieldPath.includes(".")) {
      // Handle dot notation like "shipping_address.city"
      touchedObj = buildNestedObject(parts);
    } else {
      // Simple field
      touchedObj = { [fieldPath]: value };
    }

    setFieldTouched(touchedObj, true);
  };

  const validateCurrentStep = async (
    validateForm,
    setFieldTouched,
    values,
    step
  ) => {
    const errors = await validateForm();
    const stepFields = stepFieldsMap[step] || [];
    const errorKeys = getErrorKeys(errors);

    const hasStepErrors = errorKeys.some((key) =>
      stepFields.some((field) => key.startsWith(field))
    );

    if (hasStepErrors) {
      // Get fields with errors for this step
      const stepErrorFields = stepFields.filter((field) =>
        errorKeys.some((key) => key.startsWith(field))
      );

      // Set each field as touched using the helper function
      stepErrorFields.forEach((field) => {
        setNestedFieldTouched(setFieldTouched, field, true);
      });

      // Show specific error message
      const errorFieldNames = stepErrorFields.map((field) => {
        // Convert field names to readable format
        const readable = field
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/_/g, " ")
          .replace(/\./g, " ")
          .replace(/\[\d+\]/g, "")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase());
        return readable;
      });

      ToastNotification(
        "error",
        `Please fill the following required fields: ${errorFieldNames
          .slice(0, 3)
          .join(", ")}${errorFieldNames.length > 3 ? " and others" : ""}`
      );
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="step-indicator d-flex justify-content-between mb-4">
        {["Basic Info", "Bank Info", "References", "Review"].map(
          (label, index) => {
            const stepNumber = index + 1;
            const isCompleted = step > stepNumber; // completed steps
            const isActive = step === stepNumber; // current step

            return (
              <div
                key={index}
                className="text-center flex-fill position-relative"
              >
                <div
                  className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center 
            ${
              isCompleted
                ? "bg-success text-white"
                : isActive
                ? "bg-primary text-white"
                : "bg-light border"
            } `}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {isCompleted ? <RiCheckFill /> : stepNumber}
                </div>
                <small
                  className={`d-block ${
                    isActive
                      ? "fw-bold text-primary"
                      : isCompleted
                      ? "text-success"
                      : "text-muted"
                  }`}
                >
                  {label}
                </small>
                {/* connector line */}
                {index < 3 && (
                  <div
                    className={`position-absolute top-50 start-100 translate-middle-y w-100 border-top 
              ${isCompleted ? "border-success" : "border-muted"}`}
                    style={{ zIndex: -1 }}
                  />
                )}
              </div>
            );
          }
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            if (!values.sales_tax_certificate) {
              ToastNotification("error", "Sales Tax Certificate is required");
              setSubmitting(false);
              return;
            }

            let response;

            response = await requestForReal({
              method: "POST",
              url: "/api/method/cotton_valley.api.api.register_customer",
              data: {
                data: values,
              },
            });

            if (
              response.data?.message?.status === "success" ||
              response.data?.status === "success"
            ) {
              ToastNotification(
                "success",
                response.data?.message?.message ||
                  response.data?.message ||
                  "Registered successfully!"
              );
              const fileFormData = new FormData();
              fileFormData.append("file", values.sales_tax_certificate);
              fileFormData.append("folder", "Home/Attachments");
              fileFormData.append("doctype", "Customer");
              fileFormData.append(
                "customer",
                response.data?.message?.customer_id
              );
              fileFormData.append("is_private", 0);

              let fileResponse = await requestForReal({
                method: "POST",
                url: "api/method/upload_file",
                data: fileFormData,
              });
              console.log(fileResponse, "fileResponse");
              resetForm();
              window.location.href = `/`;
            } else {
              ToastNotification(
                "error",
                response.response?.data?.message ||
                  response.data?.message?.message ||
                  response.data?.message ||
                  "Something went wrong"
              );
            }
          } catch (err) {
            console.error("Customer creation failed:", err);
            ToastNotification(
              "error",
              err.response?.data?.message || err.message || "Server error"
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, validateForm, setFieldTouched }) => (
          <Form className="row g-md-4 g-3">
            {/* Name fields */}
            {step === 1 && (
              <RegisterBasicInfo values={values} countryList={countryList} allCountryCode={AllCountryCode} />
            )}

            {/* Bank Information */}
            {step === 2 && (
              <RegisterBankInformation values={values} countryList={countryList} />
            )}

            {/* Business References */}
            {step === 3 && (
              <RegisterBankReferences values={values} setFieldValue={setFieldValue} t={t} />
            )}

            {step === 4 && <ReviewStep values={values} />}

            <div className="mt-4 d-flex justify-content-between">
              {step > 1 && (
                <Button style={{ marginRight: "20px" }} onClick={prevStep}>
                  Back
                </Button>
              )}
              {step < 4 && (
                <Button
                  type="button"
                  className="btn btn-animation"
                  onClick={async () => {
                    const isValid = await validateCurrentStep(
                      validateForm,
                      setFieldTouched,
                      values,
                      step
                    );
                    if (isValid) {
                      if (step === 1) {
                        const response = await requestForReal({
                          method: "POST",
                          url: "/api/method/cotton_valley.api.customer.is_email_exists",
                          data: { email: values.email },
                        });
                        if (response.data?.message?.exists) {
                          ToastNotification(
                            "error",
                            "Email already exists. Please use a different email."
                          );
                          return; // Prevent moving to next step
                        }
                      }
                      nextStep();
                    }
                  }}
                >
                  {step === 3 ? "Save & Review" : "Next"}
                </Button>
              )}
              {step === 4 && (
                <FormBtn
                  title={"Submit"}
                  type={"submit"}
                  classes={{ btnClass: "btn btn-animation w-90" }}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
