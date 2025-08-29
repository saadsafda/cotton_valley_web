import React, { useEffect, useState } from "react";
import { CategoryAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import request, { requestForReal } from "@/utils/axiosUtils";
import CategoryContext from ".";
const API_URL = "/api/method/cotton_valley.api.api.get_product_categories_with_count";
const url = `${process.env.NEXT_PUBLIC_BASE_URL}${API_URL}`;
const CategoryProvider = (props) => {
  const [categoryAPIData, setCategoryAPIData] = useState({
    data: [],
    refetchCategory: "",
    params: {},
    categoryIsLoading: false,
  });
  const {
    data: categoryData,
    isLoading: categoryIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories", categoryAPIData.params],
    queryFn: () =>
      requestForReal({
        url: url,
        params: { ...categoryAPIData.params, status: 1 },
      }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res.data.message || res.data.data,
  });
  const filterCategory = (value) => {
    return categoryData?.filter((elem) => elem.type === value) || [];
  };

  // Setting Data on Category variables
  useEffect(() => {
    if (categoryData) {
      setCategoryAPIData((prev) => ({
        ...prev,
        data: categoryData,
        categoryIsLoading: categoryIsLoading,
        refetchCategory: refetch,
      }));
    }
  }, [categoryData, categoryIsLoading, refetch]);

  return (
    <CategoryContext.Provider
      value={{
        ...props,
        categoryAPIData,
        setCategoryAPIData,
        filterCategory: filterCategory,
        categoryIsLoading,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
