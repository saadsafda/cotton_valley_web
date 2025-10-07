import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ModalHeader } from "reactstrap";
import CustomModal from "@/components/common/CustomModal";
import Cookies from "js-cookie";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { placeHolderImage } from "@/data/CommonPath";

const NewsLetterModal = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [modal, setModal] = useState(true);
  useEffect(() => {
    const newsLetterModal = Cookies.get("newsLetterModal");
    if (newsLetterModal) {
      setModal(false);
    }
  }, []);
  const extraFunction = () => {
    Cookies.set("newsLetterModal", JSON.stringify(true));
    setModal(false);
  };
  return (
    <>
      <CustomModal
        extraFunction={extraFunction}
        modal={modal}
        setModal={setModal}
        classes={{
          customChildren: true,
          modalClass: "modal-lg newsletter-modal theme-modal",
        }}
      >
        <ModalHeader className="p-0" toggle={extraFunction} />
        <div className="modal-box">
          <div className="modal-image">
            <Image
              src={
                themeOption?.newsletter_modal?.image?.original_url ||
                placeHolderImage
              }
              className="img-fluid"
              alt="NewsLetter Image"
              width={400}
              height={361}
            />
          </div>
          <div className="modal-content content-padding">
            {/* html description */}
            <div
              dangerouslySetInnerHTML={
                themeOption?.newsletter_modal?.description
                  ? { __html: themeOption.newsletter_modal.description }
                  : undefined
              }
            />
            {/* <div>
              <Image src={Logo} className='modal-logo' alt='newsletter' height={17} width={100} />
              <h2>
                15% <span>off</span>
              </h2>
              <h5>{t('NewsLetterTitle')}</h5>
              <p>{t('NewsLetterDescription')}</p>
              <Form className='modal-form'>
                <InputGroup className='modal-form-box'>
                  <Input type='email' placeholder='Your email here' />
                  <Btn className='input-group-text' type='button' title='Submit' onClick={() => setModal(false)} />
                </InputGroup>
              </Form>
            </div> */}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default NewsLetterModal;
