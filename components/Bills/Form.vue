<template>
  <div class="bg-white shadow sm:rounded-b-md p-4">
    <h2 class="text-md font-medium text-gray-900 mb-5">Add New Bill</h2>
    <div class="grid grid-cols-1 gap-4">
      <div
        v-if="data_isSuccess"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Success! </strong>
        <span class="block sm:inline">{{ data_message }}</span>
      </div>
      <div
        v-if="!data_errors && data_message"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error! </strong>
        <span class="block sm:inline">{{ data_message }}</span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Date</label>
        <VueDatePicker
          v-model="data_form.date"
          :text-inpu="data_dateFormat"
          :enable-time-picker="false"
          :disabled-dates="comp_disablePrevDates"
          position="left"
          class="kp-input"
        />
        <p v-if="data_errors" class="text-red-500 text-xs italic mt-2">
          {{ data_errors?.date?.message }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Salary</label>
        <input
          v-model="data_form.salary"
          type="number"
          placeholder="Salary"
          class="kp-input"
        />
        <p v-if="data_errors" class="text-red-500 text-xs italic mt-2">
          {{ data_errors?.salary?.message }}
        </p>
      </div>
      <div class="text-right">
        <button @click="func_addBill" class="kp-btn">Create Bill</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";

const data_errors = {};
const data_message = {};
const data_isSuccess = false;

const data_form = reactive({
  date: null,
  salary: null,
});
const data_dateFormat = {
  format: "yyyy-MM-dd",
};

const comp_disablePrevDates = computed(() => {
  return (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
    return date < today;
  };
});

const func_addBill = () => {};
</script>