import { useContext, useState, useEffect, useRef } from "react";
import { Input, InputGroup } from "reactstrap";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axiosUtils";

const HeaderSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const { i18Lang } = useContext(I18NextContext);
  const router = useRouter();
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce effect to delay API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data: productData, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchValue],
    queryFn: () =>
      request({
        url: "/product/product_ids",
        params: { search: debouncedSearchValue },
      }),
    enabled: debouncedSearchValue.length > 0,
    refetchOnWindowFocus: false,
    select: (data) => data.data,
  });

  // Update suggestions when productData changes
  useEffect(() => {
    if (
      productData &&
      productData.length > 0 &&
      debouncedSearchValue.length > 0
    ) {
      setFilteredSuggestions(productData);
    } else {
      setFilteredSuggestions([]);
    }
  }, [productData, debouncedSearchValue]);

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

    // Clear suggestions if search value is empty
    if (value.length === 0) {
      setFilteredSuggestions([]);
    }
  };

  const onSuggestionClick = (value) => {
    setSearchValue(value.id);
    setFilteredSuggestions([]);
    setDebouncedSearchValue(""); // Clear debounced value to stop API calls
    router.push(`/${i18Lang}/product/${value.id}`);
  };

  return (
    <div
      className="middle-box"
      style={{ position: "relative" }}
      ref={searchRef}
    >
      <div className="search-box">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onHandleSearch();
          }}
        >
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
              type="submit"
              id="button-addon2"
              onClick={onHandleSearch}
            >
              <RiSearchLine />
            </Btn>
          </InputGroup>
        </form>

        {/* Suggestion Dropdown */}
        {(isLoading || filteredSuggestions.length > 0) &&
          debouncedSearchValue.length > 0 && (
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
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {isLoading ? (
                <li
                  style={{
                    display: "block",
                    padding: "12px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Searching...
                </li>
              ) : filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => onSuggestionClick(item)}
                    style={{
                      display: "block",
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom:
                        index < filteredSuggestions.length - 1
                          ? "1px solid #f1f1f1"
                          : "none",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f8f9fa";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    <strong>{item.name}</strong>
                    <br />
                    <small style={{ color: "#666" }}>ID: {item.id}</small>
                  </li>
                ))
              ) : (
                <li
                  style={{
                    display: "block",
                    padding: "12px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  No products found
                </li>
              )}
            </ul>
          )}
      </div>
    </div>
  );
};

export default HeaderSearchBar;
