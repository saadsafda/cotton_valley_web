import ConfirmDeleteModal from '@/components/common/ConfirmDeleteModal';
import Btn from '@/elements/buttons/Btn';
import { useState } from 'react';
import { RiDeleteBinLine, RiEditBoxLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import AddressTable from './AddressTable';
import request from '@/utils/axiosUtils';

const AddressData = ({ addressState, setAddressState, modal, setModal, setEditAddress }) => {
  const [deleteId, setDeleteId] = useState('');
  const removeAddress = async () => {
    // Add remove address login here
    setAddressState((prev) => prev.filter((elem) => elem.id !== deleteId));
    setModal('');

    await request({
      method: 'DELETE',
      url: `/address`,
      data: { id: deleteId },
    });

  };
  return (
    <Row className='g-sm-4 g-3'>
      {addressState?.map((address, i) => (
        <Col xxl={4} xl={6} lg={12} md={6} key={i}>
          <div className='address-box'>
            <AddressTable address={address} />
            <div className='button-group'>
              <Btn
                className='btn-sm add-button'
                title={'Edit'}
                onClick={() => {
                  setEditAddress(address);
                  setModal('edit');
                }}>
                <RiEditBoxLine />
              </Btn>
              <Btn
                className='btn-sm add-button'
                title={'Remove'}
                onClick={() => {
                  setDeleteId(address?.id);
                  setModal('remove');
                }}>
                <RiDeleteBinLine />
              </Btn>
            </div>
          </div>
        </Col>
      ))}
      <ConfirmDeleteModal modal={modal == 'remove'} setModal={setModal} confirmFunction={removeAddress} setDeleteId={setDeleteId} />
    </Row>
  );
};

export default AddressData;
