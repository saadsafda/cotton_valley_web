// import React, { useContext, useEffect, useState } from 'react';
// import ProductSection1 from '../parisTheme/productSections/ProductSection1';
// import OfferBanner from '../parisTheme/OfferBanner';
// import DetailedBanner from './DetailedBanner';
// import WrapperComponent from '../common/WrapperComponent';
// import { LeafSVG } from '../common/CommonSVG';
// import ProductIdsContext from '@/helper/productIdsContext';
// import { osakaFullSlider, osakaSliderOption } from '../../data/SliderSettings';
// import axios from 'axios';

// const MiddleContent = () => {
//   const { filteredProduct } = useContext(ProductIdsContext);
//   const [hotProducts, setHotProducts] = useState([]);

//   const fetchHotProducts = async () => {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/method/cotton_valley.api.products.get_hot_products`);
//     setHotProducts(response.data.message);
//   };


//   useEffect(() => {
//     fetchHotProducts();
//   }, []);
//   return (
//     <>
//       {hotProducts.length > 0 && (
//         <WrapperComponent noRowCol={true}>
//           <ProductSection1
//             ProductData={hotProducts}
//             svgUrl={<LeafSVG className='icon-width' />}
//             dataAPI={{}}
//             noCustomClass={true}
//             customSliderOption={osakaFullSlider}
//             classObj={{ productStyle: 'product-modern', productBoxClass: '' }}
//           />
//         </WrapperComponent>
//       )}

//       {/* {dataAPI?.products_list_2?.status && dataAPI?.products_list_2?.product_ids.length > 0 && (
//         <WrapperComponent noRowCol={true}>
//           <ProductSection1
//             ProductData={filteredProduct}
//             svgUrl={<LeafSVG className='icon-width' />}
//             dataAPI={dataAPI?.products_list_2}
//             noCustomClass={true}
//             customSliderOption={osakaFullSlider}
//             classObj={{ productStyle: 'product-modern', productBoxClass: '' }}
//             isHeadingVisible={false}
//           />
//         </WrapperComponent>
//       )} */}
//     </>
//   );
// };

// export default MiddleContent;

import React, { useContext } from 'react';
import ProductSection1 from '../parisTheme/productSections/ProductSection1';
import OfferBanner from '../parisTheme/OfferBanner';
import DetailedBanner from './DetailedBanner';
import WrapperComponent from '../common/WrapperComponent';
import { LeafSVG } from '../common/CommonSVG';
import ProductIdsContext from '@/helper/productIdsContext';
import { osakaFullSlider, osakaSliderOption, madridCategorySlider } from '../../data/SliderSettings';

const MiddleContent = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <>
      {dataAPI?.products_list_1?.status && dataAPI?.products_list_1?.product_ids.length > 0 && (
        <WrapperComponent noRowCol={true}>
          <ProductSection1
            ProductData={filteredProduct}
            svgUrl={<LeafSVG className='icon-width' />}
            dataAPI={dataAPI?.products_list_1}
            noCustomClass={true}
            customSliderOption={osakaFullSlider}
            classObj={{ productStyle: 'product-modern', productBoxClass: '' }}
          />
        </WrapperComponent>
      )}

      {dataAPI?.products_list_2?.status && dataAPI?.products_list_2?.product_ids.length > 0 && (
        <WrapperComponent noRowCol={true}>
          <ProductSection1
            ProductData={filteredProduct}
            svgUrl={<LeafSVG className='icon-width' />}
            dataAPI={dataAPI?.products_list_2}
            noCustomClass={true}
            customSliderOption={osakaFullSlider}
            classObj={{ productStyle: 'product-modern', productBoxClass: '' }}
            isHeadingVisible={false}
          />
        </WrapperComponent>
      )}
    </>
  );
};

export default MiddleContent;

