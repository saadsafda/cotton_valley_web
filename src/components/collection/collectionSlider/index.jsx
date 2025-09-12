import CollectionSlider from "./CollectionSlider";
import WrapperComponent from "@/components/common/WrapperComponent";
import CollectionSidebar from "../collectionSidebar";
import MainCollection from "../mainCollection";
import OfferBanner from "@/components/parisTheme/OfferBanner";

const MainCollectionSlider = ({ filter, setFilter, categoryItem }) => {
  return (
    <>
      {categoryItem?.banner_image ? (
        <WrapperComponent colProps={{ xs: 12 }}>
          <OfferBanner
            classes={{ customHoverClass: "banner-contain hover-effect" }}
            imgUrl={categoryItem?.banner_image}
          />
        </WrapperComponent>
      ) : null}
      <CollectionSlider filter={filter} setFilter={setFilter} />
      <WrapperComponent
        classes={{ sectionClass: "section-b-space shop-section" }}
        customCol={true}
      >
        <CollectionSidebar filter={filter} setFilter={setFilter} />
        <MainCollection filter={filter} setFilter={setFilter} />
      </WrapperComponent>
    </>
  );
};

export default MainCollectionSlider;
