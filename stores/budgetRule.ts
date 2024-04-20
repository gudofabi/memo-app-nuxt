import type { AxiosInstance } from "axios";
import { defineStore } from "pinia";
import type { BudgetRuleCategory } from "~/types/budgetRule";
import { budgetRule } from "~/utils/repository/budgetRule";

export const useBudgetRuleStore = defineStore("budgetRuleStore", () => {
  const { $auth } = useNuxtApp();
  const budgetRuleRepo = budgetRule($auth as AxiosInstance);

  /*** State */
  const budgetRuleCategories = ref([]);
  const loading = ref(false);
  const message = ref("");
  const hasFetchedInitialCategories = ref(false);

  const getBudgetRuleCategories = computed(() => {
    return budgetRuleCategories.value ?? [];
  });

  const getLoading = computed(() => {
    return loading.value ?? false;
  });

  const getTotal = computed(() => {
    const categories = budgetRuleCategories.value;
    let totalPercentage = 0;
    for (let category of categories) {
      totalPercentage += category?.percentage;
    }
    return totalPercentage;
  });

  /*** Actions */
  const fetchList = async () => {
    loading.value = true;
    try {
      const res = await budgetRuleRepo.fetchBudgetRuleCategories();
      budgetRuleCategories.value = res.data.result;
      message.value = res.data.message;
    } catch (err: any) {
      message.value = err;
    } finally {
      loading.value = false;
      hasFetchedInitialCategories.value = true;
    }
  };

  const create = async (params: BudgetRuleCategory) => {
    return await budgetRuleRepo.createBudgetRuleCategory(params);
  };

  const destroy = async (categoryId: string) => {
    return await budgetRuleRepo.deleteBudgetRuleCategory(categoryId);
  };

  return {
    getBudgetRuleCategories,
    getLoading,
    hasFetchedInitialCategories,
    getTotal,
    fetchList,
    create,
    destroy,
  };
});
