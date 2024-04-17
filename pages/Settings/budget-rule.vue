<template>
  <h3 class="text-lg font-semibold text-gray-800">Budget Rule Setup</h3>
  <p class="mt-2 text-gray-600">
    The Budget Rule Setup allows you to allocate your income into different
    categories based on percentage. Here, you can create custom categories for
    your financial planning, such as savings, investments, and expenses. Here's
    how you can set it up:
  </p>
  <ol class="list-decimal pl-5 mt-2 text-gray-600">
    <li>Create a new category (e.g., Savings, Essentials, Entertainment).</li>
    <li>Assign a percentage of your income to this newly created category.</li>
    <li>
      Ensure that the total percentages for all your categories add up to 100%
      of your income.
    </li>
    <li>
      Add as many categories as you need and adjust their percentages to suit
      your financial goals.
    </li>
    <li>
      Our system will automatically calculate and display how your income is
      allocated among these categories.
    </li>
  </ol>
  <p class="mt-2 text-gray-600">
    Remember, you can always revisit and modify these categories and their
    allocations to reflect your changing financial priorities.
  </p>

  <div class="mt-10">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Your Categories</h3>
    <SettingsCategoryList
      :categories="getBudgetRuleCategories"
      @delete="func_deleteCategory"
    />
    <SettingsCategoryForm @save="func_saveCategory" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Budget Rule - Kupown",
  meta: [
    {
      name: "description",
      content: "Helping people to analyze their finances.",
    },
  ],
});

definePageMeta({
  layout: "settings",
});
const { $emitter } = useNuxtApp();

/** Budget Rule Store */
const budgetRuleStore = useBudgetRuleStore();
const { getBudgetRuleCategories } = storeToRefs(budgetRuleStore);

onMounted(() => {
  budgetRuleStore.fetchList();
});

// Methods
const func_deleteCategory = (categoryId: string) => {
  budgetRuleStore
    .destroy(categoryId)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: res?.data.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      budgetRuleStore.fetchList();
    })
    .catch((err) => {
      $emitter.emit("alert-notification", {
        message: err.response?.data.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    });
};

const func_saveCategory = (value: boolean) => {
  if (value) {
    budgetRuleStore.fetchList();
  }
};
</script>
