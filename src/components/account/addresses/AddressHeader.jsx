import Btn from '@/elements/buttons/Btn';
import { RiAddLine } from 'react-icons/ri';
import AddressData from './AddressData';
import { useContext, useEffect, useState } from 'react';
import AccountContext from '@/helper/accountContext';
import CustomModal from '@/components/common/CustomModal';
import AddAddressForm from '@/components/checkout/common/AddAddressForm';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import request from '@/utils/axiosUtils';

const AddressHeader = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [addressState, setAddressState] = useState([]);
  const [editAddress, setEditAddress] = useState();
  const [modal, setModal] = useState('');
  const { accountData } = useContext(AccountContext);

  
  useEffect(() => {
    accountData?.address?.length > 0 && setAddressState((prev) => [...accountData?.address]);
  }, [accountData]);

  const addAddress = (values) => {
    const response = request({
      method: 'POST',
      url: '/address',
      data: {
        address: {
          "address_title": values.title,
          "address_type": values.address_type,
          "address_line1": values.street,
          "city": values.city,
          "state": values.state_id,
          "pincode": values.pincode,
          "country": values.country_id,
          "phone": values.phone,
          "email_id": values.email_id,
        }
      },
    });
    response.then((res) => {
      setAddressState((prev) => [...prev, res?.data]);
      setModal('');
    });
  }
  const editMutate = (values) => {
    console.log(values, "values");
    
    const response = request({
      method: 'PUT',
      url: '/address',
      data: {
        address: {
          "id": values.id,
          "address_title": values.title,
          "address_type": values.address_type,
          "address_line1": values.street,
          "city": values.city,
          "state": values.state_id,
          "pincode": values.pincode,
          "country": values.country_id,
          "phone": values.phone,
          "email_id": values.email_id,
        }
      },
    });
    response.then((res) => {
      setAddressState((prev) => prev.map((item) => (item.id === res?.data.id ? res?.data : item)));
      setModal('');
    });
  }

  return (
    <>
      <div className='dashboard-address'>
        <div className='title-header'>
          <div className='d-flex align-items-center w-100 justify-content-between'>
            <h5>{t("SavedAddress")}</h5>
            <Btn className='theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3 ms-auto' onClick={() => setModal('add')} title={'Add Address'}>
              <RiAddLine />
            </Btn>
          </div>
        </div>
        <AddressData addressState={addressState} setAddressState={setAddressState} modal={modal} setModal={setModal} setEditAddress={setEditAddress} />
      </div>
      <div className='checkout-detail'>
        <CustomModal modal={modal == 'add' || modal == 'edit' ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal address-modal modal-lg', modalHeaderClass: 'p-0' }}>
          <div className='right-sidebar-box'>
            <AddAddressForm
              mutate={modal == 'add' ? addAddress : editMutate}
              setModal={setModal}
              setEditAddress={setEditAddress}
              editAddress={editAddress}
              modal={modal}
              setAddressState={setAddressState}
            />
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default AddressHeader;
