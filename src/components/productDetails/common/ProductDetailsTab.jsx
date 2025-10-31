import { useState } from "react";
import { Col, TabContent, TabPane } from "reactstrap";
import NavTabTitles from "@/components/common/NavTabs";
import TextLimit from "@/utils/customFunctions/TextLimit";

const ProductDetailsTab = ({ productState }) => {
  const [activeTab, setActiveTab] = useState(1);
  const ProductDetailsTabTitle = [
    { id: 1, name: "Specifications" },
    { id: 2, name: "Description" },
    // { id: 3, name: 'QA' },
  ];
  // console.log(productState?.product?.description, "Description");
  return (
    <Col xs={12}>
      <div className="product-section-box mt-0">
        <NavTabTitles
          classes={{ navClass: "nav-tabs custom-nav" }}
          titleList={ProductDetailsTabTitle}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabContent className="custom-tab" activeTab={activeTab}>
          

          <TabPane className={activeTab == 1 ? "show active" : ""}>
            <div className="right-box-contain p-sticky">
              <div className="row">
                <div className="col-12 col-md-6">
                  <DetailsBox
                    title="Item Details"
                    array={[
                      {
                        heading: "Sub Category",
                        value: productState?.product?.sub_category_name,
                      },
                      {
                        heading: "Item Length",
                        value: productState?.product?.item_length,
                      },
                      {
                        heading: "Item Width",
                        value: productState?.product?.item_width,
                      },
                      {
                        heading: "Item Height",
                        value: productState?.product?.item_height,
                      },
                      {
                        heading: "Item Weight",
                        value: productState?.product?.item_weight,
                      },
                    ]}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailsBox
                    title="Package Details"
                    array={[
                      {
                        heading: "Package Length",
                        value: productState?.product?.package_length,
                      },
                      {
                        heading: "Package Width",
                        value: productState?.product?.package_width,
                      },
                      {
                        heading: "Package Height",
                        value: productState?.product?.package_height,
                      },
                      {
                        heading: "Package Weight",
                        value: productState?.product?.package_weight,
                      },
                    ]}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailsBox
                    title="Case Details"
                    array={[
                      {
                        heading: "Case Per Pallet",
                        value: productState?.product?.case_per_pallet,
                      },
                      {
                        heading: "Carton UPC",
                        value: productState?.product?.carton_upc,
                      },
                      {
                        heading: "Case Pack",
                        value: productState?.product?.case_pack,
                      },
                      { heading: "CBM", value: productState?.product?.cbm },
                    ]}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <DetailsBox
                    title="Pallet Details"
                    array={[
                      {
                        heading: "Pallet Hi",
                        value: productState?.product?.pallet_hi,
                      },
                      {
                        heading: "Pallet Ti",
                        value: productState?.product?.pallet_ti,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </TabPane>

          {/* Description */}
          <TabPane className={activeTab == 2 ? "show active" : ""}> 
            <TextLimit value={productState?.product?.description} />
          </TabPane>
          {/* <TabPane className={activeTab == 3 ? 'show active' : ''}>
            <QnATab productState={productState} activeTab={activeTab} />
          </TabPane> */}
        </TabContent>
      </div>
    </Col>
  );
};

export default ProductDetailsTab;

const DetailsBox = ({ title, array = [] }) => {
  return (
    <div className="pickup-box" style={{ borderTop: '0px solid #eee', paddingTop: '0px', marginBottom: '15px' }}>
      <div className="product-title">
        <h4>{title}</h4>
      </div>
      <div className="product-info">
        <ul className="product-info-list">
          {array.map((item, index) => (
            <li key={index}>
              {item.heading} : {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
