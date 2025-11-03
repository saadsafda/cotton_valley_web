import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import FormBtn from "@/components/common/FormBtn";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import I18NextContext from "@/helper/i18NextContext";
import useHandleForgotPassword, {
  ForgotPasswordSchema,
} from "@/utils/hooks/auth/useForgotPassword";
import { useTranslation } from "@/app/i18n/client";

const ForgotPasswordForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useHandleForgotPassword();
  
  const handleSubmit = (values) => {
    setIsLoading(true);
    mutate(values, {
      onSuccess: () => {
        // Loading will be reset after redirect, but we can keep it true
        // since user is being redirected anyway
      },
      onError: () => {
        setIsLoading(false);
      },
      onSettled: () => {
        // This runs after both success and error
        // Keep loading true on success since we're redirecting
        // Only reset on error (already handled above)
      }
    });
  };
  
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="row g-4">
            <SimpleInputField
              nameList={[
                {
                  name: "email",
                  placeholder: t("EmailAddress"),
                  title: "Email",
                  label: "Email Address",
                },
              ]}
            />
            <FormBtn
              title={"ForgotPassword"}
              classes={{
                btnClass: "btn-animation w-100 justify-content-center",
              }}
              loading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
