<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-b-md p-4 pt-6">
    <h2 class="text-md font-medium text-gray-900 mb-5">Add New Expense</h2>
    <div class="">
      <div
        v-show="data_message"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Success! </strong>
        <span class="block sm:inline">{{ data_message }}</span>
      </div>

      <FormSelectField
        v-model="data_form.category"
        v-bind="{
          label: 'Category',
          placeholder: 'Select Category',
        }"
        :options="getBudgetRuleCategories"
        :validation="$v.category"
      />
      <FormInputField
        v-model="data_form.description"
        v-bind="{
          label: 'Description',
          placeholder: 'Ex: Meralco Bills',
          type: 'text',
        }"
        :validation="$v.description"
      />
      <FormInputField
        v-model="data_form.amount"
        v-bind="{
          label: 'Amount',
          placeholder: 'Ex: 2000',
          type: 'number',
        }"
        :validation="$v.amount"
      />
      <div class="text-right">
        <button @click="func_addExpense" class="kp-btn">Add Expense</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { requiredMessage } from "~/utils/validators";
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
const data_errors = ref({});

const rules = computed(() => ({
  category: {
    required: requiredMessage(),
  },
  description: {
    required: requiredMessage(),
  },
  amount: {
    required: requiredMessage(),
  },
}));

const $v = useVuelidate(rules, data_form);

onMounted(() => {
  budgetRuleStore.fetchList();
});

// Methods
const func_addExpense = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
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
  }
};
</script>
