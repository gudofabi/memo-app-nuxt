<template>
  <div
    class="container flex justify-between align-item-center w-full mx-auto py-6"
  >
    <div>
      <NuxtLink href="/" class="text-secondary uppercase font-bold text-3xl"
        >Kupown</NuxtLink
      >
    </div>
    <nav class="flex align-center list-none pt-2">
      <li
        class="px-4 text-primary hover:text-secondary"
        :class="{ 'text-secondary': $route.path === '/login' }"
      >
        <NuxtLink href="/#how-it-works" class="font-bold"
          >How it works</NuxtLink
        >
      </li>
      <li
        class="px-4 text-primary hover:text-secondary"
        :class="{ 'text-secondary': $route.path === '/login' }"
      >
        <NuxtLink href="/#creator" class="font-bold">Creator</NuxtLink>
      </li>
      <li class="px-4 text-primary hover:text-secondary">
        <NuxtLink
          href="/login"
          :class="{ 'text-secondary': $route.path === '/login' }"
          class="font-bold"
          >Login</NuxtLink
        >
      </li>
      <li class="px-4 text-primary hover:text-secondary">
        <NuxtLink
          href="/register"
          :class="{ 'text-secondary': $route.path === '/register' }"
          class="font-bold"
          >Register</NuxtLink
        >
      </li>
    </nav>
  </div>
</template>
<script setup lang="ts"></script>
