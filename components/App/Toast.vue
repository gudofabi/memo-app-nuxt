<template>
  <transition name="fade" @enter="enter" @leave="leave">
    <div
      v-if="data_show"
      class="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex items-center p-4 mb-4 w-full max-w-sm text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-50"
      :class="{
        'bg-green-100  dark:bg-green-200': data_alertType === 'success',
        'bg-red-100  dark:bg-red-200': data_alertType === 'error',
      }"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-xl text-green-500 dark:text-green-600"
        v-if="data_alertType === 'success'"
      >
        <span class="ph ph-check-circle"></span>
      </div>
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-xl text-red-500 dark:text-red-600"
        v-if="data_alertType === 'error'"
      >
        <span class="ph ph-warning-circle"></span>
      </div>
      <span
        class="ml-3 text-sm font-bold text-nowrap"
        :class="{
          ' text-green-700 ': data_alertType === 'success',
          'text-red-700': data_alertType === 'error',
        }"
        >{{ data_message }}</span
      >
    </div>
  </transition>
</template>

<script setup lang="ts">
const { $emitter } = useNuxtApp();

const data_message = ref("");
const data_alertType = ref("success"); // 'success' or 'error'
const data_show = ref(false);

onMounted(() => {
  $emitter.on("alert-notification", (e: any) => {
    data_message.value = e.message;
    data_alertType.value = e.alertType;
    data_show.value = true;
    setTimeout(() => {
      data_show.value = false;
    }, e.timeout || 3000);
  });
});

function enter(el: any, done: any) {
  el.style.opacity = 0;
  el.offsetHeight; // trigger reflow
  el.style.transition = "opacity 0.3s";
  el.style.opacity = 1;
  done();
}

function leave(el: any, done: any) {
  el.style.opacity = 1;
  el.offsetHeight; // trigger reflow
  el.style.transition = "opacity 0.3s";
  el.style.opacity = 0;
  done();
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
