<template>
  <div
    class="xl:fixed w-full flex items-center justify-center xl:h-screen py-24 xl:pt-0"
  >
    <div
      class="rounded-xl bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-4xl w-[90%] sm:w-[500px] text-center xl:-mt-[300px]"
    >
      <template v-if="authStore.loading">
        <p class="text-lg text-gray-700">Verifying...</p>
      </template>
      <template v-else>
        <h2
          class="text-xl mb-3"
          :class="[authStore?.code === 400 ? 'text-red-600' : 'text-primary']"
        >
          {{ authStore.message }}
        </h2>
        <button class="kp-btn kp-btn-primary" @click="func_redirectLogin">
          Go to Login
        </button>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Verify Account - Kupown",
  meta: [
    {
      name: "description",
      content: "Helping people to analyze their finances.",
    },
  ],
});
const authStore = useAuthStore();

const route = useRoute();

onMounted(() => {
  authStore.verify(route.query.token as string);
});

// Methods
const func_redirectLogin = () => {
  window.location.href = "/login";
};
</script>
