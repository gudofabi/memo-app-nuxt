import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import type { ExpenseType } from "~/types/expensesTypes";
import { expenses } from "~/utils/repository/expenses";

export const useExpensesStore = defineStore("expensesStore", () => {
  const { $auth } = useNuxtApp();
  const expensesRepo = expenses($auth as AxiosInstance);

  /*** Actions */
  const update = async (
    billId: string,
    expenseId: string,
    params: ExpenseType
  ) => {
    return await expensesRepo.updateExpense(billId, expenseId, params);
  };

  const create = async (billId: string, params: ExpenseType) => {
    return await expensesRepo.createExpense(billId, params);
  };

  const destroy = async (billId: string, expenseId: string) => {
    return await expensesRepo.deleteExpense(billId, expenseId);
  };

  return {
    update,
    create,
    destroy,
  };
});
