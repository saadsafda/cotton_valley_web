"use client";
import { useContext, useEffect, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { LeafSVG } from "../common/CommonSVG";
import { Input, InputGroup } from "reactstrap";
import WrapperComponent from "../common/WrapperComponent";
import Btn from "@/elements/buttons/Btn";
import { useRouter, useSearchParams } from "next/navigation";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SearchedData from "./SearchedData";
import ProductContext from "@/helper/productContext";
import { useQuery } from "@tanstack/react-query";
import { ProductAPI } from "@/utils/axiosUtils/API";
import request from "@/utils/axiosUtils";
import Pagination from "../common/Pagination";
import TopPagination from "../common/TopPagination";

const SearchModule = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [searchState, setSearchState] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  //  const { productData } = useContext(ProductContext);
  const [page, setPage] = useState(1);

  const { data, fetchStatus } = useQuery({
    queryKey: [page, search],
    queryFn: () =>
      request({
        url: ProductAPI,
        params: {
          page,
          search,
        },
      }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  //  const [data,setData]=useState([])
  useEffect(() => {
    // search ? setData(productData?.filter(product => product.name.toLowerCase().includes(search?.toLowerCase()) || product.sku.toLowerCase().includes(search?.toLowerCase()))) : setData(productData)
    setSearchState(search);
  }, [search]);
  const onHandleSearch = () => {
    router.push(`/${i18Lang}/search?search=${searchState}`);
  };
  const onChangeHandler = (value) => {
    if (!value) {
      router.push(`/${i18Lang}/search?search=`);
    }
    setSearchState(value);
  };
  return (
    <>
      <Breadcrumb title={"Search"} subNavigation={[{ name: "Search" }]} />
      <WrapperComponent
        classes={{ sectionClass: "search-section", col: "mx-auto" }}
        colProps={{ xxl: 6, xl: 8 }}
      >
        <div className="title d-block text-center">
          <h2>{t("SearchForProducts")}</h2>
          <span className="title-leaf">
            <LeafSVG />
          </span>
        </div>

        <div className="search-box">
          <InputGroup>
            <Input
              type="text"
              className="form-control"
              value={searchState}
              onChange={(e) => onChangeHandler(e.target.value)}
            />
            <Btn
              className="theme-bg-color text-white m-0"
              type="button"
              title="Search"
              onClick={onHandleSearch}
            />
          </InputGroup>
        </div>
      </WrapperComponent>
      <div className="show-button justify-content-between d-flex align-items-center" style={{maxWidth: '1200px', margin: '20px auto'}}>
        <div style={{marginTop: '10px', width: 'fit-content', marginRight: 'auto'}}>
            Showing {data && data[0] ? data[0].from : 1} -{" "}
            {data && data[0] ? data[0].to : 30} of{" "}
            {data && data[0] ? data[0].total : 0} results
        </div>
        <nav className="custome-pagination" style={{marginTop: '10px', width: 'fit-content', marginLeft: 'auto'}}>
          <TopPagination
            current_page={data && data[0] ? data[0].current_page : 1}
            total={data && data[0] ? data[0].total : 0}
            per_page={data && data[0] ? data[0].per_page : 30}
            setPage={setPage}
          />
        </nav>
      </div>

      <SearchedData data={data} fetchStatus={fetchStatus} />
      {data?.length > 0 && (
        <nav className="custome-pagination">
          <Pagination
            current_page={data && data[0] ? data[0].current_page : 1}
            total={data && data[0] ? data[0].total : 0}
            per_page={data && data[0] ? data[0].per_page : 30}
            setPage={setPage}
          />
        </nav>
      )}
      <br />
    </>
  );
};

export default SearchModule;
