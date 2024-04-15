<template>
  <div
    v-if="categories.length === 0"
    class="border-2 border-dashed border-gray-200 rounded-lg h-32 flex justify-center items-center"
  >
    <p class="text-lg text-gray-700">No categories available...</p>
  </div>
  <ul v-else class="mt-4">
    <li
      v-for="(category, index) in categories"
      :key="index"
      class="flex justify-between items-center bg-white hover:bg-gray-100 shadow-md rounded-lg py-2 px-4 mb-2"
    >
      <span class="font-semibold tracking-wider"
        >{{ category.name
        }}<span
          class="bg-green-200 text-green-800 rounded-2xl py-1 px-2 ml-2 font-normal text-sm"
          >{{ category.percentage }}%</span
        ></span
      >

      <button
        @click="func_deleteCategory(category._id as string)"
        class="text-red-500 hover:text-red-700"
      >
        <i class="ph ph-x-circle text-2xl"></i>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  categories: {
    type: [Object, Array],
    required: true,
  },
});

const emits = defineEmits<{
  (event: "delete", categoryId: string): void;
}>();

const func_deleteCategory = (categoryId: string) => {
  emits("delete", categoryId);
};
</script>
