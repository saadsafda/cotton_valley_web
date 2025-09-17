import { Col } from 'reactstrap';
import CustomHeading from '@/components/common/CustomHeading';
import LeadForm from './LeadForm';

const LeadRightSidebar = () => {
  return (
    <Col lg={6}>
      <CustomHeading title={'Prime Bulk Buyers'} customtitleClass={'d-xxl-none d-block'} />
      <div className='right-sidebar-box'>
        <LeadForm />
      </div>
    </Col>
  );
};

export default LeadRightSidebar;
