<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-t-md border-b">
    <template v-if="billData?.expenses?.length === 0">
      <div
        class="border-2 border-dashed border-gray-200 rounded-lg h-40 flex justify-center items-center m-4"
      >
        <p class="text-lg text-gray-700">No expenses...</p>
        <!-- Date list/grid goes here -->
      </div>
    </template>
    <ul
      v-else
      class="border-2 border-dashed border-gray-200 rounded-lg m-4 divide-y divide-gray-200"
    >
      <li
        v-for="(expense, index) in billData?.expenses"
        :key="index"
        class="px-4 py-4 flex items-center sm:px-6 hover:bg-gray-100"
      >
        <div class="flex flex-1 justify-between items-center">
          <div>
            <span
              class="text-md font-medium text-indigo-600 truncate capitalize"
              >{{ expense?.description }}</span
            >
            <span class="ml-2 flex-shrink-0 font-normal text-gray-500">{{
              func_formatCurrency(expense?.amount)
            }}</span>
          </div>
          <div v-if="billData.status === 'Active'" class="flex items-center">
            <!-- Custom Styled Checkbox -->
            <div class="form-checkbox mr-4">
              <input
                type="checkbox"
                :id="`checkbox-${expense._id}`"
                class="hidden"
                v-model="expense.paid"
                @change="func_updateExpense(expense, $event)"
              />
              <label
                :for="`checkbox-${expense._id}`"
                class="flex items-center cursor-pointer"
              >
                <span
                  class="w-4 h-4 inline-block mr-2 rounded border border-gray-300 bg-white"
                ></span>
                Paid
              </label>
            </div>
            <!-- /Custom Styled Checkbox -->
            <button
              v-if="expense.paid == false"
              @click="
                func_removeExpense(
                  $route.params?.id as string,
                  expense._id as string
                )
              "
              class="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div v-else>
            <span
              v-if="expense.paid"
              class="rounded-full bg-green-300 text-green-700 px-3 py-1 text-xs font-semibold tracking-wider"
              >Paid</span
            >
            <span
              v-else
              class="rounded-full bg-red-300 text-red-700 px-3 py-1 text-xs font-semibold tracking-wider"
              >Not Paid</span
            >
          </div>
        </div>
      </li>
    </ul>
    <div class="border-t py-5 px-5 flex justify-between text-md">
      <strong>TOTAL PAID</strong>
      <span>
        {{ func_formatCurrency(comp_totalExpenses) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from "~/utils/utils.ts";
const expensesStore = useExpensesStore();

const $route = useRoute();

const props = defineProps({
  billData: {
    type: [Array, Object],
    required: true,
  },
});

const emits = defineEmits<{
  (event: "change", value: boolean): void;
}>();

const comp_totalExpenses = computed(() => {
  return props.billData?.expenses?.reduce((total: any, expense: any) => {
    if (expense.paid) {
      return total + (expense.amount || 0);
    }
    return total;
  }, 0);
});

// methods
const func_updateExpense = (expense: ExpenseType | null, event: Event) => {
  if (expense === null) return;
  const target = event.target as HTMLInputElement;
  const params = { ...expense };
  params.paid = target.checked;

  expensesStore
    .update($route.params?.id as string, params?._id as string, params)
    .then((res) => {
      setTimeout(() => {
        emits("change", true);
      }, 1000);
    });
};

const func_removeExpense = (billId: string, expenseId: string) => {
  expensesStore.destroy(billId, expenseId).then(() => {
    setTimeout(() => {
      emits("change", true);
    }, 1000);
  });
};

const func_formatCurrency = (value: number | null | undefined) => {
  return formatCurrency(value);
};
</script>

<style scoped>
/* Custom Checkbox Styles */
.form-checkbox label span {
  transition: background-color 0.2s;
}

.form-checkbox input:checked + label span {
  background-color: #4c51bf; /* Tailwind indigo-600 */
  border-color: transparent;
}

.form-checkbox input:checked + label span:after {
  content: "";
  position: absolute;
  left: 1px;
  top: 1px;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 2px;
}
</style>
