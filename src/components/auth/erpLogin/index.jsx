"use client";
import { useEffect, useState } from "react";
import Loader from "@/layout/loader";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const ErpLoginContent = () => {
  const searchParams = useSearchParams();
  const [isWrong, setIsWrong] = useState(false);
  const token = searchParams.get("token");
  console.log("ERP Token:", token);
  useEffect(() => {
    if (token) {
      setCookieAndRedirect(token);
    } else {
      setIsWrong(true);
    }
  }, [token]);

  const setCookieAndRedirect = (token) => {
    Cookies.set("uat", token, {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 6000),
    });
    window.location.href = "/";
  };

  return <Loader />;
};

export default ErpLoginContent;
