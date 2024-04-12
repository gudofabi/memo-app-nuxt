import type { AxiosInstance } from "axios";
import type { ExpenseType } from "~/types/expensesTypes";

export const expenses = (axios: AxiosInstance) => ({
  createExpense(billId: string, params: ExpenseType): Promise<any> {
    return axios.post(`/expenses/bills/${billId}/expenses`, params);
  },

  updateExpense(
    billId: string,
    expenseId: string,
    params: ExpenseType
  ): Promise<any> {
    return axios.patch(
      `/expenses/bills/${billId}/expenses/${expenseId}`,
      params
    );
  },

  deleteExpense(billId: string, expenseId: string): Promise<any> {
    return axios.delete(`/expenses/bills/${billId}/expenses/${expenseId}`);
  },
});
