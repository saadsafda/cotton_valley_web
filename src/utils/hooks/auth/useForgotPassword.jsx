import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import request from "../../axiosUtils";
import { ForgotPasswordAPI } from "../../axiosUtils/API";
import { ToastNotification } from "../../customFunctions/ToastNotification";
import { emailSchema, YupObject } from "../../validation/ValidationSchemas";

export const ForgotPasswordSchema = YupObject({ email: emailSchema });

const useHandleForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await request({
          url: ForgotPasswordAPI,
          method: "post",
          data,
        });
        return response;
      } catch (error) {
        // Re-throw to be handled in onError
        throw error;
      }
    },
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200 || responseData.status === 201) {
        ToastNotification(
          "success",
          responseData.data.message ||
            "Password reset email sent successfully. Please check your email."
        );
        Cookies.set("ue", requestData.email);
        // Redirect to success message page
        router.push("/auth/forgot-password-success");
      } else {
        ToastNotification(
          "error",
          responseData.data?.message || "Failed to send reset email"
        );
      }
    },
    onError: (error) => {
      console.error("Forgot password error:", error);
      const errorMessage =
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send reset email. Please try again.";
      ToastNotification("error", errorMessage);
    },
  });
};
export default useHandleForgotPassword;
