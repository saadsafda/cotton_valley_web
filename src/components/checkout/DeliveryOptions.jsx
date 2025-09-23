import React, { useContext, useEffect, useState } from "react";
import { RiTruckLine } from "react-icons/ri";
import { Col, Input, Label, Row } from "reactstrap";
import CheckoutCard from "./common/CheckoutCard";
import { useTranslation } from "@/app/i18n/client";
import SettingContext from "@/helper/settingContext";
import I18NextContext from "@/helper/i18NextContext";

const DeliveryOptions = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [defaultDe, setDefaultDe] = useState(0);
  useEffect(() => {
    setFieldValue("delivery_description", "Pickup");
    setDefaultDe(1);
  }, []);

  return (
    <CheckoutCard icon={<RiTruckLine />}>
      <div className="checkout-title">
        <h4>{t("Shipping Method")}</h4>
      </div>
      <div className="checkout-detail">
        <Row className="g-4">
          {[
            "Pickup",
            "TBD: Our Representive will call you to share the Shipping Pricing",
          ].map((option, index) => (
            <Col xxl={6} key={index}>
              <div className="delivery-option">
                <div className="delivery-category">
                  <div className="shipment-detail w-100">
                    <div className="form-check custom-form-check hide-check-box">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="standard"
                        checked={defaultDe == index + 1}
                        id={`standard${index + 1}`}
                        onChange={() => {
                          setFieldValue("delivery_description", option);
                          setFieldValue("isTimeSlot", false);
                          setFieldValue("delivery_interval", null);
                          setDefaultDe(index + 1);
                        }}
                      />
                      <Label
                        className="form-check-label"
                        htmlFor={`standard${index + 1}`}
                      >
                        {option}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
          {/* {settingData?.delivery?.same_day_delivery && (
                    <Input className='form-check-input' type='radio' name='standard' checked={defaultDe == 1} id='standard1' onChange={() => {setFieldValue('delivery_description', `${settingData?.delivery?.default?.title} | ${settingData?.delivery?.default?.description}`);setFieldValue('isTimeSlot', false);setFieldValue('delivery_interval', null);setDefaultDe(1);}}/>
                    <Label className='form-check-label' htmlFor='standard1'>
                      {settingData?.delivery?.default?.title} | {settingData?.delivery?.default?.description}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* {settingData?.delivery?.same_day_delivery && (
            <>
              <Col xxl={6}>
                <div className='delivery-option'>
                  <div className='delivery-category'>
                    <div className='shipment-detail w-100'>
                      <div className='form-check custom-form-check hide-check-box'>
                        <Input
                          className='form-check-input'
                          type='radio'
                          name='standard'
                          id='standard2'
                          checked={defaultDe == 2}
                          onChange={() => {
                            setFieldValue('delivery_description', `${settingData?.delivery?.same_day?.title} | ${settingData?.delivery?.same_day?.description}`);
                            setFieldValue('isTimeSlot', true);
                            setFieldValue('delivery_interval', null);
                            setDefaultDe(2);
                          }}
                        />
                        <Label className='form-check-label' htmlFor='standard2'>
                          {settingData?.delivery?.same_day?.title} | {settingData?.delivery?.same_day?.description}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs='12' className={`future-box ${values['isTimeSlot'] ? 'show' : ''}`}>
                <div className='future-option'>
                  <div className='delivery-items'>
                    <div>
                      <h4>{t('SelectTimingSlot')}:</h4>
                      <ul>
                        {settingData?.delivery?.same_day_intervals.length > 0 &&
                          settingData?.delivery?.same_day_intervals.map((elem, i) => (
                            <li className={`${values['delivery_interval'] == elem?.description ? 'active' : ''}`} onClick={() => {setFieldValue('delivery_interval', elem?.description);
                              }}
                              key={i}>
                              <a>{elem?.description}</a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          )} */}
        </Row>
      </div>
    </CheckoutCard>
  );
};

export default DeliveryOptions;
