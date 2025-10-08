import React, { useContext, useEffect, useState } from "react";
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
import SettingContext from "@/helper/settingContext";

const PlaceOrder = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const isAuth = Cookies.get("uat");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { settingData, convertCurrency } = useContext(SettingContext);
  const [minOrderAmt, setMinOrderAmt] = useState(0);
  const [clientLocation, setClientLocation] = useState({
    ip: null,
    latitude: null,
    longitude: null,
  });

  // Fetch client IP address
  const fetchClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setClientLocation((prev) => ({ ...prev, ip: data.ip }));
    } catch (error) {
      console.error('Failed to fetch IP address:', error);
    }
  };

  // Fetch client geolocation (latitude and longitude)
  const fetchClientGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setClientLocation((prev) => ({
            ...prev,
            latitude: position.coords.latitude || "",
            longitude: position.coords.longitude || "",
          }));
        },
        (error) => {
          console.error('Failed to get geolocation:', error);
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  };

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
      let totalAmount = 0;
      for (let i = 0; i < cartProducts.length; i++) {
        const ele = cartProducts[i];
        const price =
          ele?.variation?.sale_price || ele?.product?.sale_price || 0;
        totalAmount += price * ele.quantity;
      }
      if (minOrderAmt && totalAmount < minOrderAmt) {
        toast.error(`Minimum order amount is ${convertCurrency(minOrderAmt)}`);
        setIsLoading(false);
        return;
      }

      toast.info(t("PlacingOrder") || "Placing your order...");
      const items = cartProducts.map((item) => ({
        item_code: item?.variation?.id || item?.product?.id,
        qty: item.quantity,
        rate: item?.variation?.sale_price || item?.product?.sale_price,
      }));

      // Validate items
      const invalidItems = items.filter(
        (item) => !item.item_code || !item.qty || !item.rate
      );
      if (invalidItems.length > 0) {
        throw new Error(t("InvalidCartItems") || "Some cart items are invalid");
      }

      // Format current date and time as "YYYY-MM-DD HH:mm:ss"
      const localDate = new Date();
      const formatted = localDate
        .toLocaleString("sv-SE", { hour12: false }) // "YYYY-MM-DD HH:mm:ss"
        .replace("T", " ");

      const response = await request({
        url: AddToCartAPI,
        method: "POST",
        data: { 
          items, 
          submit: true, 
          submit_datetime: formatted, 
          client_ip: clientLocation.ip,
          client_latitude: clientLocation.latitude || "",
          client_longitude: clientLocation.longitude || "",
          ...values 
        },
      });

      // Show success message
      toast.success(
        t("OrderPlacedSuccessfully") || "Order placed successfully!"
      );

      // Redirect to order details
      if (response?.cart?.message) {
        router.push(
          `/${i18Lang}/account/order/details/${response?.cart?.message}`
        );
        setCartProducts([]); // Clear cart products in context
        localStorage.removeItem("cart"); // Clear cart from localStorage
      } else {
        // Fallback redirect if order_id is not available
        router.push(`/${i18Lang}/account/order`);
        setCartProducts([]); // Clear cart products in context
        localStorage.removeItem("cart"); // Clear cart from localStorage
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

  useEffect(() => {
    // Perform side effect here
    if (settingData?.general?.min_order_amount) {
      setMinOrderAmt(settingData?.general?.min_order_amount);
    }

    // Fetch client location data
    fetchClientIP();
    fetchClientGeolocation();

    return () => {
      // Cleanup here
    };
  }, [settingData]);

  return (
    <>
      <Link
        href={`/${i18Lang}/cart`}
        className="fw-bold mt-4 outline btn btn-md cart-button text-theme"
      >
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
