import React, { useEffect, useState } from 'react';
import PriceContext from '.';
import request from '@/utils/axiosUtils';

const PriceProvider = (props) => {
  const [priceData, setPriceData] = useState({
    filterPrice: [],
    filterPCSPrice: [],
    priceRange: { min: 0, max: 0 },
    pcsPriceRange: { min: 0, max: 0 },
    priceList: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch price filters from API
  const fetchPriceFilters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await request({
        url: '/prices',
        method: 'GET',
      });

      if (response?.data?.status === 'success') {
        setPriceData(response.data.data);
      } else {
        throw new Error('Failed to fetch price filters');
      }
    } catch (err) {
      console.error('Error fetching price filters:', err);
      setError(err.message || 'Failed to fetch price filters');
      // Set default empty data on error
      setPriceData({
        filterPrice: [],
        filterPCSPrice: [],
        priceRange: { min: 0, max: 0 },
        pcsPriceRange: { min: 0, max: 0 },
        priceList: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch price filters on mount
  useEffect(() => {
    fetchPriceFilters();
  }, []);

  // Refetch function that can be called from components
  const refetch = () => {
    fetchPriceFilters();
  };

  return (
    <PriceContext.Provider
      value={{
        ...props,
        priceData,
        filterPrice: priceData.filterPrice,
        filterPCSPrice: priceData.filterPCSPrice,
        priceRange: priceData.priceRange,
        pcsPriceRange: priceData.pcsPriceRange,
        priceList: priceData.priceList,
        isLoading,
        error,
        refetch,
      }}
    >
      {props.children}
    </PriceContext.Provider>
  );
};

export default PriceProvider;
