import type { AxiosInstance } from "axios";
import type { PasswordType, ProfileType } from "~/types/user";

export const auth = (axios: AxiosInstance) => ({
  async login(params: any): Promise<any> {
    return axios.post("/auth/login", params);
  },

  async register(params: any): Promise<any> {
    return axios.post("/auth/register", params);
  },

  async verify(token: string): Promise<any> {
    return axios.get(`/auth/verify/${token}`);
  },

  async forgotPassword(params: any): Promise<any> {
    return axios.post(`/auth/forgot-password`, params);
  },

  async resetPassword(token: string, params: any): Promise<any> {
    return axios.post(`/auth/reset-password/${token}`, params);
  },

  async updateProfile(params: ProfileType) {
    return axios.patch("/settings/profile", params);
  },

  async changePassword(params: PasswordType) {
    return axios.patch("/settings/change-password", params);
  },
});
