import type { AxiosInstance } from "axios";
import type { PasswordType, ProfileType } from "~/types/user";

export const setting = (axios: AxiosInstance) => ({
  async updateProfile(params: ProfileType) {
    return axios.patch("/settings/profile", params);
  },
  async changePassword(params: PasswordType) {
    return axios.patch("/settings/change-password", params);
  },
});
