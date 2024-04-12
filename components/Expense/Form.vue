<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-b-md p-4 pt-6">
    <h2 class="text-md font-medium text-gray-900 mb-5">Add New Expense</h2>
    <div class="grid grid-cols-1 gap-6">
      <div
        v-show="data_message"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Success! </strong>
        <span class="block sm:inline">{{ data_message }}</span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <select
          v-model="data_form.category"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Category"
        >
          <option value="" disabled>Select a category</option>
          <option
            v-for="category in getBudgetRuleCategories"
            :key="category._id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
        <p v-if="data_errors" class="text-red-500 text-xs italic mt-2">
          {{ data_errors?.category }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <input
          v-model="data_form.description"
          type="text"
          placeholder="Description"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <p v-if="data_errors" class="text-red-500 text-xs italic mt-2">
          {{ data_errors?.description }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Amount</label>
        <input
          v-model="data_form.amount"
          type="number"
          placeholder="Amount"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <p v-if="data_errors" class="text-red-500 text-xs italic mt-2">
          {{ data_errors?.amount }}
        </p>
      </div>
      <div class="text-right">
        <button
          @click="func_addExpense"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Add Expense
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ExpenseType } from "~/types/expensesTypes";
const { $emitter } = useNuxtApp();

/** Expense Store */
const expensesStore = useExpensesStore();
/** BudgetRule Store */
const budgetRuleStore = useBudgetRuleStore();
const { getBudgetRuleCategories } = storeToRefs(budgetRuleStore);

const props = defineProps({
  billId: {
    type: String,
    required: true,
  },
});

const emits = defineEmits<{
  (event: "save-expense", value: boolean): void;
}>();

const data_form = reactive<ExpenseType>({
  amount: null,
  description: "",
  paid: false,
  category: "",
});

const data_message = ref("");
const data_errors = ref<ExpenseError>({});

onMounted(() => {
  budgetRuleStore.fetchList();
});

// Methods
const func_addExpense = () => {
  expensesStore
    .create(props.billId, data_form)
    .then((res) => {
      data_message.value = res?.data.message;
      data_form.amount = null;
      data_form.description = "";
      data_errors.value = {};
      $emitter.emit("alert-notification", {
        message: res.data.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      emits("save-expense", true);
    })
    .catch((err) => {
      data_errors.value = err.response.data.errors;
      $emitter.emit("alert-notification", {
        message: "Something went wrong.",
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    });
};
</script>
