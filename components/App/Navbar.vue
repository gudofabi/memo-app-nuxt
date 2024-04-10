<template>
  <div
    class="container flex justify-between align-item-center w-full mx-auto py-3 bg-opacity-70 bg-white"
  >
    <div>
      <NuxtLink
        href="/"
        class="text-secondary uppercase font-bold text-3xl font-sf-pro"
        >Kupown</NuxtLink
      >
    </div>
    <div class="block md:hidden" @click="toggleSideNav">
      <span class="ph ph-hamburger text-3xl text-center cursor-pointer"></span>
    </div>
    <nav
      class="fixed md:relative md:flex top-0 bottom-0 right-0 align-center list-none pt-2 w-[50%] md:w-auto bg-white md:bg-transparent z-50 transition-all ease-in-out"
      :class="[
        isSideNavOpen
          ? 'translate-x-0 md:translate-x-full'
          : 'translate-x-full md:translate-x-0',
      ]"
    >
      <li class="w-full md:hidden text-right px-4 mb-7">
        <span
          class="ph-bold ph-x text-2xl text-secondary"
          @click="toggleSideNav"
        ></span>
      </li>
      <li
        class="px-4 text-primary hover:text-secondary text-nowrap mb-2 md:mb-0"
        :class="{ 'text-secondary': $route.path === '#how-it-works' }"
      >
        <NuxtLink href="/#how-it-works" class="font-bold"
          >How it works</NuxtLink
        >
      </li>
      <li
        class="px-4 text-primary hover:text-secondary text-nowrap mb-2 md:mb-0"
      >
        <NuxtLink
          href="/login"
          :class="{ 'text-secondary': $route.path === '/login' }"
          class="font-bold"
          >Login</NuxtLink
        >
      </li>
      <li
        class="px-4 text-primary hover:text-secondary text-nowrap mb-2 md:mb-0"
      >
        <NuxtLink
          href="/register"
          :class="{ 'text-secondary': $route.path === '/register' }"
          class="font-bold"
          >Register</NuxtLink
        >
      </li>
    </nav>
    <div
      class="z-40 fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 transition-all ease-in-out"
      :class="[isSideNavOpen ? 'visible' : 'hidden']"
      @click="toggleSideNav"
    ></div>
  </div>
</template>
<script setup lang="ts">
const isSideNavOpen = ref(false);

const toggleSideNav = () => {
  isSideNavOpen.value = !isSideNavOpen.value;
};
</script>
