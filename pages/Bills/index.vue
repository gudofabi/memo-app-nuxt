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
                  @click="func_showModal(bill._id as string)"
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
      <BillsForm :filters="data_filters" @save="func_changePage" />
    </div>
  </div>
  <AppModal :show="data_showModal" width="w-[500px]">
    <template #header>
      <h2 class="text-2xl font-bold mb-4">Delete Bill</h2>
    </template>
    <template #body>
      <p class="mb-6">
        Are you sure you want to delete the bill? Once deleted, it cannot be
        retrieved.
      </p>
    </template>
    <template #footer>
      <div class="text-right">
        <button class="kp-btn mr-4" @click="data_showModal = !data_showModal">
          Cancel
        </button>
        <button class="kp-btn kp-btn-primary" @click="func_deleteBill">
          Confirm
        </button>
      </div>
    </template>
  </AppModal>
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
  limit: 7,
  total_pages: computed(() => billsStore.totalPages ?? 0),
});
const data_showModal = ref(false);
const data_selectedBill = ref("");

onMounted(() => {
  // the second parameter is the limit
  billsStore.fetchList(data_filters.current_page, data_filters.limit);
});

/*** Functions */
const func_showModal = (billId: string) => {
  data_selectedBill.value = billId;
  data_showModal.value = true;
};

function func_changePage(newPage: number) {
  if (newPage < 1 || newPage > data_filters?.total_pages) return;
  data_filters.current_page = newPage;
  // the second parameter is the limit
  billsStore.fetchList(newPage, data_filters.limit);
}

const func_formatCurrency = (value: number | null | undefined) => {
  return formatCurrency(value);
};

const func_formatDate = (date: any) => {
  if (!date) return;
  return formatDate(date);
};

const func_deleteBill = () => {
  billsStore
    .destroy(data_selectedBill.value)
    .then((res) => {
      $emitter.emit("alert-notification", {
        message: res?.data.message,
        alertType: "success",
        timeout: 3000,
        show: true,
      });
      billsStore.fetchList(data_filters.current_page, data_filters.limit);
      data_showModal.value = false;
      data_selectedBill.value = "";
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
