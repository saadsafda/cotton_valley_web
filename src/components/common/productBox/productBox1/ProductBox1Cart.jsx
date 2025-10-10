import React, { useContext, useEffect, useMemo, useState } from "react";
import { Input, InputGroup } from "reactstrap";
import { useTranslation } from "@/app/i18n/client";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import CartContext from "@/helper/cartContext";
import VariationModal from "./variationModal";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

const ProductBox1Cart = ({ productObj }) => {
  const { cartProducts, handleIncDec } = useContext(CartContext);
  const [variationModal, setVariationModal] = useState("");
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [productQty, setProductQty] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const getSelectedVariant = useMemo(() => {
    return cartProducts.find((elem) => elem.product_id === productObj.id);
  }, [cartProducts]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find(
        (elem) => elem.product_id === productObj.id
      );
      if (foundProduct) {
        setIsOpen(true);
        setProductQty(foundProduct.quantity);
      } else {
        setProductQty(0);
        setIsOpen(false);
      }
    } else {
      setProductQty(0);
      setIsOpen(false);
    }
  }, [cartProducts]);

  return (
    <>
      <div className="add-to-cart-box">
        <Btn
          className="btn-add-cart addcart-button"
          disabled={productObj?.stock_status !== "in_stock" ? true : false}
          onClick={() => {
            productObj?.stock_status == "in_stock" &&
            productObj?.type === "classified"
              ? setVariationModal(productObj?.id)
              : handleIncDec(
                  1,
                  productObj,
                  productQty,
                  setProductQty,
                  setIsOpen
                );
          }}
        >
          {productObj?.stock_status == "in_stock" ? (
            <>
              {t("Add")}
              <span className="add-icon">
                <RiAddLine />
              </span>
            </>
          ) : (
            t("SoldOut")
          )}
        </Btn>
        <div
          className={`cart_qty qty-box ${
            productObj?.stock_status == "in_stock" ? "open" : ""
          }`}
        >
          <InputGroup>
            <Btn
              type="button"
              className="qty-left-minus"
              onClick={() =>
                handleIncDec(
                  -1,
                  productObj,
                  productQty,
                  setProductQty,
                  setIsOpen,
                  getSelectedVariant ? getSelectedVariant : null
                )
              }
              disabled={productQty <= 0 ? true : false}
            >
              <RiSubtractLine />
            </Btn>
            {productQty >= 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2px",
                }}
              >
                {parseFloat(productObj?.case_pack || 1) * productQty}
                <sub>pcs</sub>
              </div>
            )}
            <Input
              className="form-control input-number qty-input"
              type="number"
              name="quantity"
              value={productQty}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);

                // Prevent invalid numbers
                if (isNaN(val) || val < 0) {
                  val = 0;
                }

                setProductQty(val); // Only update temporary state
              }}
              onBlur={() => {
                // Update cart only when user finishes typing (loses focus)
                const difference =
                  productQty -
                  (getSelectedVariant ? getSelectedVariant.quantity : 0);

                if (difference !== 0) {
                  handleIncDec(
                    difference,
                    productObj,
                    getSelectedVariant ? getSelectedVariant.quantity : 0,
                    setProductQty,
                    setIsOpen,
                    getSelectedVariant ? getSelectedVariant : null
                  );
                }
              }}
            />
            <Btn
              type="button"
              className="qty-right-plus"
              onClick={() =>
                handleIncDec(
                  1,
                  productObj,
                  productQty,
                  setProductQty,
                  setIsOpen,
                  getSelectedVariant ? getSelectedVariant : null,
                  true
                )
              }
            >
              <RiAddLine />
            </Btn>
          </InputGroup>
        </div>
      </div>
      <VariationModal
        setVariationModal={setVariationModal}
        variationModal={variationModal}
        productObj={productObj}
      />
    </>
  );
};

export default ProductBox1Cart;
