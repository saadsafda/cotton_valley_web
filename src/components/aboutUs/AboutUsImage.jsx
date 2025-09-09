import Image from 'next/image';
import { Col, Row } from 'reactstrap';
import aboutUs1 from '../../../public/assets/images/inner-page/about-us/1.jpg';
import aboutUs2 from '../../../public/assets/images/inner-page/about-us/2.jpg';
const AboutUsImage = ({data}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const getImageUrl = (img) => {
    if (!img?.original_url) return null;
    if (img.original_url.startsWith('http')) return img.original_url;
    return baseUrl + img.original_url;
  };

  const firstImageUrl = getImageUrl(data?.first_image) || aboutUs1;
  const secondImageUrl = getImageUrl(data?.second_image) || aboutUs2;

  return (
    <Col xl='6' xs='12'>
      <Row className='g-sm-4 g-2'>
        <Col sm='6' className='d-sm-block d-none'>
          <div className='fresh-image-2'>
            <div>
              <Image height={375} width={555} src={firstImageUrl} className='img-fluid' alt='about-us-1' />
            </div>
          </div>
        </Col>
        <Col sm='6'>
          <div className='fresh-image'>
            <div>
              <Image height={500} width={593} src={secondImageUrl} alt='about-us-2' />
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default AboutUsImage;
