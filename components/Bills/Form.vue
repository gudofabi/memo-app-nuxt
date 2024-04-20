<template>
  <div class="bg-white shadow sm:rounded-b-md p-4">
    <h2 class="text-md font-medium text-gray-900 mb-5">Add New Bill</h2>
    <div class="grid grid-cols-1">
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
      <FormDateField
        v-model="data_form.date"
        :disable-dates="comp_disablePrevDates"
        v-bind="{
          label: 'Salary',
          placeholder: 'When salary received',
        }"
        :validation="$v.date"
      />
      <FormInputField
        v-model="data_form.salary"
        v-bind="{
          label: 'Salary',
          placeholder: 'Ex: 40000',
          type: 'number',
        }"
        :validation="$v.salary"
      />
      <div class="text-right">
        <button @click="func_addBill" class="kp-btn kp-btn-primary">
          Create Bill
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { requiredMessage } from "~/utils/validators";
const { $emitter } = useNuxtApp();
/*** Bills Store */
const billsStore = useBillsStore();

const data_errors = {};
const data_message = {};
const data_isSuccess = false;

const data_form = reactive({
  date: null,
  salary: null,
});

const comp_disablePrevDates = computed(() => {
  return (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
    return date < today;
  };
});

const rules = computed(() => ({
  date: {
    required: requiredMessage(),
  },
  salary: {
    required: requiredMessage(),
  },
}));

const $v = useVuelidate(rules, data_form);

/*** Funtions */
const func_addBill = () => {
  const params = {
    ...data_form,
    date: data_form.date ? formatDatePicker(data_form.date) : "",
  };

  $v.value.$validate();
  if (!$v.value.$error) {
    billsStore
      .create(params)
      .then((res) => {
        data_message.value = res?.data.message;

        $emitter.emit("alert-notification", {
          message: res?.data.message,
          alertType: "success",
          timeout: 3000,
          show: true,
        });
        billsStore.fetchList();
      })
      .catch((err) => {
        $emitter.emit("alert-notification", {
          message: "Something went wrong.",
          alertType: "error",
          timeout: 3000,
          show: true,
        });
      })
      .finally(() => {
        data_form.date = null;
        data_form.salary = null;
      });
  }
};
</script>
