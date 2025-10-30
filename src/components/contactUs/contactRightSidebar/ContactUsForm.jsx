import { useContext, useRef, useState } from "react";
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
  RiChat2Fill,
  RiMailFill,
  RiSmartphoneLine,
  RiUserFill,
} from "react-icons/ri";
import request from "@/utils/axiosUtils";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUsForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const recaptchaRef = useRef(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        subject: nameSchema,
        message: nameSchema,
      })}
      onSubmit={async (values, { resetForm }) => {
        if (!captchaValue) {
          ToastNotification("error", "Please complete the CAPTCHA verification");
          return;
        }

        setIsSubmitting(true);
        try {
          await request({
            url: "/contact",
            method: "POST",
            data: { ...values, captcha: captchaValue },
          });
          resetForm(); // optional: clears form after submit
          setCaptchaValue(null);
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
          ToastNotification(
            "success",
            "Your inquiry has been submitted, our representative will call you shortly"
          );
        } catch (error) {
          console.error("Contact form submission error:", error);
          ToastNotification(
            "error",
            error?.response?.data?.message || "There was an error submitting the form. Please try again later."
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
                  colprops: { xs: 12 },
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
                  name: "subject",
                  placeholder: t("EnterSubject"),
                  toplabel: "Subject",
                  inputaddon: "true",
                  prefixvalue: <RiUserFill />,
                  colprops: { xs: 12 },
                },
                {
                  name: "message",
                  placeholder: t("EnterYourMessage"),
                  toplabel: "Message",
                  inputaddon: "true",
                  prefixvalue: <RiChat2Fill />,
                  colprops: { xs: 12 },
                  type: "textarea",
                  rows: 5,
                },
              ]}
            />
          </Row>
          <div className="mb-3 mt-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={handleCaptchaChange}
            />
          </div>
          <Btn
            className="btn btn-animation btn-md fw-bold ms-auto"
            type="submit"
            disabled={!captchaValue || isSubmitting}
          >
            {isSubmitting ? "Sending..." : t("SendMessage")}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
