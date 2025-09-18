import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import { Form } from "formik";
import { ModalFooter, Row } from "reactstrap";
import { AllCountryCode } from "../../../data/AllCountryCode";
import Btn from "@/elements/buttons/Btn";
import { useContext, useEffect } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";

const SelectForm = ({ values, data, setModal }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  
  // Fetch state and country when pincode changes
  useEffect(() => {
    const pincode = values.pincode;
    if (pincode && pincode.length >= 5) {
      // Using Zippopotam.us API to fetch location details by pincode
      fetch(`https://api.zippopotam.us/us/${pincode}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.places && data.places.length > 0) {
            const locationData = data.places[0];
            if (locationData) {
              // You'll need to update these values in the parent component
              // or use a callback function passed as prop
              values.state_id = locationData.state;
              values.city = locationData['place name'];
              // Note: Country code from this API is in full name, you might need to map it to your country IDs
              values.country_id = data.country;
            }
          }
        })
        .catch(error => {
          console.error("Error fetching location:", error);
        });
    }
  }, [values.pincode]);
  
  return (
    <Form>
      <Row>
        <SimpleInputField
          nameList={[
            {
              name: "title",
              placeholder: t("EnterTitle"),
              toplabel: "Title",
              colprops: { xs: 12 },
              require: "true",
            },
            {
              name: "street",
              placeholder: t("EnterAddress"),
              toplabel: "Address",
              colprops: { xs: 12 },
              require: "true",
            },
          ]}
        />
        <SearchableSelectInput
          nameList={[
            {
              name: "country_id",
              require: "true",
              title: "Country",
              toplabel: "Country",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: "country_id",
                id: "country_id",
                options: data,
                defaultOption: "Select state",
              },
            },
            {
              name: "address_type",
              require: "true",
              title: "Address Type",
              toplabel: "Address Type",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: "address_type",
                id: "address_type",
                options: [
                  { id: "Shipping", name: "Shipping" },
                  { id: "Billing", name: "Billing" },
                ],
                defaultOption: "Select Address Type",
              },
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            {
              name: "state_id",
              placeholder: t("EnterState"),
              toplabel: "State",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: "true",
            },
            {
              name: "city",
              placeholder: t("EnterCity"),
              toplabel: "City",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: "true",
            },
            {
              name: "pincode",
              placeholder: t("EnterPincode"),
              toplabel: "Pincode",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: "true",
            },
            {
                name: "phone",
                type: "number",
                placeholder: t("EnterPhoneNumber"),
                require: "true",
                toplabel: "Phone",
                colprops: { xxl: 6, lg: 12, sm: 6 },
              },
          ]}
        />
        <ModalFooter className="ms-auto justify-content-end save-back-button">
          <Btn
            className="btn-md btn-theme-outline fw-bold"
            title="Cancel"
            onClick={() => setModal(false)}
          />
          <Btn
            className="btn-md fw-bold text-light theme-bg-color"
            type="submit"
            title="Submit"
          />
        </ModalFooter>
      </Row>
    </Form>
  );
};

export default SelectForm;
