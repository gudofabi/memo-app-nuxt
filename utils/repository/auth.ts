import type { AxiosInstance } from "axios";

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
    return axios.get(`/auth/forgot-password`, params);
  },

  async resetPassword(token: string, params: any): Promise<any> {
    return axios.get(`/auth/reset-password/${token}`, params);
  },
});
