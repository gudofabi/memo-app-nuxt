<template>
  <div
    class="mt-6 bg-gray-50 p-6 rounded-md border-2 border-dashed border-gray-200"
  >
    <div
      v-if="!data_errors && data_message"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong class="font-bold">Error! </strong>
      <span class="block sm:inline">{{ data_message }}</span>
    </div>
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Create New Category
    </h3>
    <form class="form max-w-full">
      <FormInputField
        v-model="data_form.name"
        v-bind="{
          label: 'Category Name',
          placeholder: 'Ex: Savings',
          type: 'text',
        }"
        :validation="$v.name"
      />
      <FormInputField
        v-model="data_form.percentage"
        v-bind="{
          label: 'Percentage',
          placeholder: 'Ex: 30',
          type: 'number',
          suffix: '%',
        }"
        :validation="$v.percentage"
      />
      <div class="flex items-center justify-end">
        <button
          class="kp-btn kp-btn-primary"
          type="button"
          @click="func_saveCategory"
        >
          Add Category
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { requiredMessage } from "~/utils/validators";
const { $emitter } = useNuxtApp();

/*** Budget Rule Store */
const budgetRuleStore = useBudgetRuleStore();

const emits = defineEmits<{
  (event: "save", value: boolean): void;
}>();

const data_form = reactive({
  name: "",
  percentage: null,
});

const data_errors = ref<Object>({});
const data_message = ref("");

const rules = computed(() => ({
  name: {
    required: requiredMessage(),
  },
  percentage: {
    required: requiredMessage(),
  },
}));

const $v = useVuelidate(rules, data_form);

const func_saveCategory = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    budgetRuleStore
      .create(data_form)
      .then((res) => {
        data_errors.value = {};
        $emitter.emit("alert-notification", {
          message: res?.data.message,
          alertType: "success",
          timeout: 3000,
          show: true,
        });

        emits("save", true);
      })
      .catch((err) => {
        data_errors.value = err.response.data.errors;
        data_message.value = err.response.data.message;
      })
      .finally(() => {
        data_form.name = "";
        data_form.percentage = null;
        $v.value.$reset();
      });
  }
};
</script>
