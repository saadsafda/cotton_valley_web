import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import HandleQuantity from "@/components/cart/HandleQuantity";
import Avatar from "@/components/common/Avatar";
import Btn from "@/elements/buttons/Btn";
import CartContext from "@/helper/cartContext";
import I18NextContext from "@/helper/i18NextContext";
import SettingContext from "@/helper/settingContext";
import { placeHolderImage } from "../../../../data/CommonPath";
import getCookie from "@/utils/customFunctions/GetCookie";

const SelectedCart = ({ modal, setSelectedVariation, setModal }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { cartProducts, removeCart } = useContext(CartContext);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("uat");
      setHasToken(!!token);
    }
  }, []);

  const onEdit = (data) => {
    setSelectedVariation(() => data);
    setTimeout(() => {
      setModal(true);
    }, 0);
  };
  useEffect(() => {
    cartProducts?.filter((elem) => {
      if (elem?.variation) {
        elem.variation.selected_variation = elem?.variation?.attribute_values
          ?.map((values) => values?.value)
          .join("/");
      } else {
        elem;
      }
    });
  }, [modal]);
  return (
    <>
      <ul className="cart-list">
        {cartProducts.map((elem, i) => (
          <li className="product-box-contain" key={i}>
            <div className="drop-cart">
              <Link
                href={`/${i18Lang}/product/${elem?.product?.slug}`}
                className="drop-image"
              >
                <Avatar
                  data={
                    elem?.variation?.variation_image ??
                    elem?.product?.product_thumbnail
                  }
                  placeHolder={placeHolderImage}
                  name={elem?.product?.name}
                  height={72}
                  width={87}
                />
              </Link>

              <div className="drop-contain">
                <Link href={`/${i18Lang}/product/${elem?.product?.slug}`}>
                  <h5>{elem?.variation?.name ?? elem?.product?.name}</h5>
                </Link>
                <p className="unit mt-1">
                  SKU: {elem?.variation?.sku ?? elem?.product?.sku} | CA
                  {elem?.variation?.case_pack ?? elem?.product?.case_pack}
                </p>
                {/* <h6>
                  {convertCurrency(
                    elem?.variation?.sale_price ?? elem?.product?.sale_price
                  )}
                </h6> */}
                <div className="d-flex align-items-center">
                  <b>
                    {hasToken ? (
                      <span className="theme-color price">
                        {convertCurrency(
                          parseFloat(
                            (elem?.variation?.price ?? elem?.product?.price) ||
                              0
                          ) /
                            parseFloat(
                              (elem?.variation?.case_pack ??
                                elem?.product?.case_pack) ||
                                1
                            )
                        )}{" "}
                        <sup>PCS</sup> |{" "}
                        {convertCurrency(
                          elem?.variation?.price ?? elem?.product?.price
                        )}{" "}
                        <sup>CA</sup>
                      </span>
                    ) : (
                      <Link href={`/${i18Lang}/auth/login`}>
                        <div
                          className="btn btn-primary btn-sm"
                          style={{
                            margin: "0 auto",
                            display: "block",
                            backgroundColor: "#FEEFEF",
                            color: "#f6564f",
                          }}
                        >
                          Login
                        </div>
                      </Link>
                    )}
                    {/* <del>{convertCurrency(productDetail?.price)}</del> */}
                  </b>
                  <ul>
                    <HandleQuantity
                      productObj={elem?.product}
                      elem={elem}
                      customIcon={<RiDeleteBinLine />}
                    />
                  </ul>
                </div>

                <div>
                  <div className="header-button-group">
                    {elem?.variation && (
                      <Btn
                        className="edit-button close_button"
                        onClick={() => onEdit(elem)}
                      >
                        <RiPencilLine />
                      </Btn>
                    )}
                    <Btn
                      className="delete-button close_button"
                      onClick={() => removeCart(elem?.product_id, elem?.id)}
                    >
                      <RiDeleteBinLine />
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectedCart;
