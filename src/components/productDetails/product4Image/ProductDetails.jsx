import { useContext, useState, useEffect } from "react";
import getCookie from '@/utils/customFunctions/GetCookie';
import Link from 'next/link';
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import ProductBox1Rating from "@/components/common/productBox/productBox1/ProductBox1Rating";
import CustomerOrderCount from "../common/CustomerOrderCount";
import SettingContext from "@/helper/settingContext";

const ProductDetails = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { convertCurrency } = useContext(SettingContext);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = getCookie('uat');
      setHasToken(!!token);
    }
  }, []);

  return (
    <>
      <CustomerOrderCount productState={productState} />
      <h4 className="name">
        SKU: {productState?.selectedVariation?.id ?? productState?.product?.id}
      </h4>
      <h2 className="name">
        {productState?.selectedVariation?.name ?? productState?.product?.name}
      </h2>
      <div className="price-rating">
        <h3 className="theme-color price" style={{display: "flex", alignItems: "center"}} >
          {hasToken ? (
            <>
              <span style={{ color: "black" }}>Price: </span> {" "}{productState?.selectedVariation?.sale_price
                ? convertCurrency(
                    parseFloat(productState?.selectedVariation?.price || 0) /
                      parseFloat(productState?.selectedVariation?.case_pack || 1)
                  )
                : convertCurrency(
                    parseFloat(productState?.product?.price || 0) /
                      parseFloat(productState?.product?.case_pack || 1)
                  )} <sup>PCS</sup> {" "}
              <span style={{ color: "black" }}> {" "} |  {" "}  Price: </span> {" "} {productState?.selectedVariation?.sale_price
                ? convertCurrency(productState?.selectedVariation?.sale_price)
                : convertCurrency(productState?.product?.sale_price)} <sup>CA</sup>

              {/* <del className="text-content">
                {productState?.selectedVariation
                  ? convertCurrency(productState?.selectedVariation?.price)
                  : convertCurrency(productState?.product?.price)}
              </del> */}
              {productState?.selectedVariation?.discount ||
              productState?.product?.discount ? (
                <span className="offer-top">
                  {productState?.selectedVariation
                    ? productState?.selectedVariation?.discount
                    : productState?.product?.discount}
                  % {t("Off")}
                </span>
              ) : null}
            </>
          ) : (
            <Link href={`/${i18Lang}/auth/login`}>
              <div className="btn btn-primary btn-sm" style={{ margin: '0 auto', display: 'block', backgroundColor: '#FEEFEF', color: '#f6564f' }}>
                Login to show price
              </div>
            </Link>
          )}
        </h3>
        {/* <div className="product-rating custom-rate">
          <ProductBox1Rating
            totalRating={
              productState?.selectedVariation?.rating_count ??
              productState?.product?.rating_count
            }
          />
          <span className="review">
            {productState?.selectedVariation?.reviews_count ||
              productState?.product?.reviews_count ||
              0}{" "}
            {t("Review")}
          </span>
        </div> */}
      </div>
      <div className="product-contain">
        <p>
          {productState?.selectedVariation?.short_description ??
            productState?.product?.short_description}
        </p>
      </div>
    </>
  );
};

export default ProductDetails;
