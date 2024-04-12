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
  const loading = ref(false);
  const errors = ref({});
  const message = ref("");

  /*** Actions */
  const login = ($params: any) => {
    loading.value = true;
    errors.value = {};
    message.value = "";
    authRepo
      .login($params)
      .then((res) => {
        const data = res.data;
        user.value = data.user;
        authenticated.value = "true";
        token.value = data.token;
        console.log(res);
        // window.location.href = "/bills";
      })
      .catch((err) => {
        message.value = err.response.data.message;
      })
      .finally(() => (loading.value = false));
  };

  return { login };
});
