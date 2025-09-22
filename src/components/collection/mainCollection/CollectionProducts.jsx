import { useState } from "react";
import { useParams } from "next/navigation";
import { Col, Row } from "reactstrap";
import NoDataFound from "@/components/common/NoDataFound";
import Pagination from "@/components/common/Pagination";
import ProductBox1 from "@/components/common/productBox/productBox1/ProductBox1";
import noProduct from "../../../../public/assets/svg/no-product.svg";
import ProductSkeletonComponent from "@/components/common/skeletonLoader/productSkeleton/ProductSkeletonComponent";

const CollectionProducts = ({ grid, setPage, data, fetchStatus }) => {
  return (
    <>
      {fetchStatus == "fetching" ? (
        <Row
          xxl={grid !== 3 && grid !== 5 ? 4 : ""}
          xl={grid == 5 ? 5 : 3}
          lg={grid == 5 ? 4 : 2}
          md={3}
          xs={2}
          className={`g-sm-4 g-3 product-list-section ${
            grid == "list" ? "list-style" : ""
          }`}
        >
          <ProductSkeletonComponent item={40} />
        </Row>
      ) : data?.length > 0 ? (
        <Row
          xxl={grid !== 3 && grid !== 5 ? 4 : ""}
          xl={grid == 5 ? 5 : 3}
          lg={grid == 5 ? 4 : 2}
          md={3}
          xs={2}
          className={`g-sm-4 g-3 product-list-section ${
            grid == "list" ? "list-style" : ""
          }`}
        >
          {data?.map((product, i) => (
            <Col key={i}>
              <ProductBox1
                imgUrl={product?.product_thumbnail}
                productDetail={{ ...product }}
                classObj={{ productBoxClass: "product-box-3" }}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <NoDataFound
          data={{
            imageUrl: noProduct,
            customClass: "no-data-added collection-no-data",
            title: "Sorry! Couldn't find the products you were looking For!",
            description:
              "Please check if you have misspelt something or try searching with other way.",
            height: 345,
            width: 345,
          }}
        />
      )}

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
    </>
  );
};

export default CollectionProducts;
