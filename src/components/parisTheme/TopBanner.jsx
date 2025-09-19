import { Col, Row } from "reactstrap";
import WrapperComponent from "../common/WrapperComponent";
import OfferBanner from "./OfferBanner";
import SkeletonWrapper from "../common/SkeletonWrapper";
import { themeParisBannerSlider } from "@/data/SliderSettings";
import Slider from "react-slick";

const TopBanner = ({ data }) => {
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
        {data?.main_banner.length > 0 && data?.main_banner.length < 2 ? (
          <OfferBanner
            classes={{
              customClass: "home-contain h-100",
              customHoverClass: "h-100 b-left",
            }}
            imgUrl={data?.main_banner[0]?.image_url}
            key={0}
            elem={data?.main_banner[0]}
            ratioImage={true}
          />
        ) : (
          <Slider {...themeParisBannerSlider}>
            {data?.main_banner.map((elem, i) => (
              <OfferBanner
                classes={{
                  customClass: "home-contain h-100",
                  customHoverClass: "h-100 b-left",
                }}
                imgUrl={elem?.image_url}
                key={i}
                elem={elem}
                ratioImage={true}
              />
            ))}
          </Slider>
        )}
        {/* <OfferBanner
          classes={{
            customClass: "home-contain h-100",
            customHoverClass: "h-100 b-left",
          }}
          imgUrl={data?.large_image}
          ratioImage={true}
          elem={data?.name}
        /> */}
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
              imgUrl={data?.sub_banner_1?.image_url}
              ratioImage={true}
              elem={data?.sub_banner_1}
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
              imgUrl={data?.sub_banner_2?.image_url}
              ratioImage={true}
              elem={data?.sub_banner_2}
            />
          </SkeletonWrapper>
        </Row>
      </Col>
    </WrapperComponent>
  );
};

export default TopBanner;
