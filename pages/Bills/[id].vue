<template>
  <div
    v-if="getLoading"
    class="flex justify-center align-middle items-center h-screen text-center"
  >
    <h1 class="text-2xl text-indigo-500">Loading...</h1>
  </div>
  <div v-else class="mx-auto py-6 sm:px-6 lg:px-8 max-w-7xl">
    <div class="flex">
      <div class="w-1/2 mr-5">
        <!-- Expense list -->
        <ExpenseList :bill-data="getBill" @change="func_fetchBillById" />
        <!-- Expense Form -->
        <ExpenseForm
          v-if="getBill?.status === 'Active'"
          :bill-id="($route.params?.id as string)"
          @save-expense="func_fetchBillById"
        />
      </div>
      <div class="w-1/2">
        <!-- Record Card -->
        <ExpenseRecordCard
          :bill-data="getBill || {}"
          :bill-id="($route.params?.id as string)"
          @settle-bill="func_fetchBillById"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const billsStore = useBillsStore();
const { getLoading, getBill } = storeToRefs(billsStore);

const $route = useRoute();

// Life Cycle
onMounted(() => {
  func_fetchBillById();
});

// Methods

const func_fetchBillById = () => {
  billsStore.fetchBillById($route.params?.id as string);
};
</script>
