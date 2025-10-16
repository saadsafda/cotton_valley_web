"use client";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { OrderAPI, ProductAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import DetailStatus from "./DetailStatus";
import DetailTitle from "./DetailTitle";
import DetailsTable from "./DetailsTable";
import DetailsConsumer from "./DetailsConsumer";
import SubOrders from "./SubOrders";
import { useMemo, useContext, useState, useEffect } from "react";
import CartContext from "@/helper/cartContext";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import DetailsAddress from "./DetailsAddress";

// This function recursively searches through all orders (and their sub-orders) to find the parent of a given targetOrderNumber.
const findParentOrderNumber = (orders, targetOrderNumber) => {
  for (const order of orders) {
    if (order.order_number === Number(targetOrderNumber)) {
      return order.order_number;
    }
    //Recursively search inside sub_orders. If the target is found inside, return the current order's number (the parent).
    if (order.sub_orders?.length) {
      const foundInSub = findParentOrderNumber(
        order.sub_orders,
        targetOrderNumber
      );
      if (foundInSub) {
        return order.order_number;
      }
    }
  }
  return null;
};

//This function fetches all orders from the API.
const getParentOrderNumber = async (orderNumber) => {
  try {
    const response = await request({ url: OrderAPI });
    const allOrders = response?.data?.data || [];
    return findParentOrderNumber(allOrders, orderNumber); //Uses the recursive function to find the parent of the given order number.
  } catch (err) {
    console.error("Error in getParentOrderNumber:", err);
    return null;
  }
};

//This recursively searches within an order and all its sub-orders for the order with the target number.
const findOrderByNumber = (order, targetOrderNumber) => {
  if (order.order_number === targetOrderNumber) {
    return order;
  }

  return null;
};

const Details = ({ params }) => {
  const { cartProducts, handleIncDec } = useContext(CartContext);
  const [productQty, setProductQty] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [reOrderLoading, setReOrderLoading] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["order", params],
    queryFn: async () => {
      const parentOrderNumber = params;
      if (!parentOrderNumber) throw new Error("Parent order not found");

      const res = await request({ url: `${OrderAPI}/${parentOrderNumber}` });
      return res?.data;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });
  //useMemo to extract the current order
  const currentOrder = useMemo(() => {
    if (!data) return null;
    return findOrderByNumber(data, params);
  }, [data, params]); //Once the parent order is fetched (data), this memoized function finds the actual order (could be a sub-order or sub-sub-order) matching params.


  const handleReorder = async () => {
    if (!currentOrder?.products?.length) {
      ToastNotification("error", "No products found to reorder");
      return;
    }

    setReOrderLoading(true);

    let addedCount = 0;
    let outOfStockProducts = [];
    let insufficientStockProducts = [];

    // Process products sequentially to check backend stock
    for (const orderProduct of currentOrder.products) {
      try {
        const productId = orderProduct.product_id || orderProduct.id;
        
        // Fetch current product data from backend
        const response = await request({ 
          url: `${ProductAPI}/${productId}` 
        });
        
        const backendProduct = response?.data;
        
        if (!backendProduct) {
          console.error(`Product ${orderProduct.name} not found in backend`);
          continue;
        }

        // Create a product object that matches the cart structure
        const productObj = {
          id: productId,
          name: backendProduct.name || orderProduct.name,
          sale_price: backendProduct.sale_price || orderProduct.price,
          slug: backendProduct.slug || productId,
          ...backendProduct,
        };
        
        // Check stock availability from backend data
        const stockStatus = backendProduct.stock_status;
        const availableStock = backendProduct.quantity || 0;
        const requestedQty = orderProduct.quantity;

        // Check if product is out of stock
        if (stockStatus === "out_of_stock" || availableStock === 0) {
          outOfStockProducts.push(productObj.name);
          continue;
        }

        // Check if requested quantity exceeds available stock
        if (availableStock < requestedQty) {
          insufficientStockProducts.push({
            name: productObj.name,
            requested: requestedQty,
            available: availableStock
          });
          // Add only available quantity
          handleIncDec(
            availableStock,
            productObj,
            productQty,
            setProductQty,
            setIsOpen,
            null,
          );
          addedCount++;
          continue;
        }

        // Add product to cart with requested quantity
        handleIncDec(
          requestedQty,
          productObj,
          productQty,
          setProductQty,
          setIsOpen,
          null,
        );
        addedCount++;
        setReOrderLoading(false);
      } catch (error) {
        console.error(
          `Failed to check stock or add product ${orderProduct.name} to cart:`,
          error
        );
        ToastNotification("error", `Failed to process ${orderProduct.name}`);
        setReOrderLoading(false);
      }
    }

    // Show appropriate notifications
    if (outOfStockProducts.length > 0) {
      ToastNotification(
        "error",
        `Out of stock: ${outOfStockProducts.join(", ")}`
      );
    }

    if (insufficientStockProducts.length > 0) {
      const messages = insufficientStockProducts.map(
        item => `${item.name} (requested: ${item.requested}, available: ${item.available})`
      );
      ToastNotification(
        "warning",
        `Limited stock: ${messages.join(", ")}`
      );
    }

    if (addedCount > 0) {
      ToastNotification(
        "success",
        `${addedCount} product(s) added to cart successfully!`
      );
    } else if (outOfStockProducts.length === 0 && insufficientStockProducts.length === 0) {
      ToastNotification("error", "No products could be added to cart");
    }
  };

  if (isLoading) return <Loader />;
  if (!currentOrder) return <div>Order not found</div>;

  return (
    <>
      <DetailTitle
        params={params}
        data={currentOrder}
        handleReorder={handleReorder}
        reOrderLoading={reOrderLoading}
      />
      <DetailStatus data={currentOrder} />
      <DetailsAddress data={currentOrder} />
      <DetailsTable data={currentOrder} />
      <DetailsConsumer data={currentOrder} />
      {currentOrder.sub_orders?.length > 0 && <SubOrders data={currentOrder} />}
    </>
  );
};

export default Details;
