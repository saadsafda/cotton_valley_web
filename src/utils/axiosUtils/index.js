import axios from "axios";
import getCookie from "../customFunctions/GetCookie";

const clientForReal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

const client = axios.create({
  baseURL: process.env.API_PROD_URL,
  headers: {
    Accept: "application/json",
  },
});

export const requestForReal = async ({ ...options }, router) => {
  clientForReal.defaults.headers.common.Authorization = `Bearer ${getCookie("uat")}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 403) {
      router && router.push("/403")
    }
    router && router.push('/404')
    return error;
  };
  try {
    const response = await clientForReal(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

const request = async ({ ...options }, router) => {
  client.defaults.headers.common.Authorization = `Bearer ${getCookie("uat")}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error?.response?.status == 403) {
      router && router.push("/403")
    }
    router && router.push('/404')
    throw error;
  };
  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    onError(error);
  }
};

export default request;
