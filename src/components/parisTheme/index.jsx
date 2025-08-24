'use client';
import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TopBanner from './TopBanner';
import HomeBanner from './HomeBanner';
import ProductSection from './ProductSection';
import { HomePageAPI } from '@/utils/axiosUtils/API';
import request from '@/utils/axiosUtils';
import NewsLetter from './NewsLetter';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import StickyCart from '@/layout/stickyCart';
import ProductIdsContext from '@/helper/productIdsContext';
import Loader from '@/layout/loader';
import ShopCategory from '../madridTheme/ShopCategory';
import MiddleContent from '../osakaTheme/MiddleContent';
import TopSelling from '../tokyoTheme/topSelling';

const ParisTheme = () => {
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const { data, isLoading, refetch, fetchStatus } = useQuery({queryKey: ['paris'], queryFn: () => request({ url: `${HomePageAPI}/paris` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  const { data: madridData, isLoading: madridLoading, refetch: madridRefetch, fetchStatus: madridFetchStatus } = useQuery({queryKey: ['madrid'], queryFn: () => request({ url: `${HomePageAPI}/madrid` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  const { data: osakaData, isLoading: osakaLoading, refetch: osakaRefetch, fetchStatus: osakaFetchStatus } = useQuery({queryKey: ['osaka'], queryFn: () => request({ url: `${HomePageAPI}/osaka` }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });

  useEffect(() => {
    refetch();
    madridRefetch();
    osakaRefetch();
  }, []);

  useEffect(() => {
    if (!isLoading && fetchStatus == 'fetching' || !madridLoading && madridFetchStatus == 'fetching' || !osakaLoading && osakaFetchStatus == 'fetching') {
      document.body.classList.add('skeleton-body');
    } else {
      document.body.classList.remove('skeleton-body');
    }

    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(',') });
    }
  }, [fetchStatus == 'fetching', !isLoading, !madridLoading, !osakaLoading]);
  if (isLoading || madridLoading || osakaLoading) return <Loader />;
  return (
    <>
      <TopBanner dataAPI={data?.content} />

      {madridData?.content?.categories_image_list?.status && <ShopCategory dataAPI={madridData?.content?.categories_image_list} />}

      <MiddleContent dataAPI={osakaData?.content} />

      <ProductSection dataAPI={data?.content} />

      {osakaData?.content?.slider_products?.status && <TopSelling dataAPI={osakaData?.content?.slider_products} classes={{ boxClass: 'category-menu', colClass: { sm: 6, xl: 4, xxl: 3 } }} />}

      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}
      

      
      {/* {data?.content?.featured_banners?.status && <HomeBanner bannersData={data?.content?.featured_banners?.banners} />} */}

      {/* 
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== 'cart_sidebar' && <StickyCart />} */}
    </>
  );
};

export default ParisTheme;
