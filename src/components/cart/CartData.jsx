import { useContext, useEffect, useState } from "react";
import HandleQuantity from "./HandleQuantity";
import CartContext from "@/helper/cartContext";
import CartProductDetail from "./CartProductDetail";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SettingContext from "@/helper/settingContext";
import getCookie from "@/utils/customFunctions/GetCookie";
import Link from "next/link";

const CartData = ({ elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("uat");
      setHasToken(!!token);
    }
  }, []);
  return (
    <tr className="product-box-contain">
      <CartProductDetail elem={elem} />

      <td className="price">
        <h4 className="table-title text-content">{t("Price")}</h4>
        <h5>
          {/* {convertCurrency(elem?.product?.sale_price)} <del className='text-content'>{convertCurrency(elem?.product?.price)}</del> */}
          {hasToken ? (
            <span className="theme-color price">
              {convertCurrency(
                parseFloat(
                  (elem?.variation?.price ?? elem?.product?.price) || 0
                ) /
                  parseFloat(
                    (elem?.variation?.case_pack ?? elem?.product?.case_pack) ||
                      1
                  )
              )}{" "}
              <sup>PCS</sup> <br />{" "}
              {convertCurrency(elem?.variation?.price ?? elem?.product?.price)}{" "}
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
        </h5>
        {/* <h6 className='saving theme-color'>
          {t('Saving')} : {convertCurrency(Number((elem?.variation?.price ?? elem?.product?.price) - (elem?.variation?.sale_price ?? elem?.product?.sale_price)))}
        </h6> */}
      </td>

      <td className="quantity">
        <h4 className="table-title text-content">{t("Qty")}</h4>
        <HandleQuantity
          productObj={elem?.product}
          classes={{ customClass: "quantity-price" }}
          elem={elem}
        />
      </td>

      <td className="subtotal">
        <h4 className="table-title text-content">{t("Total")}</h4>
        <h5>{convertCurrency(elem?.sub_total)}</h5>
      </td>

      <td className="save-remove">
        <h4 className="table-title text-content">{t("Action")}</h4>
        <a
          className="remove close_button"
          onClick={() => removeCart(elem.product_id, elem?.id)}
        >
          {t("Remove")}
        </a>
      </td>
    </tr>
  );
};

export default CartData;
