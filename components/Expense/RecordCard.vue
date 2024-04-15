<template>
  <div
    class="bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200"
  >
    <div class="flex justify-between items-center pb-6">
      <h2 class="text-xl font-semibold text-indigo-600">Bill Overview</h2>
      <button
        v-if="billData.status === 'Active'"
        @click="func_settleBill"
        class="inline-flex items-center kp-btn"
      >
        Settle Bill
      </button>
    </div>

    <div
      class="flex justify-between items-center mb-4 border-b border-indigo-100 pb-4"
    >
      <div>
        <span class="text-gray-600 font-medium">Date:</span>
        <span class="ml-2 text-gray-800">{{
          func_formatDate(billData?.date)
        }}</span>
      </div>
      <div class="text-lg font-medium text-gray-600">
        {{ func_formatCurrency(billData?.salary) }}
      </div>
    </div>

    <!-- Budget Allocation -->
    <div class="mt-4 border-b border-indigo-100 pb-6">
      <h3 class="text-md font-semibold text-gray-800">Budget Allocation:</h3>
      <p class="text-sm text-gray-500 mb-5">
        Overview of your budget distribution across different categories as per
        the set rules.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(rule, index) in billData.budgetRuleBreakdown"
          :key="index"
          class="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
        >
          <div class="flex justify-between items-center">
            <span class="font-semibold text-indigo-600">{{
              rule.category
            }}</span>
            <span class="text-gray-800">{{ rule.percentage }}%</span>
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Allocated:
            {{ func_calculateAmount(rule.percentage) }}
          </div>
        </div>
      </div>
    </div>
    <!-- Expenses Total -->
    <div class="mt-4 border-b border-indigo-100 pb-6">
      <h3 class="text-md font-semibold text-gray-800">Expense Totals:</h3>
      <p class="text-sm text-gray-500 mb-5">
        The sum of expenses paid out, categorized for better financial tracking.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(total, category) in comp_totalsByCategory"
          :key="category"
          class="bg-red-50 p-4 rounded-lg border border-red-200"
        >
          <div class="flex justify-between items-center">
            <span class="font-semibold text-red-600">{{ category }}</span>
            <span class="text-gray-800">{{ func_formatCurrency(total) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Remaining Budget -->
    <div class="mt-4 border-b border-indigo-100 pb-6">
      <h3 class="text-md font-semibold text-gray-800">Remaining Budget:</h3>
      <p class="text-sm text-gray-500 mb-5">
        The remaining funds after accounting for the categorized expenses
        against the allocated budget.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="budget in comp_remainingBudgetByCategory"
          :key="budget.category"
          class="bg-green-50 p-4 rounded-lg border border-green-200"
        >
          <div class="flex justify-between items-center">
            <span class="font-semibold text-green-600">{{
              budget.category
            }}</span>
            <span class="text-gray-800">{{
              func_formatCurrency(budget.remaining)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Total -->
    <div class="mt-4 flex justify-between align-middle">
      <h4 class="text-2xl font-semibold text-gray-800">
        Total Remaining Budget:
      </h4>
      <p class="text-2xl font-semibold text-green-600">
        {{ func_formatCurrency(comp_totalRemainingBudget) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $emitter } = useNuxtApp();
import { formatCurrency, formatDate } from "~/utils/utils.ts";
import type { BillType } from "~/types/billTypes";

const billsStore = useBillsStore();

const props = defineProps<{
  billData: BillType;
  billId: string;
}>();

const emits = defineEmits<{
  (event: "settle-bill", value: boolean): void;
}>();

// VARS
const data_totalBills = ref(0);
const data_totalSaved = ref(0);

onMounted(() => {
  data_totalBills.value = props.billData.expenses?.reduce(
    (total: any, expense: any) => {
      if (expense.paid) {
        return total + (expense.amount || 0);
      }
      return total;
    },
    0
  );
});

// COMPUTED
const comp_totalsByCategory = computed(() => {
  const totals = {} as any;
  props.billData?.expenses?.map((expense: any) => {
    if (expense.paid && expense.category) {
      const category = expense.category;
      totals[category] = totals[category] || 0;
      totals[category] += expense.amount;
    }
  });
  return totals;
});

const comp_remainingBudgetByCategory = computed(() => {
  return (
    props.billData.budgetRuleBreakdown?.map((rule) => {
      const allocatedAmount = (props.billData.salary * rule.percentage) / 100;
      const spentAmount = comp_totalsByCategory.value[rule.category] || 0;
      return {
        category: rule.category,
        allocated: allocatedAmount,
        spent: spentAmount,
        remaining: allocatedAmount - spentAmount,
      };
    }) || []
  );
});

const comp_totalRemainingBudget = computed(() => {
  data_totalSaved.value = comp_remainingBudgetByCategory.value.reduce(
    (acc, categoryBudget) => {
      return acc + categoryBudget.remaining;
    },
    0
  );
  return data_totalSaved.value;
});

// METHODS

//*****  Helper function to calculate the amount for each budget rule
const func_calculateAmount = (percentage: number) => {
  let total = props.billData?.salary * (percentage / 100);
  return func_formatCurrency(total);
};

const func_formatCurrency = (value: number | null | undefined) => {
  return formatCurrency(value);
};

const func_formatDate = (date: any) => {
  if (!date) return;
  return formatDate(date);
};

const func_settleBill = () => {
  let params = {
    totalBills: data_totalBills.value,
    totalSaved: data_totalSaved.value,
  };

  billsStore
    .update(props.billId, params)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: res?.data.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      emits("settle-bill", true);
    })
    .catch((err) => {
      $emitter.emit("alert-notification", {
        message: err.response.data.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
      emits("settle-bill", false);
    });
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
