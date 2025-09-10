"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import WrapperComponent from "../common/WrapperComponent";
import OfferBanner from "../parisTheme/OfferBanner";
import request from "@/utils/axiosUtils";
import Loader from "@/layout/loader";

const ShippingReturnsContent = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request({
        method: "GET",
        url: "/shippingreturns",
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      // Cleanup if needed
    };
  }, []);

  if (loading) return <Loader />;
  if (error) {
    return (
      <div style={{ color: "red" }}>
        Error: {error.message || "Failed to load data."}
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        title={"Shipping & Returns"}
        subNavigation={[{ name: "Shipping & Returns" }]}
      />
      <WrapperComponent colProps={{ xs: 12 }}>
        <OfferBanner
          classes={{ customHoverClass: "banner-contain hover-effect" }}
          imgUrl={data?.banner_image?.original_url}
        />
      </WrapperComponent>
      <WrapperComponent
        classes={{
          sectionClass: "fresh-vegetable-section section-lg-space",
          row: "gx-xl-5 gy-xl-0 g-3 ratio_148_1",
        }}
        customCol
      >
        <p dangerouslySetInnerHTML={{ __html: data?.details }} />
      </WrapperComponent>
    </>
  );
};

export default ShippingReturnsContent;
