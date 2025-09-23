"use client";

import I18NextContext from "@/helper/i18NextContext";
import SettingContext from "@/helper/settingContext";
import TextLimit from "@/utils/customFunctions/TextLimit";
import { useTranslation } from "@/app/i18n/client";
import { useContext, useEffect, useState } from "react";
import { Label } from "reactstrap";
import ProductBox1Rating from "../ProductBox1Rating";
import { ModifyString } from "@/utils/customFunctions/ModifyString";
import Link from "next/link";
import getCookie from "@/utils/customFunctions/GetCookie";

const RightVariationModal = ({ cloneVariation }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("uat");
      setHasToken(!!token);
    }
  }, []);
  return (
    <>
      <h4 className="name">
        SKU:{" "}
        {cloneVariation?.selectedVariation?.id ?? cloneVariation?.product?.id}
      </h4>
      <h4 className="title-name">
        {cloneVariation?.selectedVariation
          ? cloneVariation?.selectedVariation?.name
          : cloneVariation?.product?.name}
      </h4>
      <h6 className="price">
        {hasToken ? (
          <>
            <span style={{ color: "black" }}>Price: </span>{" "}
            {cloneVariation?.selectedVariation?.sale_price
              ? convertCurrency(
                  parseFloat(cloneVariation?.selectedVariation?.price || 0) /
                    parseFloat(
                      cloneVariation?.selectedVariation?.case_pack || 1
                    )
                )
              : convertCurrency(
                  parseFloat(cloneVariation?.product?.price || 0) /
                    parseFloat(cloneVariation?.product?.case_pack || 1)
                )}{" "}
            <sup>PCS</sup> <span style={{ color: "black" }}> | Price: </span>{" "}
            {cloneVariation?.selectedVariation?.sale_price
              ? convertCurrency(cloneVariation?.selectedVariation?.sale_price)
              : convertCurrency(cloneVariation?.product?.sale_price)}{" "}
            <sup>CA</sup>
            {cloneVariation?.selectedVariation?.discount ||
            cloneVariation?.product?.discount ? (
              <span className="offer-top">
                {cloneVariation?.selectedVariation
                  ? cloneVariation?.selectedVariation?.discount
                  : cloneVariation?.product?.discount}
                % {t("Off")}
              </span>
            ) : null}
          </>
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
              Login to show price
            </div>
          </Link>
        )}
        {/* {cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.price) : convertCurrency(cloneVariation?.product?.price)}
        <del>{cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.price) : convertCurrency(cloneVariation?.product?.price)}</del>
        <Label className='modal-label mb-0'>
          {cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.discount : cloneVariation?.product?.discount}% {t('Off')}
        </Label> */}
      </h6>
      <div className="product-detail">
        <h4>{t("ProductDetails")}:</h4>
        <div className="mt-2">
          <TextLimit
            value={cloneVariation?.product?.short_description}
            maxLength={200}
            tag={"p"}
          />
        </div>
      </div>
      <div className="pickup-box">
        <div className="product-title">
          <h4>{t("ProductInformation")}</h4>
        </div>
        <div className="product-info">
          <ul className="product-info-list">
            <li>
              {t("CasePack")} :{" "}
              {cloneVariation?.selectedVariation?.case_pack ??
                cloneVariation?.product?.case_pack}
            </li>
            <li>
              {t("CBM")} : {cloneVariation?.product?.cbm}
            </li>
            <li>
              {t("UPC Code")} :
              {cloneVariation?.selectedVariation?.upc_code
                ? ModifyString(
                    cloneVariation?.selectedVariation?.upc_code,
                    false,
                    "_"
                  )
                : ModifyString(cloneVariation?.product?.upc_code, false, "_")}
            </li>
            <li>
              {t("Carton UPC")} :{" "}
              {cloneVariation?.selectedVariation?.carton_upc ??
                cloneVariation?.product?.carton_upc}{" "}
            </li>
            <li>
              {t("Quantity")} :{" "}
              {cloneVariation?.selectedVariation?.quantity ??
                cloneVariation?.product?.quantity}{" "}
              {t("ItemsLeft")}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RightVariationModal;
