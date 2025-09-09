import CollectionSlider from "./CollectionSlider";
import WrapperComponent from "@/components/common/WrapperComponent";
import CollectionSidebar from "../collectionSidebar";
import MainCollection from "../mainCollection";
import OfferBanner from "@/components/parisTheme/OfferBanner";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { useContext } from "react";

const MainCollectionSlider = ({ filter, setFilter }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <WrapperComponent colProps={{ xs: 12 }}>
        <OfferBanner
          classes={{ customHoverClass: "banner-contain hover-effect" }}
          imgUrl={themeOption?.collection?.collection_banner_image_url}
        />
      </WrapperComponent>
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
