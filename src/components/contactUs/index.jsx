'use client';

import WrapperComponent from '../common/WrapperComponent';
import MapSection from './MapSection';
import ContactLeftSideBox from './ContactLeftSideBox';
import ContactRightSidebar from './contactRightSidebar';
import Breadcrumb from '../common/Breadcrumb';
import OfferBanner from '../parisTheme/OfferBanner';
import { useEffect, useState } from 'react';
import request from '@/utils/axiosUtils';
import Loader from '@/layout/loader';
import ReviewSection from '../aboutUs/ReviewSection';

const ContactUsContent = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request({
        method: 'GET',
        url: '/contact',
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
  

  if (loading) return <Loader />
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error.message || 'Failed to load data.'}</div>;
  }

  return (
    <>
      <Breadcrumb title={'ContactUs'} subNavigation={[{ name: 'ContactUs' }]} />
      <WrapperComponent colProps={{ xs: 12 }}>
        <OfferBanner
          classes={{ customHoverClass: "banner-contain hover-effect" }}
          imgUrl={data?.banner_image?.original_url}
        />
      </WrapperComponent>
      <WrapperComponent classes={{ sectionClass: 'contact-box-section', row: 'g-lg-5 g-3' }} customCol={true}>
        <ContactLeftSideBox data={data} />
        <ContactRightSidebar />
      </WrapperComponent>
      {/* <MapSection /> */}
      <ReviewSection />
    </>
  );
};

export default ContactUsContent;
