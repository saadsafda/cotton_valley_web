import { Col, Row } from "reactstrap";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import WrapperComponent from "../common/WrapperComponent";
import OfferBanner from "./OfferBanner";
import SkeletonWrapper from "../common/SkeletonWrapper";

const TopBanner = ({ dataAPI }) => {
  const [data, setData] = useState(dataAPI || null);
  const isMounted = useRef(true);
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const url = `${base.replace(/\/+$/, "")}`;

  const fetchHomeBanners = async () => {
    try {
      const res = await axios.get(
        `${url}/api/method/cotton_valley.api.get_home_banners`
      );
      const payload = res?.data?.message ?? res?.data ?? null;
      if (isMounted.current && payload) setData(payload);
    } catch (e) {
      // keep existing data if fetch fails
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchHomeBanners();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <WrapperComponent
      classes={{ sectionClass: "home-section pt-2", row: "g-4" }}
      customCol={true}
    >
      <SkeletonWrapper
        classes={{
          colProps: { xl: 8 },
          colClass: "ratio_65",
          divClass: "home-contain h-100 skeleton-banner-xl",
        }}
      >
        <OfferBanner
          classes={{
            customClass: "home-contain h-100",
            customHoverClass: "h-100 b-left",
          }}
          imgUrl={
            data?.large_image ? `${url+data?.large_image}` : data?.home_banner?.main_banner?.image_url
          }
          ratioImage={true}
          elem={data?.name || data?.home_banner?.main_banner}
        />
      </SkeletonWrapper>

      <Col xl={4} className="ratio_65">
        <Row className="g-4">
          <SkeletonWrapper
            classes={{
              colProps: { xl: 12, md: 6 },
              colClass: "skeleton-banner-sm",
              divClass: "home-contain",
            }}
          >
            <OfferBanner
              classes={{ customHoverClass: "home-contain" }}
              imgUrl={
                data?.right_top ? `${url+data?.right_top}` : data?.home_banner?.sub_banner_1?.image_url
              }
              ratioImage={true}
              elem={data?.name || data?.home_banner?.sub_banner_1}
            />
          </SkeletonWrapper>
          <SkeletonWrapper
            classes={{
              colProps: { xl: 12, md: 6 },
              colClass: "skeleton-banner-sm",
              divClass: "home-contain",
            }}
          >
            <OfferBanner
              classes={{ customHoverClass: "home-contain" }}
              imgUrl={
                data?.right_bottom ? `${url+data?.right_bottom}` : data?.home_banner?.sub_banner_2?.image_url
              }
              ratioImage={true}
              elem={data?.name || data?.home_banner?.sub_banner_2}
            />
          </SkeletonWrapper>
        </Row>
      </Col>
    </WrapperComponent>
  );
};

export default TopBanner;
