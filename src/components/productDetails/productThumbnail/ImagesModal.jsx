import CustomModal from "@/components/common/CustomModal";
import { viewModalSliderOption } from "@/data/SliderSettings";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";

const ImagesModal = ({ productObj, variationModal, setVariationModal }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  return (
    <CustomModal
      modal={productObj?.product?.id == variationModal}
      setModal={setVariationModal}
      classes={{
        modalClass: "view-modal modal-lg theme-modal",
        modalHeaderClass: "p-0",
      }}
    >
      <Col lg="12">
        <div className="view-image-slider">
          <Slider asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
            {productObj?.product?.product_galleries?.map((item, i) => (
              <div className="slider-image flex-centerlize" key={i}>
                <Image
                  src={item ? item?.original_url || item : placeHolderImage}
                  className="img-fluid"
                  alt={productObj?.product?.item_code ?? "image"}
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="thumbnail-slider">
          <Slider
            {...viewModalSliderOption}
            slidesToShow={productObj?.product?.product_galleries?.length - 1}
            asNavFor={nav1}
            ref={(slider) => (slider2.current = slider)}
          >
            {productObj?.product?.product_galleries?.map((item, i) => (
              <div className="slider-image" key={i}>
                <div className="thumbnail-image">
                  <Image
                    src={item ? item?.original_url || item : placeHolderImage}
                    className="img-fluid"
                    alt={productObj?.product?.name ?? "image"}
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Col>
    </CustomModal>
  );
};

export default ImagesModal;
