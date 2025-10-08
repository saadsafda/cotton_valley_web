import { Form, Formik } from "formik";
import Link from "next/link";
import { Col, Input, Label } from "reactstrap";
import FormBtn from "@/components/common/FormBtn";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import useHandleLogin, { LogInSchema } from "@/utils/hooks/auth/useLogin";
import { useContext, useState } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";

const LoginForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useHandleLogin();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LogInSchema}
      onSubmit={(values, { setStatus }) => {
        setIsLoading(true);
        setStatus(undefined);
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
        if (isLoading) {
          return (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                fontWeight: 500,
                fontSize: "1.2rem",
              }}
            >
              Loading...
            </div>
          );
        }
        return (
          <Form className="row g-4">
            {status && (
              <Col xs={12}>
                <div
                  style={{
                    color: "red",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  {status}
                </div>
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
