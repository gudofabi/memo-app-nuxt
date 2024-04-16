import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import type { PasswordType, ProfileType } from "~/types/user";
import { auth } from "~/utils/repository/auth";

export const useAuthStore = defineStore("authStore", () => {
  const { $axios, $auth, $emitter } = useNuxtApp();
  const regularRepo = auth($axios as AxiosInstance);
  const authRepo = auth($auth as AxiosInstance);

  /*** State */
  const user = useCookie("user");
  const token = useCookie("token");
  const authenticated = useCookie("authenticated");
  const isVerify = useCookie("isVerify");
  const code = ref("");
  const loading = ref(false);
  const errors = ref({});
  const message = ref("");

  /*** Computed */
  const isAuthenticated = computed(() => {
    return authenticated.value ?? false;
  });

  const getUser = computed(() => {
    return user.value ?? {};
  });

  const getIsVerify = computed(() => {
    return isVerify.value ?? false;
  });

  /*** Actions */
  const login = ($params: any) => {
    loading.value = true;
    errors.value = {};
    message.value = "";
    regularRepo
      .login($params)
      .then((res: any) => {
        const data = res.data;
        user.value = data.user;
        isVerify.value = data.user.isVerified;
        authenticated.value = "true";
        token.value = data.token;
        window.location.href = "/bills";
      })
      .catch((err: any) => {
        message.value = err.response.data.message;
      })
      .finally(() => (loading.value = false));
  };

  const register = ($params: any) => {
    loading.value = true;
    errors.value = {};
    message.value = "";
    regularRepo
      .register($params)
      .then((res: any) => {
        message.value = res.data.message;
        $emitter.emit("alert-notification", {
          message: res.data.message,
          alertType: "success",
          timeout: 3000,
          show: true,
        });
        setTimeout(() => {
          window.location.href = "/login";
          message.value = "";
        }, 3000);
      })
      .catch((err: any) => {
        errors.value = err.response.data.errors;
      })
      .finally(() => (loading.value = false));
  };

  const verify = ($token: string) => {
    loading.value = true;
    errors.value = {};
    message.value = "";
    regularRepo
      .verify($token)
      .then((res: any) => {
        code.value = res.status;
        message.value = res.data.message;
      })
      .catch((err: any) => {
        code.value = err.response.status;
        message.value = err.response.data.message;
      })
      .finally(() => (loading.value = false));
  };

  const forgotPassword = ($params: any) => {
    return regularRepo.forgotPassword($params);
  };

  const resetPassword = ($token: string, password: string) => {
    const $params = {
      password,
    };
    return regularRepo.resetPassword($token, $params);
  };

  const updateProfile = (params: ProfileType) => {
    loading.value = true;
    message.value = "";
    authRepo
      .updateProfile(params)
      .then((res: any) => {
        // Assuming success statuses are 200 and 201 only
        const isSuccess = res.status === 200 || res.status === 201;

        // Emit a notification based on the response status
        $emitter.emit("alert-notification", {
          message: res.data.message,
          alertType: isSuccess ? "success" : "error",
          timeout: 3000,
          show: true,
        });

        // Update session user only on success
        if (isSuccess) {
          user.value = res.data.user;
        }
      })
      .catch((err: any) => {
        const errorMessage =
          err?.response?.data?.message || "An unexpected error occurred";

        $emitter.emit("alert-notification", {
          message: errorMessage,
          alertType: "error",
          timeout: 3000,
          show: true,
        });
      });
  };

  const changePassword = (params: PasswordType) => {
    loading.value = true;
    message.value = "";
    authRepo
      .changePassword(params)
      .then((res: any) => {
        // Assuming success statuses are 200 and 201 only
        const isSuccess = res.status === 200 || res.status === 201;

        // Emit a notification based on the response status
        $emitter.emit("alert-notification", {
          message: res.data.message,
          alertType: isSuccess ? "success" : "error",
          timeout: 3000,
          show: true,
        });

        // Update session user only on success
        if (isSuccess) {
          user.value = res.data.user;
        }
      })
      .catch((err: any) => {
        const errorMessage =
          err?.response?.data?.message || "An unexpected error occurred";

        $emitter.emit("alert-notification", {
          message: errorMessage,
          alertType: "error",
          timeout: 3000,
          show: true,
        });
      });
  };

  return {
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    loading,
    message,
    code,
    isAuthenticated,
    getUser,
    getIsVerify,
  };
});
