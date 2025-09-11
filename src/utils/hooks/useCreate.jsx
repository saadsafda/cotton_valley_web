import { useMutation } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import request from "../axiosUtils";
import SuccessHandle from "../customFunctions/SuccessHandle";
import Cookies from "js-cookie";

const useCreate = (
  url,
  updateId,
  path = false,
  message,
  extraFunction,
  notHandler,
  setCouponError
) => {
  const router = useRouter();
  const pathName = usePathname();
  return useMutation({
    mutationFn: (data) =>
      request({
        url: updateId
          ? `${url}/${Array.isArray(updateId) ? updateId.join("/") : updateId}`
          : url,
        data,
        method: "post",
      }),
    onSuccess: (resDta) => {
      Cookies.remove("uat", { path: "/" });
      Cookies.remove("session_id", { path: "/" });
      Cookies.remove("ue", { path: "/" });
      Cookies.remove("account", { path: "/" });
      Cookies.remove("CookieAccept", { path: "/" });
      Cookies.remove("newsLetterModal", { path: "/" });
      localStorage.removeItem("account");
      localStorage.removeItem("role");
      !notHandler &&
        SuccessHandle(resDta, router, path, message, setCouponError, pathName);
      extraFunction && extraFunction(resDta);
    },
    onError: (err) => {
      return err;
    },
  });
};

export default useCreate;
