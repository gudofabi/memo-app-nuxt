import type { AxiosInstance } from "axios";
import type { BudgetRuleCategory } from "~/types/budgetRule";

export const budgetRule = (axios: AxiosInstance) => ({
  async fetchBudgetRuleCategories(): Promise<any> {
    return axios.get("/budget-rules");
  },

  async createBudgetRuleCategory(params: BudgetRuleCategory): Promise<any> {
    return axios.post("/budget-rules", params);
  },

  async deleteBudgetRuleCategory(categoryId: number | string): Promise<any> {
    return axios.delete(`/budget-rules/${categoryId}`);
  },
});
