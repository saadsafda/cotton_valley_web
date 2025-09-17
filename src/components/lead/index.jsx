'use client';

import ReviewSection from "../aboutUs/ReviewSection"
import Breadcrumb from "../common/Breadcrumb"
import WrapperComponent from "../common/WrapperComponent"
import LeadLeftSideBox from "./LeadLeftSideBox";
import LeadRightSidebar from "./leadRightSidebar";

const LeadContent = () => {
  return (
    <>
      <Breadcrumb title={'Lead'} subNavigation={[{ name: 'Lead' }]} />
       <WrapperComponent classes={{ sectionClass: 'contact-box-section', row: 'g-lg-5 g-3' }} customCol={true}>
        <LeadLeftSideBox />
        <LeadRightSidebar />
      </WrapperComponent>
      <ReviewSection />
    </>
  )
}

export default LeadContent
