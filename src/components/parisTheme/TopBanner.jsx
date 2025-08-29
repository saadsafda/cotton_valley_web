import { Col, Row } from "reactstrap";
import WrapperComponent from "../common/WrapperComponent";
import OfferBanner from "./OfferBanner";
import SkeletonWrapper from "../common/SkeletonWrapper";

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
        <OfferBanner
          classes={{
            customClass: "home-contain h-100",
            customHoverClass: "h-100 b-left",
          }}
          imgUrl={data?.large_image}
          ratioImage={true}
          elem={data?.name}
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
              imgUrl={data?.right_top}
              ratioImage={true}
              elem={data?.name}
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
              imgUrl={data?.right_bottom}
              ratioImage={true}
              elem={data?.name}
            />
          </SkeletonWrapper>
        </Row>
      </Col>
    </WrapperComponent>
  );
};

export default TopBanner;
