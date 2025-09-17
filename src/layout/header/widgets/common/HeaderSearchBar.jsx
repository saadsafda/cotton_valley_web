import { useContext, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import ProductIdsContext from "@/helper/productIdsContext";

const HeaderSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const { i18Lang } = useContext(I18NextContext);
  const { filteredProduct } = useContext(ProductIdsContext); // 👈 get products here
  const router = useRouter();

  const onHandleSearch = () => {
    if (searchValue) {
      router.push(`/${i18Lang}/search?search=${searchValue}`);
    } else {
      router.push(`/${i18Lang}/search`);
    }
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 0 && filteredProduct?.length) {
      const filtered = filteredProduct
        .filter(
          (p) =>
            p?.name?.toLowerCase().includes(value.toLowerCase()) ||
            p?.id?.toString().toLowerCase().includes(value.toLowerCase())
        )
        .map((p) => ({ id: p.id, name: p.name })); // keep id + name
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const onSuggestionClick = (value) => {
    setSearchValue(value.name);
    setFilteredSuggestions([]);
    router.push(`/${i18Lang}/product/${value.id}`); // 👈 redirect directly to product
  };

  return (
    <div className="middle-box" style={{ position: "relative" }}>
      <div className="search-box">
        <InputGroup>
          <Input
            type="search"
            className="form-control"
            placeholder="I'm searching for..."
            value={searchValue}
            onChange={onChangeHandler}
          />
          <Btn
            className="btn"
            type="button"
            id="button-addon2"
            onClick={onHandleSearch}
          >
            <RiSearchLine />
          </Btn>
        </InputGroup>

        {/* Suggestion Dropdown */}
        {filteredSuggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ddd",
              listStyle: "none",
              margin: 0,
              padding: "5px 0",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => onSuggestionClick(item)}
                style={{
                  display: "block",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f1f1",
                }}
              >
                {item.name} | {item.id}
                <br />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderSearchBar;
