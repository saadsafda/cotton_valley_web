import { useContext } from 'react';
import Link from 'next/link';
import RatioImage from '@/utils/RatioImage';
import I18NextContext from '@/helper/i18NextContext';
import ProductIdsContext from '@/helper/productIdsContext';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

const OfferBanner = ({ classes = {}, imgUrl, ratioImage, customRatioClass = '', elem }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext);

  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return 'product/' + product?.slug;
  };

  // ✅ Helper to always return a proper string URL
  const getImageUrl = () => {
    if (!imgUrl) return '';
    const url = String(imgUrl);
    return url.startsWith('http') ? url : baseUrl + url;
  };

  const renderImage = () =>
    ratioImage ? (
      <RatioImage src={getImageUrl()} className={`bg-img ${customRatioClass}`} alt="banner" />
    ) : (
      <Image src={getImageUrl()} className={`img-fluid ${customRatioClass}`} alt="banner" />
    );

  return (
    <div className={`${classes?.customClass ? classes?.customClass : ''}`}>
      {elem?.redirect_link?.link_type === 'external_url' ? (
        <Link href={elem?.redirect_link?.link || '/'} target="_blank">
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {renderImage()}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === 'collection' ? (
        <Link href={`/${i18Lang}/collections?category=${elem?.redirect_link?.link}` || '/'}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {renderImage()}
          </div>
        </Link>
      ) : elem?.redirect_link?.link_type === 'product' ? (
        <Link href={`/${i18Lang}/${redirectToProduct(elem?.redirect_link?.link)}` || '/'}>
          <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
            {renderImage()}
          </div>
        </Link>
      ) : (
        <div className={`${classes?.customHoverClass ? classes?.customHoverClass : 'home-contain hover-effect'}`}>
          {renderImage()}
        </div>
      )}
    </div>
  );
};

export default OfferBanner;
