import { useContext, useState, useRef } from "react";
import { Row } from "reactstrap";
import Btn from "@/elements/buttons/Btn";
import { Form, Formik } from "formik";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import {
  YupObject,
  emailSchema,
  nameSchema,
  phoneSchema,
} from "@/utils/validation/ValidationSchemas";
import {
  RiBuilding2Fill,
  RiChat2Fill,
  RiHome2Fill,
  RiMailFill,
  RiPinDistanceFill,
  RiSmartphoneLine,
  RiUserFill,
} from "react-icons/ri";
import SelectField from "@/components/common/inputFields/SelectField";
import request from "@/utils/axiosUtils";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import ReCAPTCHA from "react-google-recaptcha";

const LeadForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        company_name: "",
        email: "",
        phone: "",
        square_footage: "",
        address: "",
        business_type: "",
      }}
      validationSchema={YupObject({
        name: nameSchema,
        company_name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        address: nameSchema,
        business_type: nameSchema,
      })}
      onSubmit={async (values, { resetForm }) => {
        if (!captchaValue) {
          ToastNotification("error", "Please complete the CAPTCHA verification");
          return;
        }

        setIsSubmitting(true);
        try {
          await request({
            url: "/lead",
            method: "POST",
            data: { ...values, captcha: captchaValue },
          });
          resetForm(); // clears form after submit
          ToastNotification(
            "success",
            "Your inquiry has been submitted successfully. Our representative will contact you shortly."
          );
          setCaptchaValue(null);
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
        } catch (error) {
          console.error("Lead form submission error:", error);
          ToastNotification(
            "error",
            error?.response?.data?.message || "Failed to submit your inquiry. Please try again."
          );
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
          setCaptchaValue(null);
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Row>
            <SimpleInputField
              nameList={[
                {
                  name: "name",
                  placeholder: t("EnterFullName"),
                  toplabel: "Full Name",
                  inputaddon: "true",
                  prefixvalue: <RiUserFill />,
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "company_name",
                  placeholder: t("Enter Company Name"),
                  toplabel: "Company Name",
                  inputaddon: "true",
                  prefixvalue: <RiBuilding2Fill />,
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "email",
                  placeholder: t("EnterEmail"),
                  toplabel: "Email Address",
                  inputaddon: "true",
                  prefixvalue: <RiMailFill />,
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "phone",
                  placeholder: t("EnterPhoneNumber"),
                  toplabel: "Phone Number",
                  inputaddon: "true",
                  prefixvalue: <RiSmartphoneLine />,
                  type: "number",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "square_footage",
                  placeholder: t("Enter Square Footage"),
                  toplabel: "Square Footage",
                  inputaddon: "true",
                  prefixvalue: <RiUserFill />,
                  type: "number",
                  colprops: { xs: 12 },
                },
                {
                  name: "address",
                  placeholder: t("Enter Your Office Address"),
                  toplabel: "Address",
                  inputaddon: "true",
                  prefixvalue: <RiPinDistanceFill />,
                  colprops: { xs: 12 },
                  type: "textarea",
                  rows: 5,
                },
              ]}
            />
            <div className="col-12">
              <SelectField
                name="business_type"
                label="Type of Business"
                notitle="true"
                inputprops={{
                  id: "business_type",
                  toplabel: "Business Type",
                  name: "business_type",
                  options: [
                    { id: "", name: "Select" },
                    { id: "Retail", name: "Retail" },
                    { id: "Wholesale", name: "Wholesale" },
                    { id: "Manufacturing", name: "Manufacturing" },
                    { id: "Service", name: "Service" },
                    { id: "E-commerce", name: "E-commerce" },
                    { id: "Discount Store", name: "Discount Store" },
                    { id: "Chain Store", name: "Chain Store" },
                  ],
                }}
              />
            </div>
          </Row>
          <div className="mb-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={handleCaptchaChange}
            />
          </div>
          <Btn
            className="btn btn-animation btn-md fw-bold ms-auto"
            type="submit"
            disabled={isSubmitting || !captchaValue}
          >
            {isSubmitting ? "Submitting..." : t("Submit")}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default LeadForm;
