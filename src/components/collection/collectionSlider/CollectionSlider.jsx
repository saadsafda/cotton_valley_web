import React, { useContext } from 'react';
import Slider from 'react-slick';
import { collectionCategorySlider } from '../../../data/SliderSettings';
import WrapperComponent from '../../common/WrapperComponent';
import Avatar from '../../common/Avatar';
import CategoryContext from '@/helper/categoryContext';
import { placeHolderImage } from '../../../data/CommonPath';
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';

const CollectionSlider = ({ filter, setFilter }) => {
  const { i18Lang } = useContext(I18NextContext);
  const [attribute, price, pcsPrice, rating, sortBy, field, layout] = useCustomSearchParams([
    'attribute',
    'price',
    'pcsPrice',
    'rating',
    'sortBy',
    'field',
    'layout'
  ]);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const { t } = useTranslation(i18Lang, 'common');
  const pathname = usePathname();
  const router = useRouter();

  // currently selected main category
  const selectedCategorySlug = filter?.category?.[0];
  const selectedCategory = selectedCategorySlug
    ? categoryData?.find((cat) => cat.slug === selectedCategorySlug)
    : null;

  // if a category is selected → show its subcategories, otherwise show main categories
  const dataToShow = selectedCategorySlug ? selectedCategory?.subcategories || [] : categoryData;

  const redirectToCollection = (slug, type) => {
    let tempFilter = { ...filter };

    if (type === 'category') {
      // reset and set the new category
      tempFilter.category = [slug];
      tempFilter.subcategory = [];
    } else if (type === 'subcategory') {
      let temp = [...(tempFilter?.subcategory || [])];
      if (!temp.includes(slug)) {
        temp.push(slug);
      } else {
        temp = temp.filter((elem) => elem !== slug);
      }
      tempFilter.subcategory = temp;
    }

    setFilter(tempFilter);

    const queryParams = new URLSearchParams({
      ...attribute,
      ...price,
      ...pcsPrice,
      ...sortBy,
      ...field,
      ...rating,
      ...layout,
      ...(tempFilter.category?.length ? { category: tempFilter.category[0] } : {}),
      ...(tempFilter.subcategory?.length ? { subcategory: tempFilter.subcategory.join(',') } : {})
    }).toString();

    router.push(`${pathname}?${queryParams}`);
  };

  return (
    <WrapperComponent colProps={{ xs: 12 }}>
      <div className='slider-7_1 no-space shop-box no-arrow'>
        <Slider {...collectionCategorySlider}>
          {dataToShow?.map((elem, i) => (
            <div key={i}>
              <div
                className={`category-box shop-category-box ${
                  (selectedCategorySlug && filter?.subcategory?.includes(elem.slug)) ||
                  (!selectedCategorySlug && filter?.category?.includes(elem.slug))
                    ? 'active'
                    : ''
                }`}
              >
                <a
                  onClick={() =>
                    redirectToCollection(elem?.slug, selectedCategorySlug ? 'subcategory' : 'category')
                  }
                >
                  <Avatar
                    data={elem?.category_icon}
                    placeHolder={placeHolderImage}
                    name={elem?.name}
                    height={45}
                    width={187}
                    customClass={'shop-category-image'}
                  />
                  <div className='category-box-name'>
                    <h6>{elem?.name}</h6>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default CollectionSlider;
