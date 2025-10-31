import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import CustomModal from "@/components/common/CustomModal";
import AccountContext from "@/helper/accountContext";
import {
  YupObject,
  nameSchema,
  passwordSchema,
  passwordConfirmationSchema,
} from "@/utils/validation/ValidationSchemas";
import EmailPasswordForm from "./EmailPasswordForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import request from "@/utils/axiosUtils";

const EmailPasswordModal = ({ modal, setModal }) => {
  const { accountData, setAccountData } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <CustomModal
        modal={modal == "email" || modal == "password" ? true : false}
        setModal={setModal}
        classes={{
          modalClass: "theme-modal",
          modalBodyClass: "address-form",
          title: `${modal == "email" ? "Edit Profile" : "ChangePassword"}`,
        }}
      >
        <Formik
          initialValues={{
            name: accountData?.name || "",
            email: accountData?.email,
            country_code: accountData?.country_code || "91",
            phone: accountData?.phone || "",
            current_password: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={YupObject({
            name: nameSchema,
            country_code: nameSchema,
            phone: nameSchema,
            current_password: nameSchema,
            password: passwordSchema,
            password_confirmation: passwordConfirmationSchema,
          })}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
              if (modal == "password") {
                // Check if passwords match
                if (values.password !== values.password_confirmation) {
                  ToastNotification(
                    "error",
                    "New password and confirmation password do not match"
                  );
                  setIsLoading(false);
                  return;
                }

                // Change password
                const response = await request({
                  url: "/change-password",
                  method: "POST",
                  data: {
                    current_password: values.current_password,
                    new_password: values.password,
                  },
                });

                if (response?.data?.status === "success") {
                  ToastNotification(
                    "success",
                    response?.data?.message || "Password changed successfully"
                  );
                  setModal("");
                } else {
                  ToastNotification(
                    "error",
                    response.message || "Failed to change password"
                  );
                }
              } else {
                // Update email/profile - Add your implementation here
                // let emailObj = {
                //   name: values['name'],
                //   email: values['email'],
                //   country_code: values['country_code'],
                //   phone: values['phone'],
                //   _method: 'PUT'
                // };
                // Call your profile update API here
                setModal("");
              }
            } catch (error) {
              ToastNotification(
                "error",
                error?.response?.data?.message || "An error occurred"
              );
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <Form>
            {/* {modal == 'email' && <EmailPasswordForm setModal={setModal} isLoading={isLoading} />} */}
            {modal == "password" && (
              <UpdatePasswordForm setModal={setModal} isLoading={isLoading} />
            )}
          </Form>
        </Formik>
      </CustomModal>
    </>
  );
};

export default EmailPasswordModal;
