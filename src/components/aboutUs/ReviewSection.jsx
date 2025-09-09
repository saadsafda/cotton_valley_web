import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Slider from "react-slick";
import Image from "next/image";
import { RiDoubleQuotesR } from "react-icons/ri";
import { reviewSectionSlider } from "../../data/SliderSettings";
// import { testimonialsData } from '../../data/AboutUs';
import ProductBox1Rating from "../common/productBox/productBox1/ProductBox1Rating";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import request from "@/utils/axiosUtils";

const ReviewSection = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [testimonialsData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request({
        method: "GET",
        url: "/testimonial",
      });
      
      setData(response?.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
    };
  }, []);

  if (loading) {
    return (
      <section className="review-section section-lg-space section-t-space">
        <Container fluid>
          <div className="about-us-title text-center">
            <h4 className="text-content">{t("LatestTestimonials")}</h4>
            <h2 className="center">{t("WhatPeopleSay")}</h2>
          </div>
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
        </Container>
      </section>
    );
  }
  if (error) {
    return (
      <section className="review-section section-lg-space section-t-space">
        <Container fluid>
          <div className="about-us-title text-center">
            <h4 className="text-content">{t("LatestTestimonials")}</h4>
            <h2 className="center">{t("WhatPeopleSay")}</h2>
          </div>
          <div style={{ color: "red", textAlign: "center", padding: "2rem" }}>
            Error loading testimonials.
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="review-section section-lg-space section-t-space">
      <Container fluid>
        <div className="about-us-title text-center">
          <h4 className="text-content">{t("LatestTestimonials")}</h4>
          <h2 className="center">{t("WhatPeopleSay")}</h2>
        </div>
        <Row>
          <Col xs="12">
            <Slider
              className="slider-4-half product-wrapper"
              {...reviewSectionSlider}
            >
              {(testimonialsData || []).map((data, index) => (
                <div className="reviewer-box" key={index}>
                  <div className="icon">
                    <RiDoubleQuotesR />
                  </div>
                  <div className="product-rating">
                    <ProductBox1Rating
                      totalRating={Math.floor(Math.random() * 5) + 1}
                    />
                  </div>
                  <h3>{t(data.short_description)}</h3>
                  <p>{t(data.description)}</p>
                  <div className="reviewer-profile">
                    <div className="reviewer-image">
                      <Image
                        height={74.53}
                        width={74.53}
                        src={data?.profile_image?.original_url}
                        alt={data?.name}
                      />
                    </div>
                    <div className="reviewer-name">
                      <h4>{data.name}</h4>
                      <h6>{t(data.designation)}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ReviewSection;
