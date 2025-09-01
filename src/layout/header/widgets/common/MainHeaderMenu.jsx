import { useState, useEffect, useContext, useMemo } from "react";
import MenuList from "./MenuList";
import { headerMenu } from "../../../../data/HeadersMenu";
import CategoryContext from "@/helper/categoryContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { placeHolderImage } from "../../../../data/CommonPath";

const MainHeaderMenu = () => {
  const [isOpen, setIsOpen] = useState([]);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory("product");
  const { themeOption } = useContext(ThemeOptionContext);
  const filteredCategories = useMemo(() => {
    return categoryData?.filter((elem) =>
      themeOption?.header?.category_ids?.includes(elem.id)
    );
  });

  const makeImageUrl = (image) => {
    // if image is start with https then return image
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const url = `${base.replace(/\/+$/, "")}`;
    return image
      ? image.startsWith("https://")
        ? image
        : `${url}${image}`
      : placeHolderImage;
  };

  useEffect(() => {
    let categoryChildren = [];
    for (let i = 0; i < headerMenu.length; i++) {
      const menu = headerMenu[i];
      if (menu.title === "Categories") {
        for (let j = 0; j < filteredCategories.length; j++) {
          const category = filteredCategories[j];
          categoryChildren.push({
            title: category.name,
            path: '/collections',
            params: { category: category.slug },
            image: makeImageUrl(category?.category_image?.original_url),
          });
        }
        menu.children = categoryChildren;
      }
    }
  }, [filteredCategories]);

  return (
    <ul className="navbar-nav">
      {headerMenu.map((menu, i) => (
        <MenuList
          menu={menu}
          key={i}
          customClass={"nav-item dropdown"}
          level={0}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ))}
    </ul>
  );
};

export default MainHeaderMenu;
