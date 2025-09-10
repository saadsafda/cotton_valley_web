"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TopBanner from "./TopBanner";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import request from "@/utils/axiosUtils";
import NewsLetter from "./NewsLetter";
import ProductIdsContext from "@/helper/productIdsContext";
import Loader from "@/layout/loader";
import ShopCategory from "../madridTheme/ShopCategory";
import MiddleContent from "../osakaTheme/MiddleContent";
import TopSelling from "../tokyoTheme/topSelling";
import WrapperComponent from "../common/WrapperComponent";
import { Col } from "reactstrap";
import TwoBanners from "./TwoBanners";

const ParisTheme = () => {
  const { setGetProductIds, isLoading: productLoader } =
    useContext(ProductIdsContext);

  const {
    data: osakaData,
    isLoading: osakaLoading,
    refetch: osakaRefetch,
    fetchStatus: osakaFetchStatus,
  } = useQuery({
    queryKey: ["osaka"],
    queryFn: () => request({ url: `${HomePageAPI}/osaka` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => {
      return res?.data?.message || res?.data || {};
    },
  });

  useEffect(() => {
    osakaRefetch();
  }, []);

  useEffect(() => {
    if (!osakaLoading && osakaFetchStatus == "fetching") {
      document.body.classList.add("skeleton-body");
    } else {
      document.body.classList.remove("skeleton-body");
    }

    if (osakaData?.content?.products_ids?.length > 0) {
      setGetProductIds({
        ids: Array.from(new Set(osakaData?.content?.products_ids))?.join(","),
      });
    }
  }, [osakaFetchStatus == "fetching", !osakaLoading]);
  if (productLoader || osakaLoading) return <Loader />;

  return (
    <>
      <TopBanner data={osakaData?.content?.home_banner} />

      {osakaData?.content?.categories_image_list?.status && (
        <ShopCategory dataAPI={osakaData?.content?.categories_image_list} />
      )}

      <MiddleContent dataAPI={osakaData?.content} />

      <WrapperComponent
        classes={{ sectionClass: "product-section", row: "g-sm-2 g-2" }}
        customCol={true}
      >
        <Col xxl={12} xl={12}>
          <TwoBanners dataAPI={osakaData?.content} />
        </Col>
      </WrapperComponent>

      {osakaData?.content?.slider_products?.status && (
        <TopSelling
          dataAPI={osakaData?.content?.slider_products}
          classes={{
            boxClass: "category-menu",
            colClass: { sm: 6, xl: 4, xxl: 3 },
          }}
        />
      )}

      {osakaData?.content?.news_letter?.status && (
        <NewsLetter dataAPI={osakaData?.content?.news_letter} />
      )}
    </>
  );
};

export default ParisTheme;
