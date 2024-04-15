import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import { auth } from "~/utils/repository/auth";

export const useAuthStore = defineStore("authStore", () => {
  const { $axios } = useNuxtApp();
  const authRepo = auth($axios as AxiosInstance);

  /*** State */
  const user = useCookie("user");
  const token = useCookie("token");
  const authenticated = useCookie("authenticated");
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

  /*** Actions */
  const login = ($params: any) => {
    loading.value = true;
    errors.value = {};
    message.value = "";
    authRepo
      .login($params)
      .then((res: any) => {
        const data = res.data;
        user.value = data.user;
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
    authRepo
      .register($params)
      .then((res: any) => {
        message.value = res.data.message;
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
    authRepo
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
    return authRepo.forgotPassword($params);
  };

  const resetPassword = ($token: string, password: string) => {
    const $params = {
      password,
    };
    return authRepo.resetPassword($token, $params);
  };

  return {
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    isAuthenticated,
    getUser,
  };
});
