<template>
  <div class="pt-4 pb-8 flex justify-end px-8 items-center">
    <button
      :disabled="data_filters.current_page <= 1"
      @click="func_changePage(data_filters.current_page - 1)"
      class="kp-btn text-xl !px-3 !py-1"
      :class="[
        data_filters.current_page <= 1 ? 'kp-btn-disabled' : 'kp-btn-primary',
      ]"
    >
      <i class="ph-bold ph-caret-left"></i>
    </button>
    <span class="mx-5 py-2"
      >{{ data_filters.current_page }} / {{ data_filters.total_pages }}</span
    >
    <button
      :disabled="data_filters.current_page >= data_filters.total_pages"
      @click="func_changePage(data_filters.current_page + 1)"
      class="kp-btn text-xl !px-3 !py-1"
      :class="[
        data_filters.current_page >= data_filters.total_pages
          ? 'kp-btn-disabled'
          : 'kp-btn-primary',
      ]"
    >
      <i class="ph-bold ph-caret-right"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  filters: {
    current_page: Number | null | any;
    total_pages: Number | null | any;
  };
}>();

const emits = defineEmits(["change-page"]);

const data_filters = reactive({
  ...props.filters,
});

const func_changePage = (value: any) => {
  emits("change-page", value);
};
</script>
