import { useContext, useEffect, useState } from "react";
import FilterSort from "./FilterSort";
import GridBox from "./GridBox";
import CollectionProducts from "./CollectionProducts";
import OfferBanner from "@/components/parisTheme/OfferBanner";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import FilterBtn from "./FilterBtn";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { RiFilterFill } from "react-icons/ri";
import TopPagination from "@/components/common/TopPagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";

const MainCollection = ({
  filter,
  setFilter,
  isBanner,
  isOffcanvas,
  classicStoreCard,
  initialGrid = 4,
  noSidebar,
  sellerClass,
}) => {
  const [grid, setGrid] = useState(initialGrid);
  const { themeOption, setCollectionMobile } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [layout] = useCustomSearchParams(["layout"]);
  const { slug } = useParams();
  const [page, setPage] = useState(1);

  const { data, fetchStatus } = useQuery({
    queryKey: [page, filter],
    queryFn: () =>
      request({
        url: ProductAPI,
        params: {
          page,
          status: 1,
          paginate: 40,
          field: filter?.field ?? "",
          price: filter?.price.join(",") ?? "",
          category: filter?.category.join(","),
          subcategory: filter?.subcategory.join(","),
          sort: "",
          sortBy: filter?.sortBy ?? "",
          rating: filter?.rating.join(",") ?? "",
          attribute: filter?.attribute.join(",") ?? "",
          store_slug: slug ? slug : null,
        },
      }),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (layout?.layout == "collection_3_grid") {
      setGrid(3);
    } else if (layout?.layout == "collection_4_grid") {
      setGrid(4);
    } else if (layout?.layout == "collection_5_grid") {
      setGrid(5);
    } else if (layout?.layout == "collection_list_view") {
      setGrid("list");
    }
  }, [layout]);
  return (
    <div
      className={`${
        sellerClass
          ? sellerClass
          : `col-custome-${isOffcanvas || noSidebar ? "12" : "9"}`
      }`}
    >
      {classicStoreCard && classicStoreCard}
      {isBanner && themeOption?.collection?.collection_banner_image_url && (
        <OfferBanner
          classes={{ customHoverClass: "banner-contain hover-effect mb-4" }}
          imgUrl={themeOption?.collection?.collection_banner_image_url}
        />
      )}
      <div className="show-button">
        <div className="filter-button-group mt-0">
          <div
            className="filter-button d-inline-block d-lg-none"
            onClick={() => setCollectionMobile((prev) => !prev)}
          >
            <a>
              <RiFilterFill /> {t("FilterMenu")}
            </a>
          </div>
        </div>
        <div className={`top-filter-menu${isOffcanvas ? "-2" : ""}`}>
          <FilterBtn isOffcanvas={isOffcanvas} />
          <FilterSort filter={filter} setFilter={setFilter} />
          <div
            className="show-button justify-content-between d-flex align-items-center"
            style={{ maxWidth: "1200px", margin: "20px auto" }}
          >
            <div
              style={{
                marginTop: "10px",
                width: "fit-content",
                marginRight: "auto",
              }}
            >
              Showing {data && data[0] ? data[0].from : 1} -{" "}
              {data && data[0] ? data[0].to : 30} of{" "}
              {data && data[0] ? data[0].total : 0} results
            </div>
            <nav
              className="custome-pagination"
              style={{
                marginTop: "10px",
                width: "fit-content",
                marginLeft: "auto",
              }}
            >
              <TopPagination
                current_page={data && data[0] ? data[0].current_page : 1}
                total={data && data[0] ? data[0].total : 0}
                per_page={data && data[0] ? data[0].per_page : 30}
                setPage={setPage}
              />
            </nav>
          </div>
          <GridBox grid={grid} setGrid={setGrid} />
        </div>
      </div>
      <CollectionProducts
        grid={grid}
        setPage={setPage}
        data={data}
        fetchStatus={fetchStatus}
      />
    </div>
  );
};

export default MainCollection;
