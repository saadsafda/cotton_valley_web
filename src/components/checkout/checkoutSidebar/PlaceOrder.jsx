import React, { useContext, useState } from "react";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import request from "@/utils/axiosUtils";
import { AddToCartAPI } from "@/utils/axiosUtils/API";
import CartContext from "@/helper/cartContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "react-toastify";

const PlaceOrder = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { cartProducts } = useContext(CartContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const isAuth = Cookies.get("uat");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = async () => {
    // Clear previous error
    setError(null);

    if (!isAuth) {
      router.push(`/${i18Lang}/auth/login`);
      return;
    }

    // Validate cart products
    if (!cartProducts || cartProducts.length === 0) {
      setError(t("CartIsEmpty") || "Cart is empty");
      toast.error(t("CartIsEmpty") || "Cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      // Show loading toast
      toast.info(t("PlacingOrder") || "Placing your order...");

      const items = cartProducts.map((item) => ({
        item_code: item?.variation?.id || item?.product?.id,
        qty: item.quantity,
        rate: item?.variation?.sale_price || item?.product?.sale_price,
      }));

      // Validate items
      const invalidItems = items.filter(item => !item.item_code || !item.qty || !item.rate);
      if (invalidItems.length > 0) {
        throw new Error(t("InvalidCartItems") || "Some cart items are invalid");
      }

      const response = await request({
        url: AddToCartAPI,
        method: "POST",
        data: { items, submit: true, ...values },
      });

      console.log("Order placed successfully:", response);
      
      // Show success message
      toast.success(t("OrderPlacedSuccessfully") || "Order placed successfully!");
      
      // Redirect to order details
      if (response?.cart?.message) {
        router.push(`/${i18Lang}/account/order/details/${response?.cart?.message}`);
      } else {
        // Fallback redirect if order_id is not available
        router.push(`/${i18Lang}/account/order`);
      }

    } catch (err) {
      console.error("Order placement failed:", err);
      
      // Extract error message
      let errorMessage = t("OrderPlacementFailed") || "Failed to place order";
      
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Link href={`/${i18Lang}/cart`} className="fw-bold mt-4 outline btn btn-md cart-button text-theme">
        {t("ViewCart")}
      </Link>
      <Btn
        className="btn-md fw-bold mt-4 text-white theme-bg-color w-100"
        onClick={handleClick}
        disabled={isLoading}
      >
        {t("PlaceOrder")}
      </Btn>
    </>
  );
};

export default PlaceOrder;
