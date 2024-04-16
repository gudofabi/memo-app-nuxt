<template>
  <div v-if="authStore.isAuthenticated">
    <div
      v-if="!authStore.getIsVerify"
      class="bg-gray-200 text-center w-full py-4"
    >
      <p class="py-0 text-primary">
        Please verify your account before use the app. Go to your email and
        click the
        <span class="underline text-secondary font-semibold">verify</span> link.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import auth from "~/plugins/auth";

const authStore = useAuthStore();
</script>
