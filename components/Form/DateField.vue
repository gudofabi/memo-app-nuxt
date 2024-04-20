<template>
  <div class="relative mb-7">
    <label
      v-if="$attrs.label"
      class="block text-sm font-medium text-gray-700 mb-1"
      >{{ $attrs?.label }}</label
    >
    <VueDatePicker
      v-model="data_internalValue"
      :text-input="data_dateFormat"
      :enable-time-picker="false"
      :disabled-dates="(disableDates as any)"
      position="left"
      v-bind="$attrs"
      :class="{ 'border-red': comp_validationErrors }"
    />
    <span
      v-show="comp_validationErrors"
      class="absolute -bottom-6 text-sm text-red-500 transition-all ease-in-out px-2"
    >
      {{ comp_validationErrors }}
    </span>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";

const props = defineProps<{
  modelValue?: string | number | null | Date;
  validation?: Object | Array<Object> | any;
  disableDates?: Function | Object | Array<Object> | any;
}>();

const data_internalValue = ref(props.modelValue);
const data_dateFormat = {
  format: "yyyy-MM-dd",
};

watch(
  () => props.modelValue,
  (value) => {
    data_internalValue.value = value;
  }
);

const comp_validationErrors = computed(() => {
  return props.validation && props.validation.$error
    ? props.validation?.$errors[0].$message
    : "";
});
</script>

<style lang="scss">
.border-red {
  .dp__input_wrap {
    .dp__input {
      @apply border-red-500;
    }
  }
}
</style>
