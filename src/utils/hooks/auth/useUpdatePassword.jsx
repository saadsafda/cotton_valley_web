import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import request from "../../axiosUtils";
import { UpdatePasswordAPI } from "../../axiosUtils/API";
import { ToastNotification } from "../../customFunctions/ToastNotification";
import {
  passwordConfirmationSchema,
  passwordSchema,
  YupObject,
} from "../../validation/ValidationSchemas";

export const UpdatePasswordSchema = YupObject({
  password: passwordSchema,
  password_confirmation: passwordConfirmationSchema,
});

const useUpdatePassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      // Check if token is provided in data or from cookies
      const resetToken = data.token || Cookies.get("uo");
      const email = data.email || Cookies.get("ue");

      if (!resetToken) {
        throw new Error(
          "Reset token is missing. Please request a new password reset."
        );
      }

      try {
        const response = await request({
          url: UpdatePasswordAPI,
          method: "post",
          data: {
            password: data.password,
            token: resetToken,
            email: email,
          },
        });
        return response;
      } catch (error) {
        // Re-throw to be handled in onError
        throw error;
      }
    },
    onSuccess: (resData) => {
      if (resData.status === 200 || resData.status === 201) {
        const successMessage =
          resData.data.message ||
          "Your password has been changed successfully. Use your new password to log in.";
        ToastNotification("success", successMessage);

        // Clean up cookies
        Cookies.remove("uo", { path: "/" });
        Cookies.remove("ue", { path: "/" });

        // Redirect to login after delay
        router.push("/auth/login");
      } else {
        ToastNotification(
          "error",
          resData.data?.message || "Failed to update password"
        );
      }
    },
    onError: (error) => {
      console.error("Update password error:", error);

      // Clean up cookies on error
      Cookies.remove("uo", { path: "/" });
      Cookies.remove("ue", { path: "/" });

      const errorMessage =
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update password. Please try again.";

      ToastNotification("error", errorMessage);

      // Redirect to forgot password page after error
      setTimeout(() => {
        router.push("/auth/forgot-password");
      }, 3000);
    },
  });
};
export default useUpdatePassword;
