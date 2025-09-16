"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { Col, Input, Label, ModalBody, ModalHeader } from "reactstrap";
import Avatar from "@/components/common/Avatar";
import Btn from "@/elements/buttons/Btn";
import { placeHolderImage } from "../../../../data/CommonPath";
import CustomModal from "@/components/common/CustomModal";
import ProductContext from "@/helper/productContext";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SettingContext from "@/helper/settingContext";
import { usePathname } from "next/navigation";
import { Form, Formik } from "formik";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import FormBtn from "@/components/common/FormBtn";
import { LogInSchema } from "@/utils/hooks/auth/useLogin";
import SelectField from "@/components/common/inputFields/SelectField";
import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import { AllCountryCode } from "@/data/AllCountryCode";
import {
  emailSchema,
  nameSchema,
  YupObject,
} from "@/utils/validation/ValidationSchemas";
import { string } from "yup";
import request from "@/utils/axiosUtils";

export const LeadFormSchema = YupObject({
  name: nameSchema,
  business_type: string().required("Business type is required"),
  company_name: string().required("Company name is required"),
  phone: string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(7, "Phone number must be at least 7 digits")
    .max(10, "Phone number must be at most 10 digits"),
  square_footage: string(),
  email: emailSchema,
});

const HeaderDealModal = ({ setModal, modal, data }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  const path = usePathname();
  useEffect(() => {
    setModal(false);
  }, [path]);
  return (
    <CustomModal
      modal={modal}
      setModal={setModal}
      classes={{
        modalClass:
          "theme-modal deal-modal modal-dialog modal-dialog-centered modal-fullscreen-sm-down",
        customChildren: true,
      }}
    >
      <ModalHeader>
        <div>
          <h5 className="modal-title w-100">{t("DealToday")}</h5>
          <p className="mt-1 text-content">{t("RecommendedDealsForYou")}.</p>
        </div>
        <Btn
          type="button"
          className="btn-close"
          onClick={() => setModal(false)}
        ></Btn>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{}}
          validationSchema={LeadFormSchema}
          onSubmit={(values, { setStatus }) => {
            request({
              url: "/lead",
              method: "POST",
              data: {
                ...values,
              },
            });
          }}
        >
          {({
            status,
            values,
            setFieldValue,
            validateForm,
            setFieldTouched,
            handleSubmit,
          }) => {
            return (
              <Form
                className="row"
                onSubmit={(e) => {
                  e.preventDefault();
                  validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      // No errors, submit the form
                      handleSubmit(e);
                    } else {
                      // There are errors, mark all fields as touched to show validation messages
                      Object.keys(errors).forEach((field) => {
                        setFieldTouched(field, true);
                      });
                      console.log("Form has errors:", errors);
                    }
                  });
                }}
              >
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
                      name: "name",
                      placeholder: t("Name"),
                      title: "Name",
                      label: "Name *",
                    },
                    {
                      name: "email",
                      placeholder: t("EmailAddress"),
                      title: "Email",
                      label: "Email Address *",
                    },
                    {
                      name: "company_name",
                      placeholder: t("CompanyName"),
                      title: "Company Name",
                      label: "Company Name *",
                    },
                    {
                      name: "phone",
                      placeholder: t("PhoneNumber"),
                      title: "Phone Number",
                      label: "Phone Number *",
                      type: "number",
                    },
                    {
                      name: "square_footage",
                      placeholder: t("StoreArea"),
                      title: "Square Footage",
                      label: "Square Footage",
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
                </div>

                <FormBtn
                  title={"Submit"}
                  classes={{ btnClass: "btn btn-animation w-100" }}
                />
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </CustomModal>
  );
};

export default HeaderDealModal;
