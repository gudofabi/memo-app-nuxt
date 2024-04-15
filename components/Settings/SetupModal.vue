<template>
  <AppModal :show="true">
    <template #header>
      <h2 class="text-2xl font-bold mb-4">Setup Required</h2>
    </template>
    <template #body>
      <p class="mb-8">
        Please set up your budget rules to continue using the app.
      </p>
      <div class="text-right">
        <NuxtLink href="/settings/budget-rule" class="kp-btn">
          Go to Settings
        </NuxtLink>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts"></script>
