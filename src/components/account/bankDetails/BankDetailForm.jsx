import { useContext, useEffect, useState } from "react";
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
import SelectField from "@/components/common/inputFields/SelectField";
import { Col } from "reactstrap";

const BankDetailForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
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

  // Function to fetch location data based on zip code
  const fetchLocationByZipCode = async (zipCode, setFieldValue) => {
    if (!zipCode || zipCode.length < 5) return;

    setZipLoading(true);
    try {
      // Using Zippopotam.us API for US zip codes
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      
      if (response.ok) {
        const data = await response.json();
        const place = data.places?.[0];
        
        if (place) {
          // Auto-fill city and state
          setFieldValue("bank_city", place["place name"] || "");
          setFieldValue("bank_state", place["state abbreviation"] || place["state"] || "");
        }
      }
    } catch (error) {
      console.error("Error fetching location by zip code:", error);
    } finally {
      setZipLoading(false);
    }
  };

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
        onSubmit={async (values, { setSubmitting }) => {
          // Add Account Details Here
          setUpdateLoading(true);
          setSubmitting(true);
          try {
            await request({
              url: PaymentAccountAPI,
              method: "POST",
              data: values,
            });
            await refetch();
          } catch (error) {
            console.error("Failed to update bank details:", error);
          } finally {
            setSubmitting(false);
            setUpdateLoading(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="row g-3">
            <AccountHeading title="BankDetails" />
            <SimpleInputField
              nameList={[
                {
                  name: "bank_name",
                  type: "text",
                  placeholder: t("Enter Bank Name"),
                  title: "Bank Name",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "bank_address",
                  type: "text",
                  placeholder: t("Enter Bank Address"),
                  title: "Bank Address",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "bank_phone",
                  type: "text",
                  placeholder: t("Enter Bank Phone"),
                  title: "Bank Phone",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "bank_fax",
                  type: "text",
                  placeholder: t("Enter Bank Fax"),
                  title: "Bank Fax",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "bank_account_number",
                  type: "text",
                  placeholder: t("Enter Bank Account Number"),
                  title: "Bank Account Number",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                {
                  name: "bank_zip_code",
                  type: "text",
                  placeholder: t("Enter Bank Zip Code"),
                  title: "Bank Zip Code",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                  onBlur: (e) => {
                    const zipCode = e.target.value.trim();
                    if (zipCode) {
                      fetchLocationByZipCode(zipCode, setFieldValue);
                    }
                  },
                },
                {
                  name: "bank_city",
                  type: "text",
                  placeholder: t("Enter Bank City"),
                  title: "Bank City",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                  disabled: zipLoading,
                },
                {
                  name: "bank_state",
                  type: "text",
                  placeholder: t("Enter Bank State"),
                  title: "Bank State",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                  disabled: zipLoading,
                },
                {
                  name: "bank_email",
                  type: "email",
                  placeholder: t("Enter Bank Email"),
                  title: "Bank Email",
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
              ]}
            />
            <Col lg={6} md={12} sm={12}>
              <SelectField
                name="bank_account_type"
                label="Account Type "
                require="true"
                notitle="true"
                inputprops={{
                  id: "bank_account_type",
                  name: "bank_account_type",
                  options: [
                    { id: "", name: "Select" },
                    { id: "Saving", name: "Saving" },
                    { id: "Checking", name: "Checking" },
                    { id: "Other", name: "Other" },
                  ],
                }}
              />
            </Col>
            {/* <AccountHeading title='PayPalDetails' />
          <SimpleInputField nameList={[{ name: 'paypal_email', type: 'email', placeholder: t('EnterPaypalEmail'), title: 'PaypalEmail' }]} /> */}
            <div className="text-end">
              <Btn
                type="submit"
                disabled={isSubmitting || updateLoading}
                className="theme-bg-color btn-md d-inline-block"
                title={updateLoading ? "Updating..." : "Update"}
              ></Btn>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BankDetailForm;
