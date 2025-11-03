import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import Btn from "@/elements/buttons/Btn";
import { useState } from "react";
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import AddressTable from "./AddressTable";
import request from "@/utils/axiosUtils";
import AccountContext from "@/helper/accountContext";

const AddressData = ({
  addressState,
  setAddressState,
  modal,
  setModal,
  setEditAddress,
}) => {
  const [deleteId, setDeleteId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { accountData, setAccountData } = useContext(AccountContext);

  const removeAddress = async () => {
    setIsDeleting(true);
    try {
      // Call API to delete address
      await request({
        method: "DELETE",
        url: `/address`,
        data: { id: deleteId },
      });

      // Only after successful API call, remove from local state
      setAddressState((prev) => prev.filter((elem) => elem.id !== deleteId));

      // Update AccountContext to remove the deleted address
      if (accountData?.address) {
        setAccountData((prev) => ({
          ...prev,
          address: prev.address.filter((elem) => elem.id !== deleteId),
        }));
      }

      setModal("");
    } catch (error) {
      console.error("Failed to delete address:", error);
      // Optionally show error message to user
      alert("Failed to delete address. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Row className="g-sm-4 g-3">
      {addressState?.map((address, i) => (
        <Col xxl={4} xl={6} lg={12} md={6} key={i}>
          <div className="address-box">
            <AddressTable address={address} />
            <div className="button-group">
              <Btn
                className="btn-sm add-button"
                title={"Edit"}
                onClick={() => {
                  setEditAddress(address);
                  setModal("edit");
                }}
              >
                <RiEditBoxLine />
              </Btn>
              <Btn
                className="btn-sm add-button"
                title={"Remove"}
                onClick={() => {
                  setDeleteId(address?.id);
                  setModal("remove");
                }}
              >
                <RiDeleteBinLine />
              </Btn>
            </div>
          </div>
        </Col>
      ))}
      <ConfirmDeleteModal
        modal={modal == "remove"}
        setModal={setModal}
        confirmFunction={removeAddress}
        setDeleteId={setDeleteId}
        loading={isDeleting}
      />
    </Row>
  );
};

export default AddressData;
