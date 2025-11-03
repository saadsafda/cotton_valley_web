import { Form, Formik } from "formik";
import Link from "next/link";
import { Col, Input, Label, Alert } from "reactstrap";
import FormBtn from "@/components/common/FormBtn";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import useHandleLogin, { LogInSchema } from "@/utils/hooks/auth/useLogin";
import { useContext, useEffect, useState } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { RiErrorWarningLine } from "react-icons/ri";

const LoginForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState({
    email: "",
    password: "",
  });
  const { mutate } = useHandleLogin();

  // Load saved credentials on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rememberMe");
      if (saved) {
        const { email, password, remember } = JSON.parse(saved);
        setSavedCredentials({ email: email || "", password: password || "" });
        setRememberMe(remember || false);
      }
    } catch (error) {
      console.error("Error loading saved credentials:", error);
    }
  }, []);

  return (
    <Formik
      initialValues={{
        email: savedCredentials.email,
        password: savedCredentials.password,
      }}
      enableReinitialize={true}
      validationSchema={LogInSchema}
      onSubmit={(values, { setStatus }) => {
        setIsLoading(true);
        setStatus(undefined);

        // Save or clear credentials based on rememberMe
        try {
          if (rememberMe) {
            localStorage.setItem(
              "rememberMe",
              JSON.stringify({
                email: values.email,
                password: values.password,
                remember: true,
              })
            );
          } else {
            localStorage.removeItem("rememberMe");
          }
        } catch (error) {
          console.error("Error saving credentials:", error);
        }

        mutate(values, {
          onSuccess: (data) => {
            setIsLoading(false);
          },
          onError: (error) => {
            let msg = "Login failed. Please try again.";
            if (error?.response?.data?.message) {
              msg = error.response.data.message;
            } else if (error?.message) {
              msg = error.message;
            }
            setStatus(msg);
            setIsLoading(false);
          },
        });
      }}
    >
      {({ status }) => {
        return (
          <Form className="row g-4">
            {status && (
              <Col xs={12}>
                <Alert color="danger" className="d-flex align-items-center mb-0" style={{ 
                  borderRadius: '8px',
                  border: '1px solid #f8d7da',
                  backgroundColor: '#f8d7da',
                  padding: '12px 16px'
                }}>
                  <RiErrorWarningLine size={20} className="me-2" style={{ minWidth: '20px', color: '#842029' }} />
                  <span style={{ color: '#842029', fontSize: '14px' }}>{status}</span>
                </Alert>
              </Col>
            )}
            <SimpleInputField
              nameList={[
                {
                  name: "email",
                  placeholder: t("EmailAddress"),
                  title: "Email",
                  label: "Email Address",
                },
                {
                  name: "password",
                  placeholder: t("EnterPassword"),
                  type: "password",
                  title: "Password",
                  label: "Password",
                },
              ]}
            />
            <Col xs={12}>
              <div className="forgot-box">
                <div className="form-check remember-box">
                  <Input
                    className="checkbox_animated check-box"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {t("RememberMe")}
                  </Label>
                </div>
                <Link
                  href={`/${i18Lang}/auth/forgot-password`}
                  className="forgot-password"
                >
                  {t("ForgotPassword")}?
                </Link>
              </div>
            </Col>
            <FormBtn
              title={isLoading ? "LoggingIn..." : "LogIn"}
              classes={{ btnClass: "btn btn-animation w-100" }}
              loading={isLoading}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
