<template>
  <h1>Bills</h1>
  <!-- <div
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
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
// const billsStore = useBillsStore();
// const { getBills, getLoading } = storeToRefs(billsStore);

// onMounted(() => {
//   billsStore.fetchList();
// });

// const func_formatCurrency = (value) => {
//   return value;
// };

// const func_deleteBill = (value) => {
//   return value;
// };

// const func_formatDate = (value) => {
//   return value;
// };
</script>
