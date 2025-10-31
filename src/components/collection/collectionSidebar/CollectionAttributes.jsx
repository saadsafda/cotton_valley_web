import { usePathname, useRouter } from "next/navigation";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
  Label,
} from "reactstrap";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";

const CollectionAttributes = ({ attributeAPIData, filter, setFilter }) => {
  const router = useRouter();
  const [category, subcategory, price, pcsPrice, rating, sortBy, field, layout] =
    useCustomSearchParams([
      "category",
      "subcategory",
      "price",
      "pcsPrice",
      "rating",
      "sortBy",
      "field",
      "layout",
    ]);
  const pathname = usePathname();
  const checkAttribute = (slug) => {
    if (filter?.attribute?.indexOf(slug) != -1) {
      return true;
    } else return false;
  };
  const applyAttribute = (event) => {
    const index = filter.attribute.indexOf(event?.target?.value);
    let temp = [...filter?.attribute];
    if (event.target.checked) {
      temp.push(event?.target?.value);
    } else {
      temp.splice(index, 1);
    }
    setFilter((prev) => {
      return {
        ...prev,
        attribute: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({
        ...category,
        ...subcategory,
        ...price,
        ...pcsPrice,
        ...rating,
        ...sortBy,
        ...field,
        ...layout,
        attribute: temp,
      }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({
        ...category,
        ...subcategory,
        ...price,
        ...pcsPrice,
        ...rating,
        ...sortBy,
        ...field,
        ...layout,
      }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <>
      <AccordionItem>
        <AccordionHeader targetId='2'>
          <span>Availability</span>
        </AccordionHeader>
        <AccordionBody accordionId='2'>
          <ul className="category-list custom-padding show">
            <li>
              <div className="form-check m-0 category-list-box">
                <Input
                  className="checkbox_animated"
                  type="checkbox"
                  value="in_stock"
                  id="in_stock"
                  checked={checkAttribute("in_stock")}
                  onChange={applyAttribute}
                />
                <Label
                  className="form-check-label color-label-box"
                  htmlFor="in_stock"
                >
                  <span className="name">In Stock</span>
                </Label>
              </div>
            </li>
            <li>
              <div className="form-check m-0 category-list-box">
                <Input
                  className="checkbox_animated"
                  type="checkbox"
                  value="out_stock"
                  id="out_stock"
                  checked={checkAttribute("out_stock")}
                  onChange={applyAttribute}
                />
                <Label
                  className="form-check-label color-label-box"
                  htmlFor="out_stock"
                >
                  <span className="name">Out Stock</span>
                </Label>
              </div>
            </li>
          </ul>
        </AccordionBody>
      </AccordionItem>
    </>
  );
};

export default CollectionAttributes;
