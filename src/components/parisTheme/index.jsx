"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TopBanner from "./TopBanner";
import axios from "axios";
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

  // const [homeSettings, setHomeSettings] = useState({});
  // const isMounted = useRef(true);
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const url = `${base.replace(/\/+$/, "")}`;

  const makeImageUrl = (image) => {
    // if image is start with https then return image
    return image
      ? image.startsWith("https://")
        ? image
        : `${url}${image}`
      : "";
  };

  // const fetchHomeBanners = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${url}/api/method/cotton_valley.api.api.get_home_banners`,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     const payload = res?.data?.message ?? res?.data ?? {};
  //     if (isMounted.current && payload)
  //       setHomeSettings({
  //         ...payload,
  //         large_image: makeImageUrl(payload?.large_image),
  //         right_top: makeImageUrl(payload?.right_top),
  //         right_bottom: makeImageUrl(payload?.right_bottom),
  //         promotion_banner: makeImageUrl(payload?.promotion_banner),
  //         promotion_subbanner: makeImageUrl(payload?.promotion_subbanner),
  //       });
  //   } catch (e) {
  //     // keep existing data if fetch fails
  //   }
  // };

  // useEffect(() => {
  //   isMounted.current = true;
  //   fetchHomeBanners();
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

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
