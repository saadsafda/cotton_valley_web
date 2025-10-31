import { useContext } from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
  Label,
} from "reactstrap";
import CategoryContext from "@/helper/categoryContext";
import { usePathname, useRouter } from "next/navigation";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";

const CollectionCategory = ({ filter, setFilter }) => {
  const [attribute, price, pcsPrice, rating, sortBy, field, layout] =
    useCustomSearchParams([
      "attribute",
      "price",
      "pcsPrice",
      "rating",
      "sortBy",
      "field",
      "layout",
    ]);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory("product");
  const router = useRouter();
  const pathname = usePathname();

  // currently selected main category
  const selectedCategorySlug = filter?.category?.[0];
  const selectedCategory = selectedCategorySlug
    ? categoryData?.find((cat) => cat.slug === selectedCategorySlug)
    : null;

  // show subcategories if a category is selected
  const subcategories = selectedCategorySlug
    ? selectedCategory?.subcategories || []
    : categoryData;

  const redirectToCollection = (event, slug, type) => {
    event.preventDefault();
    let tempFilter = { ...filter };

    if (type === "category") {
      // toggle category selection (only one at a time in this case)
      tempFilter.category = [slug];
      tempFilter.subcategory = []; // reset subcategories when category changes
    } else if (type === "subcategory") {
      let temp = [...(tempFilter?.subcategory || [])];
      if (!temp.includes(slug)) {
        temp.push(slug);
      } else {
        temp = temp.filter((elem) => elem !== slug);
      }
      tempFilter.subcategory = temp;
    }

    setFilter(tempFilter);

    const queryParams = new URLSearchParams({
      ...attribute,
      ...price,
      ...pcsPrice,
      ...sortBy,
      ...field,
      ...rating,
      ...layout,
      ...(tempFilter.category?.length
        ? { category: tempFilter.category[0] }
        : {}),
      ...(tempFilter.subcategory?.length
        ? { subcategory: tempFilter.subcategory.join(",") }
        : {}),
    }).toString();

    router.push(`${pathname}?${queryParams}`);
  };

  return (
    <AccordionItem>
      <AccordionHeader targetId="1">
        <span>{!selectedCategorySlug ? "Categories" : "Sub Categories"}</span>
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <ul className="category-list custom-padding custom-height">
          {!selectedCategorySlug &&
            categoryData?.map((elem, i) => (
              <li key={i}>
                <div className="form-check category-list-box">
                  <Input
                    className="checkbox_animated"
                    type="checkbox"
                    id={elem?.name}
                    checked={filter?.category?.includes(elem?.slug)}
                    onChange={(e) =>
                      redirectToCollection(e, elem?.slug, "category")
                    }
                  />
                  <Label className="form-check-label" htmlFor={elem?.name}>
                    <span className="name">{elem?.name}</span>
                    <span className="number">({elem?.products_count})</span>
                  </Label>
                </div>
              </li>
            ))}

          {selectedCategorySlug &&
            subcategories?.map((elem, i) => (
              <li key={i}>
                <div className="form-check category-list-box">
                  <Input
                    className="checkbox_animated"
                    type="checkbox"
                    id={elem?.name}
                    checked={filter?.subcategory?.includes(elem?.slug)}
                    onChange={(e) =>
                      redirectToCollection(e, elem?.slug, "subcategory")
                    }
                  />
                  <Label className="form-check-label" htmlFor={elem?.name}>
                    <span className="name">{elem?.name}</span>
                    <span className="number">
                      ({elem?.products_count || elem?.product_count})
                    </span>
                  </Label>
                </div>
              </li>
            ))}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionCategory;
