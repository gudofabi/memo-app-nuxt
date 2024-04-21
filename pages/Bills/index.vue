<template>
  <div
    v-if="getLoading"
    class="flex justify-center align-middle items-center text-center"
  >
    <h1 class="text-2xl text-indigo-500">Loading...</h1>
  </div>
  <div v-else class="flex justify-center">
    <div class="mx-auto py-6 sm:px-6 lg:px-8 w-[1096px]">
      <div class="px-4 border-b border-gray-100 sm:px-0">
        <div
          v-if="getBills.length === 0"
          class="border-4 border-dashed border-gray-200 rounded-lg h-40 flex justify-center items-center"
        >
          <p class="text-lg text-gray-700">No bills available...</p>
        </div>
        <div v-else class="bg-white shadow overflow-hidden sm:rounded-t-lg">
          <ul
            class="border-2 border-dashed border-gray-200 rounded-lg m-4 divide-y divide-gray-200"
          >
            <li
              v-for="(bill, index) in getBills"
              :key="index"
              class="px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div class="text-md font-medium text-gray-800">
                {{ func_formatDate(bill.date) }}
                <span
                  class="text-xs px-2 py-1 rounded-full ml-4"
                  :class="[
                    bill.status === 'Active'
                      ? 'bg-green-300 text-green-800'
                      : 'bg-indigo-300 text-green-800',
                  ]"
                  >{{ bill.status }}</span
                >
                <p>
                  <span class="text-gray-400"
                    >({{ func_formatCurrency(bill.totalExpenses) }})</span
                  >
                </p>
              </div>
              <div class="flex">
                <router-link :to="`/bills/${bill._id}`">
                  <div
                    class="text-indigo-600 hover:text-white transition duration-150 ease-in-out font-medium mr-2 text-xl bg-white hover:bg-indigo-600 rounded-full hover:shadow-md w-[35px] h-[35px] border text-center pt-[4px]"
                  >
                    <i class="ph ph-eye m-0 p-0"></i></div
                ></router-link>
                <button
                  v-if="bill.status === 'Active'"
                  @click="func_deleteBill(bill._id as string)"
                  class="text-red-600 hover:text-white transition duration-150 ease-in-out font-medium text-xl bg-white hover:bg-red-600 rounded-full hover:shadow-md w-[35px] h-[35px] border text-center pt-1"
                >
                  <i class="ph ph-trash-simple"></i>
                </button>
              </div>
            </li>
          </ul>
          <AppPagination
            :filters="data_filters"
            @change-page="func_changePage"
          />
        </div>
      </div>
      <BillsForm />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Bills - Kupown",
  meta: [
    {
      name: "description",
      content: "You can see here all your created bills.",
    },
  ],
});

import { formatCurrency, formatDate } from "~/utils/utils.ts";
const { $emitter } = useNuxtApp();
/*** Bills Store */
const billsStore = useBillsStore();
const { getBills, getLoading } = storeToRefs(billsStore);

const data_filters = reactive({
  current_page: 1,
  total_pages: computed(() => billsStore.totalPages ?? 0),
});

onMounted(() => {
  // the second parameter is the limit
  billsStore.fetchList(data_filters.current_page, 7);
});

/*** Functions */

function func_changePage(newPage: number) {
  if (newPage < 1 || newPage > data_filters?.total_pages) return;
  data_filters.current_page = newPage;
  // the second parameter is the limit
  billsStore.fetchList(newPage, 7);
}

const func_formatCurrency = (value: number | null | undefined) => {
  return formatCurrency(value);
};

const func_formatDate = (date: any) => {
  if (!date) return;
  return formatDate(date);
};

const func_deleteBill = (id: string) => {
  billsStore
    .destroy(id)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: res?.data.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      billsStore.fetchList();
    })
    .catch((err) => {
      $emmiter.emit("alert-notification", {
        message: err.response?.data.message,
        alertType: "error",
        timeout: 3000,
        show: true,
      });
    });
};
</script>
