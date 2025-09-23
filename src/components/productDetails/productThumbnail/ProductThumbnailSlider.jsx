import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import { productDetailSlider } from "../../../data/SliderSettings";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { placeHolderImage } from "@/data/CommonPath";
import ImagesModal from "./ImagesModal";
const url = process.env.NEXT_PUBLIC_BASE_URL;

const ProductThumbnailSlider = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [variationModal, setVariationModal] = useState("");
  const [state, setState] = useState({ nav1: null, nav2: null });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  // Handle mouse movement for magnifier
  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setMagnifierPosition({ x, y });
  };

  // Handle mouse enter
  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setImgSize({ width, height });
    setShowMagnifier(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };
  return (
    <>
    <Col xl={6}>
      <div className="product-left-box">
        <Row className="g-2">
          <Col xs={12}>
            <div className="product-main-1">
              {productState?.product?.is_sale_enable ? (
                <div className="product-label-tag">
                  <span>{t("Sale")}</span>
                </div>
              ) : productState?.product?.is_featured ? (
                <div className="product-label-tag warning-label-tag">
                  <span>{t("Featured")}</span>
                </div>
              ) : null}
              {productState?.product?.product_galleries?.length > 0 &&
              productState?.product?.product_galleries?.length < 2 ? (
                <div
                  style={{ position: "relative", display: "inline-block" }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    height={580}
                    width={580}
                    src={
                      productState?.product?.product_galleries?.[0]?.original_url?.startsWith(
                        "https://"
                      )
                        ? productState?.product?.product_galleries?.[0]
                            ?.original_url
                        : url +
                            productState?.product?.product_galleries?.[0]
                              ?.original_url || placeHolderImage
                    }
                    className="img-fluid"
                    alt={
                      productState?.product?.product_galleries?.[0]?.file_name
                    }
                  />
                  {showMagnifier && (
                    <div
                      style={{
                        position: "absolute",
                        left: `${magnifierPosition.x - 75}px`,
                        top: `${magnifierPosition.y - 75}px`,
                        width: "150px",
                        height: "150px",
                        border: "3px solid #000",
                        borderRadius: "50%",
                        backgroundImage: `url(${
                          productState?.product?.product_galleries?.[0]?.original_url?.startsWith(
                            "https://"
                          )
                            ? productState?.product?.product_galleries?.[0]
                                ?.original_url
                            : url +
                                productState?.product?.product_galleries?.[0]
                                  ?.original_url || placeHolderImage
                        })`,
                        backgroundSize: `${imgSize.width * 2}px ${
                          imgSize.height * 2
                        }px`,
                        backgroundPosition: `-${
                          magnifierPosition.x * 2 - 75
                        }px -${magnifierPosition.y * 2 - 75}px`,
                        pointerEvents: "none",
                        zIndex: 1000,
                        boxShadow:
                          "0 0 0 7px rgba(255, 255, 255, 0.85), 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                  )}
                </div>
              ) : (
                <Slider
                  asNavFor={nav2}
                  ref={(slider) => (slider1.current = slider)}
                >
                  {productState?.product?.product_galleries?.map((elem, i) => (
                    <div key={i} onClick={() => setVariationModal(productState?.product?.id)}>
                      <div
                        className="slider-image"
                        style={{
                          position: "relative",
                          // display: "inline-block",
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image
                          height={580}
                          width={580}
                          src={
                            elem?.original_url?.startsWith("http")
                              ? elem?.original_url
                              : url + elem?.original_url || placeHolderImage
                          }
                          className="img-fluid"
                          alt={elem?.file_name}
                        />
                        {showMagnifier && (
                          <div
                            style={{
                              position: "absolute",
                              left: `${magnifierPosition.x - 75}px`,
                              top: `${magnifierPosition.y - 75}px`,
                              width: "200px",
                              height: "200px",
                              border: "3px solid #000",
                              borderRadius: "10px",
                              backgroundImage: `url(${
                                elem?.original_url?.startsWith("http")
                                  ? elem?.original_url
                                  : url + elem?.original_url || placeHolderImage
                              })`,
                              backgroundSize: `${imgSize.width * 2}px ${
                                imgSize.height * 2
                              }px`,
                              backgroundPosition: `-${
                                magnifierPosition.x * 2 - 75
                              }px -${magnifierPosition.y * 2 - 75}px`,
                              pointerEvents: "none",
                              zIndex: 1000,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </Col>
          {productState?.product?.product_galleries?.length > 0 &&
          productState?.product?.product_galleries?.length < 2 ? null : (
            <Col xs={12}>
              <div className="bottom-slider-image left-slider slick-top no-arrow">
                <Slider
                  {...productDetailSlider(
                    productState?.product?.product_galleries?.length < 3
                      ? productState?.product?.product_galleries?.length
                      : 3
                  )}
                  slidesToShow={
                    productState?.product?.product_galleries?.length < 3
                      ? productState?.product?.product_galleries?.length
                      : 3
                  }
                  asNavFor={nav1}
                  ref={(slider) => (slider2.current = slider)}
                >
                  {productState?.product?.product_galleries?.map((elem, i) => (
                    <div key={i}>
                      <div className="sidebar-image">
                        <Image
                          height={130}
                          width={130}
                          src={
                            elem?.original_url?.startsWith("http")
                              ? elem?.original_url
                              : url + elem?.original_url || placeHolderImage
                          }
                          className="img-fluid"
                          alt={elem?.file_name}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </Col>
    <ImagesModal
      productObj={productState}
      variationModal={variationModal}
      setVariationModal={setVariationModal}
    />
  </>
  );
};

export default ProductThumbnailSlider;
