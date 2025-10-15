import { useContext, useEffect } from "react";
import { Form, Formik } from "formik";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import Btn from "@/elements/buttons/Btn";
import { PaymentAccountAPI } from "@/utils/axiosUtils/API";
import request from "@/utils/axiosUtils";
import { useQuery } from "@tanstack/react-query";
import AccountHeading from "@/components/common/AccountHeading";
import Loader from "@/layout/loader";

const BankDetailForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const {
    data,
    refetch,
    isLoading: paymentLoader,
  } = useQuery({
    queryKey: [PaymentAccountAPI],
    queryFn: () => request({ url: PaymentAccountAPI }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, []);
  if (paymentLoader) return <Loader />;
  return (
    <>
      <Formik
        initialValues={{
          bank_name: data ? data?.bank_name : "",
          bank_address: data ? data?.bank_address : "",
          bank_phone: data ? data?.bank_phone : "",
          bank_fax: data ? data?.bank_fax : "",
          bank_account_number: data ? data?.bank_account_number : "",
          bank_city: data ? data?.bank_city : "",
          bank_state: data ? data?.bank_state : "",
          bank_zip_code: data ? data?.bank_zip_code : "",
          bank_account_type: data ? data?.bank_account_type : "",
          bank_email: data ? data?.bank_email : "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Add Account Details Here
          setSubmitting(true);
          request({
            url: PaymentAccountAPI,
            method: "POST",
            data: values,
          }).then(() => {
            refetch();
            setSubmitting(false);
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="themeform-auth">
            <AccountHeading title="BankDetails" />
            <SimpleInputField
              nameList={[
                {
                  name: "bank_name",
                  type: "text",
                  placeholder: t("Enter Bank Name"),
                  title: "Bank Name",
                },
                {
                  name: "bank_address",
                  type: "text",
                  placeholder: t("Enter Bank Address"),
                  title: "Bank Address",
                },
                {
                  name: "bank_phone",
                  type: "text",
                  placeholder: t("Enter Bank Phone"),
                  title: "Bank Phone",
                },
                {
                  name: "bank_fax",
                  type: "text",
                  placeholder: t("Enter Bank Fax"),
                  title: "Bank Fax",
                },
                {
                  name: "bank_account_number",
                  type: "text",
                  placeholder: t("Enter Bank Account Number"),
                  title: "Bank Account Number",
                },
                {
                  name: "bank_city",
                  type: "text",
                  placeholder: t("Enter Bank City"),
                  title: "Bank City",
                },
                {
                  name: "bank_state",
                  type: "text",
                  placeholder: t("Enter Bank State"),
                  title: "Bank State",
                },
                {
                  name: "bank_zip_code",
                  type: "text",
                  placeholder: t("Enter Bank Zip Code"),
                  title: "Bank Zip Code",
                },
                {
                  name: "bank_account_type",
                  type: "text",
                  placeholder: t("Enter Bank Account Type"),
                  title: "Bank Account Type",
                },
                {
                  name: "bank_email",
                  type: "email",
                  placeholder: t("Enter Bank Email"),
                  title: "Bank Email",
                },
              ]}
            />
            {/* <AccountHeading title='PayPalDetails' />
          <SimpleInputField nameList={[{ name: 'paypal_email', type: 'email', placeholder: t('EnterPaypalEmail'), title: 'PaypalEmail' }]} /> */}
            <div className="text-end">
              <Btn
                type="submit"
                disabled={isSubmitting}
                className="theme-bg-color btn-md d-inline-block"
                title="Save"
              ></Btn>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BankDetailForm;
