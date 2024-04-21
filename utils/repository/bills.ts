import type { AxiosInstance } from "axios";

export const bills = (axios: AxiosInstance) => ({
  async getBills(page: number, limit: number): Promise<any> {
    return axios.get(`/bills/?page=${page}&limit=${limit}`);
  },

  async getBillById(id: string): Promise<any> {
    return axios.get(`/bills/${id}`);
  },

  async updateBill(id: string, params: any): Promise<any> {
    return axios.patch(`/bills/${id}`, params);
  },

  async createBill(params: any): Promise<any> {
    return axios.post("/bills/", params);
  },

  async deleteBill(billId: string): Promise<any> {
    return axios.delete(`/bills/${billId}`);
  },
});
