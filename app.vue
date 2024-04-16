<template>
  <SettingsVerifyAlert />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppToast />
  <SettingsSetupModal v-if="comp_showBudgetRuleModal" />
</template>

<script setup lang="ts">
/*** Auth Store */
const authStore = useAuthStore();

/*** Budget Rule Store */
const budgetRuleStore = useBudgetRuleStore();

const $route = useRoute();

onMounted(() => {
  if (authStore.isAuthenticated) {
    // Reactivity is built-in with Pinia
    budgetRuleStore.fetchList();
  }
});

const comp_showBudgetRuleModal = computed(() => {
  return (
    authStore.isAuthenticated &&
    budgetRuleStore.getBudgetRuleCategories.length === 0 &&
    !budgetRuleStore.getLoading &&
    budgetRuleStore.hasFetchedInitialCategories &&
    $route.name != "Settings-budget-rule" &&
    $route.name != "index"
  );
});
</script>
