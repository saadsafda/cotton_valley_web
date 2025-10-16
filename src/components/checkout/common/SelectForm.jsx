import SearchableSelectInput from "@/components/common/inputFields/SearchableSelectInput";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import { Form, Field } from "formik";
import { ModalFooter, Row, Col, Label, Input, FormGroup } from "reactstrap";
import Btn from "@/elements/buttons/Btn";
import { useContext, useEffect, useState } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";

const SelectForm = ({
  values,
  data,
  setFieldValue,
  setModal,
  isSubmitting,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Fetch state and country when pincode changes
  useEffect(() => {
    const pincode = values.pincode;
    if (pincode && pincode.length >= 5) {
      setIsLoadingLocation(true);
      // Using Zippopotam.us API to fetch location details by pincode
      fetch(`https://api.zippopotam.us/us/${pincode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.places && data.places.length > 0) {
            const locationData = data.places[0];
            if (locationData) {
              // You'll need to update these values in the parent component
              // or use a callback function passed as prop
              values.state_id = locationData.state;
              values.city = locationData["place name"];
              // Note: Country code from this API is in full name, you might need to map it to your country IDs
              values.country_id = data.country;
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching location:", error);
        })
        .finally(() => {
          setIsLoadingLocation(false);
        });
    }
  }, [values.pincode]);

  return (
    <Form>
      <Row>
        <SimpleInputField
          nameList={[
            {
              name: "street",
              placeholder: t("Enter Address"),
              toplabel: "Address",
              colprops: { xs: 12 },
              require: "true",
              disabled: isSubmitting,
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            {
              name: "pincode",
              placeholder: isLoadingLocation
                ? t("Loading...")
                : t("Enter Zip Code"),
              toplabel: "Zip Code",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: "true",
            },
            {
              name: "state_id",
              placeholder: isLoadingLocation
                ? t("Loading...")
                : t("Enter State"),
              toplabel: "State",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: "true",
            },
            {
              name: "city",
              placeholder: isLoadingLocation
                ? t("Loading...")
                : t("Enter City"),
              toplabel: "City",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              require: "true",
            },
            {
              name: "phone",
              type: "number",
              placeholder: t("Enter Phone Number"),
              require: "true",
              toplabel: "Phone",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              disabled: isSubmitting,
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
        <Col xs={12}>
          <FormGroup check className="mb-3">
            <div className="form-check ps-0 custome-form-check">
              <Input
                type="checkbox"
                id="is_default"
                name={"is_default"}
                checked={values.is_default || false}
                onChange={(e) => {
                  setFieldValue("is_default", e.target.checked);
                }}
                disabled={isSubmitting}
              />
              <Label check htmlFor="is_default" className="ms-2">
                {"Set as default address"}
              </Label>
            </div>
          </FormGroup>
        </Col>
        <ModalFooter className="ms-auto justify-content-end save-back-button">
          <Btn
            className="btn-md btn-theme-outline fw-bold"
            title="Cancel"
            onClick={() => setModal(false)}
            disabled={isSubmitting}
          />
          <Btn
            className="btn-md fw-bold text-light theme-bg-color"
            type="submit"
            title={isSubmitting ? t("Submitting...") : t("Submit")}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </ModalFooter>
      </Row>
    </Form>
  );
};

export default SelectForm;
