import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import type { PasswordType, ProfileType } from "~/types/user";
import { setting } from "~/utils/repository/setting";

export const useSettingStore = defineStore("settingStore", () => {
  const { $auth, $emitter } = useNuxtApp();
  const authStore = useAuthStore();
  const settingRepo = setting($auth as AxiosInstance);

  /** States */
  const loading = ref(false);
  const message = ref("");

  /** Functions */
  const updateProfile = (params: ProfileType) => {
    loading.value = true;
    message.value = "";
    settingRepo
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
          authStore.user.value = res.data.user;
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
    settingRepo
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
          setUserToSession(res.data.user);
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
});
