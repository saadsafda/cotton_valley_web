import React, { useContext } from 'react';
import Link from 'next/link';
import Avatar from '../../Avatar';
import ProductBox1Rating from '../productBox1/ProductBox1Rating';
import { placeHolderImage } from '../../../../data/CommonPath';
import I18NextContext from '@/helper/i18NextContext';
import SettingContext from '@/helper/settingContext';

const ProductBox2 = ({ elem, rating = true, customImageClass }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { convertCurrency } = useContext(SettingContext);
  return (
    <div className='offer-product'>
      <Link href={`/${i18Lang}/product/${elem.id}`} className='offer-image'>
        <Avatar data={elem?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.name} customImageClass={customImageClass} height={500} width={500} />
      </Link>

      <div className='offer-detail'>
        <div>
          <Link href={`/${i18Lang}/product/${elem.id}`} className='text-title'>
            <h6 className='name'>{elem?.name}</h6>
          </Link>
          <span>SKU: {elem?.id} | CA{elem?.case_pack}</span>
          <h5 className='price theme-color'>
          {convertCurrency((parseFloat(elem?.price || 0) / parseFloat(elem?.case_pack || 1)))} | {convertCurrency(elem?.price)}
            {/* <del className='text-content'>{convertCurrency(elem?.price)}</del> */}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductBox2;
