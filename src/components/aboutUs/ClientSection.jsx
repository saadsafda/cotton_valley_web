import { useContext } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import WrapperComponent from '../common/WrapperComponent';
import { clientSectionData } from '../../data/AboutUs';
import { clientSectionSlider } from '../../data/SliderSettings';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
const ClientSection = ({data}) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const getImageUrl = (img) => {
    if (!img?.original_url) return '';
    if (img.original_url.startsWith('http')) return img.original_url;
    return baseUrl + img.original_url;
  };

  return (
    <WrapperComponent classes={{ sectionClass: 'client-section section-lg-space' }} colProps={{ xs: 12 }}>
      <div className='about-us-title text-center'>
        <h4>{data?.client_subtitle}</h4>
        <h2 className='center'>{data?.client_title}</h2>
      </div>
      <style jsx>{`
        .client-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        @media (min-width: 600px) {
          .client-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 992px) {
          .client-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      <div className='client-grid'>
        {(data?.clients || []).map((data, index) => (
          <div className='clint-contain' key={index}>
            <div className='client-icon' style={{ marginBottom: '1rem' }}>
              <Image height={79.06} width={58.5} src={getImageUrl(data?.image_icon)} alt='client-icon' />
            </div>
            <h2 style={{ margin: 0 }}>{data?.count}</h2>
            <h4 style={{ margin: '0.5rem 0' }}>{t(data?.title)}</h4>
            <p style={{ margin: 0 }}>{t(data?.description)}</p>
          </div>
        ))}
      </div>
    </WrapperComponent>
  );
};

export default ClientSection;
