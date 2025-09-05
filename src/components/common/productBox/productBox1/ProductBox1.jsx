import React, { useContext } from "react";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import ProductBoxAction from "./ProductBox1Action";
import ProductBox1Cart from "./ProductBox1Cart";
import ProductBox1Rating from "./ProductBox1Rating";
import Avatar from "../../Avatar";
import { placeHolderImage } from "../../../../data/CommonPath";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import ProductBagde from "./ProductBagde";
import SettingContext from "@/helper/settingContext";
import { ModifyString } from "@/utils/customFunctions/ModifyString";
const ProductBox1 = ({
  imgUrl,
  productDetail,
  isClose,
  addAction = true,
  classObj,
  setWishlistState,
}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { convertCurrency } = useContext(SettingContext);
  const handelDelete = (currObj) => {
    setWishlistState((prev) => prev.filter((elem) => elem.id !== currObj?.id));
  };
  // console.log(imgUrl, "Image Url");

  return (
    <>
      <div className={`product-box ${classObj?.productBoxClass}`}>
        <div
          style={{
            backgroundColor:
              productDetail.stock_status === "out_of_stock" ? "red" : "green",
            alignItems: "center",
            textAlign: "center",
            padding: "4px",
          }}
        >
          <div className="">
            {/* <ProductBox1Rating totalRating={productDetail?.rating_count || 0} /> */}
            <h6 style={{ color: "white" }}>
              {ModifyString(productDetail.stock_status, false, "_")}
            </h6>
          </div>
        </div>
        <ProductBagde productDetail={productDetail} />
        {isClose && (
          <div
            className="product-header-top"
            onClick={() => handelDelete(productDetail)}
          >
            <Btn className="wishlist-button close_button">
              <RiCloseLine />
            </Btn>
          </div>
        )}
        <div className="product-image">
          <Link href={`/${i18Lang}/product/${productDetail?.id}`}>
            <Avatar
              data={imgUrl}
              placeHolder={placeHolderImage}
              customClass={"img-fluid"}
              name={productDetail.name}
              height={500}
              width={500}
            />
          </Link>
          <ProductBoxAction
            productObj={productDetail}
            listClass="product-option"
          />
        </div>
        <div className="product-detail">
          <Link href={`/${i18Lang}/product/${productDetail?.id}`}>
            <h6 className="name" style={{ textAlign: "center" }}>
              {productDetail.name}
            </h6>
            {/* <p dangerouslySetInnerHTML={{ __html: productDetail?.description }} /> */}
          </Link>
          <h6 className="unit mt-1" style={{ textAlign: "center" }}>
            SKU: {productDetail?.sku} | CA{productDetail?.case_pack}
          </h6>
          <h5 className="sold text-content" style={{ textAlign: "center" }}>
            <span className="theme-color price">
              {convertCurrency(
                parseFloat(productDetail?.price || 0) /
                  parseFloat(productDetail?.case_pack || 1)
              )}{" "}
              <sup>PCS</sup> | {convertCurrency(productDetail?.price)}{" "}
              <sup>CA</sup>
            </span>
            {/* <del>{convertCurrency(productDetail?.price)}</del> */}
          </h5>

          {addAction && <ProductBox1Cart productObj={productDetail} />}
        </div>
      </div>
    </>
  );
};

export default ProductBox1;
