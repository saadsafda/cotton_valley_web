import { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import I18NextContext from '@/helper/i18NextContext';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { useTranslation } from '@/app/i18n/client';
import { RiCloseLine } from 'react-icons/ri';
import { ModifyString } from '@/utils/customFunctions/ModifyString';
import CategoryContext from '@/helper/categoryContext';

const CollectionFilter = ({ filter, setFilter }) => {
  const router = useRouter();
  const [layout] = useCustomSearchParams(['layout']);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const pathname = usePathname();
  const splitFilter = (filterKey) => {
    return filter && filter[filterKey] ? filter[filterKey] : [];
  };
  const filterObj = {
    category: splitFilter('category'),
    subcategory: splitFilter('subcategory'),
    attribute: splitFilter('attribute'),
    price: splitFilter('price'),
    rating: splitFilter('rating'),
  };
  // Helper to get category name by id
  const getCategoryName = (id) => {
    const cat = categoryData?.find(c => c.id === id || c.slug === id);
    return cat?.name || id;
  };
  // Helper to get subcategory name by id
  const getSubcategoryName = (id) => {
    for (const cat of categoryData || []) {
      const sub = cat.subcategories?.find(s => s.id === id || s.slug === id);
      if (sub) return sub.name;
    }
    return id;
  };
  const mergeFilter = () => {
    const categoryNames = filterObj['category'].map(getCategoryName);
    const subcategoryNames = filterObj['subcategory'].map(getSubcategoryName);
    setSelectedFilters([
      ...categoryNames,
      ...subcategoryNames,
      ...filterObj['attribute'],
      ...filterObj['price'],
      ...filterObj['rating'].map((val) => (val.startsWith('rating ') ? val : `rating ${val}`))
    ]);
  };
  useEffect(() => {
    mergeFilter();
  }, [filter]);

  const removeParams = (slugValue) => {
    Object.keys(filterObj).forEach((key) => {
      filterObj[key] = filterObj[key].filter((val) => {
        if (key === 'rating') {
          return val !== slugValue.replace(/^rating /, '');
        }
        return val !== slugValue;
      });
      mergeFilter();
      setFilter(filterObj);
      const params = {};
      Object.keys(filterObj).forEach((key) => {
        if (filterObj[key].length > 0) {
          params[key] = filterObj[key].join(',');
        }
      });
      const queryParams = new URLSearchParams({ ...params, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    });
  };
  const clearParams = () => {
    setSelectedFilters([]);
    setFilter({ category: [], subcategory: [], attribute: [], price: [], rating: [] });
    router.push(pathname);
  };
  console.log(categoryData, "checinf");
  
  if (selectedFilters.length <= 0) return null;
  return (
    <div className='filter-category'>
      <div className='filter-title'>
        <h2>{t('Filters')}</h2>
        <a onClick={() => clearParams()}>{t('ClearAll')}</a>
      </div>
      <ul>
        {selectedFilters?.map((elem, i) => (
          <li key={i}>
            <a>{ModifyString(elem, false,'-')}</a>
            <span onClick={() => removeParams(elem)}>
              <RiCloseLine />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionFilter;
