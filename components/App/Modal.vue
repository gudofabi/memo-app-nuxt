<template>
  <transition name="fade" appear>
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg" :class="[width]">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Additional script logic if needed
const props = defineProps<{
  show: boolean;
  width?: string;
}>();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
