import React, { useContext, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { RiAddLine, RiMapPinLine } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import CheckoutCard from "./common/CheckoutCard";
import CustomModal from "../common/CustomModal";
import AddAddressForm from "./common/AddAddressForm";
import I18NextContext from "@/helper/i18NextContext";
import ShowAddress from "./ShowAddress";

const DeliveryAddress = ({
  type,
  title,
  address,
  modal,
  mutate,
  setModal,
  setFieldValue,
  values,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (address?.length > 0) {
      let firstAddressId;
      firstAddressId = address.filter(
        (addr) =>
          addr?.address_type.toLowerCase() == type.toLowerCase() &&
          addr?.is_default
      )?.[0]?.id;
      if (!firstAddressId) {
        firstAddressId = address.filter(
          (addr) => addr?.address_type.toLowerCase() == type.toLowerCase()
        )?.[0]?.id;
      }
      setSelectedAddressId(firstAddressId);
      setFieldValue(`${type}_address_id`, firstAddressId);
    }
  }, [address]);

  // Sync with form values if they change externally
  useEffect(() => {
    const formValue = values?.[`${type}_address_id`];
    if (formValue && formValue !== selectedAddressId) {
      setSelectedAddressId(formValue);
      setFieldValue(`${type}_address_id`, formValue);
    }
  }, [values?.[`${type}_address_id`]]);

  const addressList = address.filter(
    (addr) => addr?.address_type.toLowerCase() == type.toLowerCase()
  );

  let currentAddresses;

  if (showAllAddresses) {
    currentAddresses = addressList;
  } else if (selectedAddressId) {
    currentAddresses = addressList.filter(
      (addr) => addr.id === selectedAddressId
    );
  } else {
    // If no selectedId, just show the first address (as an array)
    currentAddresses = addressList.length > 0 ? [addressList[0]] : [];
  }

  const displayAddresses = currentAddresses;

  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className="checkout-title">
          <h4>{t(title)}</h4>
          <div className="d-flex gap-2">
            {address?.length > 1 && !showAllAddresses && (
              <a
                className="d-flex align-items-center fw-bold"
                onClick={() => setShowAllAddresses(true)}
              >
                {t("Change")}
              </a>
            )}
            {showAllAddresses && (
              <a
                className="d-flex align-items-center fw-bold"
                onClick={() => setShowAllAddresses(false)}
              >
                {t("Done")}
              </a>
            )}
            <a
              className="d-flex align-items-center fw-bold"
              onClick={() => setModal(type)}
            >
              <RiAddLine className="me-1"></RiAddLine>
              {t("AddNew")}
            </a>
          </div>
        </div>
        <div className="checkout-detail">
          {
            <>
              {displayAddresses?.length > 0 ? (
                <Row className="g-4">
                  {displayAddresses?.map((item, i) => (
                    <ShowAddress
                      item={item}
                      key={item.id}
                      type={type}
                      index={i}
                      onClick={() => setShowAllAddresses(false)}
                    />
                  ))}
                </Row>
              ) : (
                <div className="empty-box">
                  <h2>{t("NoAddressFound")}</h2>
                </div>
              )}
            </>
          }
          <CustomModal
            modal={modal == type ? true : false}
            setModal={setModal}
            classes={{
              modalClass: "theme-modal view-modal modal-lg",
              modalHeaderClass: "p-0",
            }}
          >
            <div className="right-sidebar-box">
              <AddAddressForm mutate={mutate} setModal={setModal} type={type} />
            </div>
          </CustomModal>
        </div>
      </CheckoutCard>
    </>
  );
};

export default DeliveryAddress;
