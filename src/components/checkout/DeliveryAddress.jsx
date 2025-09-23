import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import { RiAddLine, RiMapPinLine } from 'react-icons/ri';
import { useTranslation } from '@/app/i18n/client';
import CheckoutCard from './common/CheckoutCard';
import CustomModal from '../common/CustomModal';
import AddAddressForm from './common/AddAddressForm';
import I18NextContext from '@/helper/i18NextContext';
import ShowAddress from './ShowAddress';

const DeliveryAddress = ({ type, title, address, modal, mutate, setModal, setFieldValue, values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (address?.length > 0) {
      const firstAddressId = address[0].id;
      console.log('Selected address ID:', firstAddressId);
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

  // Get selected address or show all addresses
  const displayAddresses = showAllAddresses 
    ? address.filter(addr => addr?.address_type.toLowerCase() == type.toLowerCase())
    : address?.filter(addr => addr.id === selectedAddressId && addr.address_type.toLowerCase() == type.toLowerCase()) || [];

  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className='checkout-title'>
          <h4>
            {t(title)}
          </h4>
          <div className="d-flex gap-2">
            {address?.length > 1 && !showAllAddresses && (
              <a className='d-flex align-items-center fw-bold' onClick={() => setShowAllAddresses(true)}>
                {t('Change')}
              </a>
            )}
            {showAllAddresses && (
              <a className='d-flex align-items-center fw-bold' onClick={() => setShowAllAddresses(false)}>
                {t('Done')}
              </a>
            )}
            <a className='d-flex align-items-center fw-bold' onClick={() => setModal(type)}>
              <RiAddLine className='me-1'></RiAddLine>
              {t('AddNew')}
            </a>
          </div>
        </div>
        <div className='checkout-detail'>
          {
            <>
              {displayAddresses?.length > 0 ? (
                <Row className='g-4'>
                  {displayAddresses?.map((item, i) => (
                    <ShowAddress item={item} key={i} type={type} index={i} onClick={() => setShowAllAddresses(false)} />
                  ))}
                </Row>
              ) : (
                <div className='empty-box'>
                  <h2>{t('NoAddressFound')}</h2>
                </div>
              )}
            </>
          }
          <CustomModal modal={modal == type ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal modal-lg', modalHeaderClass: 'p-0' }}>
            <div className='right-sidebar-box'>
              <AddAddressForm mutate={mutate} setModal={setModal} type={type} />
            </div>
          </CustomModal>
        </div>
      </CheckoutCard>
    </>
  );
};

export default DeliveryAddress;
