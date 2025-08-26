import React, { useContext, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import WrapperComponent from '../common/WrapperComponent';
import CustomHeading from '../common/CustomHeading';
import Btn from '@/elements/buttons/Btn';
import { madridCategorySlider } from '../../data/SliderSettings';
import { placeHolderImage } from '../../data/CommonPath';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import CategoryContext from '@/helper/categoryContext';
import { RiArrowRightSLine } from 'react-icons/ri';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ShopCategory = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filterCategory } = useContext(CategoryContext);
  // const categoryData = useMemo(() => {
  //   return dataAPI?.category_ids.length > 0 ? filterCategory('product')?.filter((category) => dataAPI?.category_ids?.includes(category.id)) : filterCategory('product');
  // }, [filterCategory('product')]);
  return (
    <WrapperComponent classes={{ sectionClass: 'category-section-3' }} noRowCol={true}>
      <CustomHeading title={"Shop By Categories"} customClass={'title'} />
      <Row>
        <Col xs={12}>
          <div className='category-slider-1 arrow-slider'>
            <Slider {...madridCategorySlider}>
              {dataAPI?.map((elem, i) => (
                <div key={i}>
                  <div className='category-box-list'>
                    <Link href={`/${i18Lang}/collections?category=${elem?.name}`} className='category-name'>
                      <h4>{elem?.title ?? elem?.name}</h4>
                      <h6>
                        {elem?.item_count} {t('Items')}
                      </h6>
                    </Link>
                    <div className='category-box-view'>
                      <Link href={`/${i18Lang}/collections?category=${elem?.name}`}>
                        <Image src={elem?.category_image ? `${baseUrl}${elem?.category_image}` : placeHolderImage} className='img-fluid' alt='Shop Category' height={133} width={133} />
                      </Link>
                      <Btn className='btn shop-button'>
                        <span>{t('ShopNow')}</span>
                        <RiArrowRightSLine />
                      </Btn>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default ShopCategory;
