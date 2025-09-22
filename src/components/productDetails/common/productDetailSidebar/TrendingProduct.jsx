import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import I18NextContext from "@/helper/i18NextContext";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import { useTranslation } from "@/app/i18n/client";
import { useQuery } from "@tanstack/react-query";
import SettingContext from "@/helper/settingContext";
import getCookie from "@/utils/customFunctions/GetCookie";
import ProductIdsContext from "@/helper/productIdsContext";

const TrendingProduct = ({ productState }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { convertCurrency } = useContext(SettingContext);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("uat");
      setHasToken(!!token);
    }
  }, []);

  const productId = useMemo(() => {
    return [productState?.product?.trending_products?.map((elem) => elem)];
  }, [productState?.product?.trending_products]);
  const { data: productData, refetch: productRefetch } = useQuery({
    queryKey: [productId],
    queryFn: () =>
      request({
        url: ProductAPI,
        params: { status: 1, trending: 1, ids: productId.join(",") },
      }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });
  useEffect(() => {
    productId?.length > 0 && productRefetch();
  }, [productId]);

  if (productData?.length == 0) return <div></div>;
  return (
    <div className="pt-25">
      <div className="category-menu">
        <h3>{t("TrendingProducts")}</h3>

        <ul className="product-list product-right-sidebar border-0 p-0">
          {productData?.map((elem, i) => (
            <li key={i}>
              <div className="offer-product">
                <Link
                  href={`/${i18Lang}/product/${elem?.slug}`}
                  className="offer-image"
                >
                  {elem?.product_thumbnail?.original_url && (
                    <Image
                      src={elem?.product_thumbnail?.original_url}
                      className="img-fluid"
                      alt={elem?.name}
                      height={80}
                      width={80}
                    />
                  )}
                </Link>

                <div className="offer-detail">
                  <div>
                    <Link href={`/${i18Lang}/product/${elem?.slug}`}>
                      <h6 className="name">{elem?.name}</h6>
                    </Link>
                    <span>{`SKU: ${elem?.sku} | CA${elem?.case_pack}`}</span>
                    <div className="vertical-price">
                      <h5 className="price theme-color">
                        {/* {convertCurrency(elem?.sale_price)}{" "}
                        <del className="text-content">
                          {convertCurrency(elem?.price)}
                        </del> */}
                        {hasToken ? (
                          <span className="theme-color price">
                            {convertCurrency(
                              parseFloat(elem?.price || 0) /
                                parseFloat(elem?.case_pack || 1)
                            )}{" "}
                            <sup>PCS</sup> | {convertCurrency(elem?.price)}{" "}
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
                              Login to show price
                            </div>
                          </Link>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingProduct;
