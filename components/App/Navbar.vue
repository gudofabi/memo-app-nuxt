<template>
  <div class="container flex justify-between items-center w-full mx-auto py-3">
    <div>
      <NuxtLink
        href="/"
        class="text-secondary uppercase font-bold text-3xl font-sf-pro"
        >Kupown</NuxtLink
      >
    </div>
    <div class="block md:hidden" @click="func_toggleSideNav">
      <span class="ph ph-hamburger text-3xl text-center cursor-pointer"></span>
    </div>
    <ul
      class="fixed md:relative md:flex top-0 bottom-0 right-0 items-center list-none pt-2 w-[180px] md:w-auto bg-white md:bg-transparent z-50 transition-all ease-in-out"
      :class="[
        isSideNavOpen
          ? 'translate-x-0 md:translate-x-full'
          : 'translate-x-full md:translate-x-0',
      ]"
    >
      <li class="w-full md:hidden text-right px-4 mb-7">
        <span
          class="ph-bold ph-x text-2xl text-secondary"
          @click="func_toggleSideNav"
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
        v-if="!isAuthenticated"
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
        v-if="!isAuthenticated"
      >
        <NuxtLink
          href="/register"
          :class="{ 'text-secondary': $route.path === '/register' }"
          class="font-bold"
          >Register</NuxtLink
        >
      </li>
      <li
        class="px-4 text-primary hover:text-secondary text-nowrap mb-2 md:mb-0"
        v-if="isAuthenticated"
      >
        <NuxtLink
          href="/bills"
          :class="{ 'text-secondary': $route.path === '/register' }"
          class="font-bold"
          >Bills</NuxtLink
        >
      </li>
      <li
        class="px-4 text-primary hover:text-secondary text-nowrap mb-2 md:mb-0"
        v-if="isAuthenticated"
      >
        <NuxtLink
          href="/settings/profile"
          :class="{ 'text-secondary': $route.path === '/register' }"
          class="font-bold"
          >Settings</NuxtLink
        >
      </li>
      <li
        class="pl-2 pr-4 mb-2 md:mb-0 flex items-center border-gray-100 bg-gray-200 rounded-full py-1"
        v-if="isAuthenticated"
      >
        <img
          src="https://gravatar.com/avatar/99d3a27c307cdaf6b834e1705f2ada24?s=400&d=robohash&r=x"
          alt="User Avatar"
          class="h-10 w-10 rounded-full border-4 mr-2"
          :class="getIsVerify ? 'border-green-400' : 'border-gray-300'"
        />
        <!-- User Avatar -->
        <span class="font-medium capitalize"
          >{{ getUser.username ?? "--" }}
        </span>
        <!-- User Name -->
      </li>
      <li
        class="px-4 text-primary hover:text-secondary text-nowrap mb-2 md:mb-0"
        v-if="isAuthenticated"
      >
        <a href="#" class="font-bold" @click="func_logout">Logout</a>
      </li>
    </ul>
    <div
      class="z-40 fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 transition-all ease-in-out"
      :class="[isSideNavOpen ? 'visible' : 'hidden']"
      @click="func_toggleSideNav"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { clearAllCookies } from "~/composables/useCookie";
const { isAuthenticated, getUser, getIsVerify } = useAuthStore();

const route = useRoute();
const isSideNavOpen = ref(false);
watch(
  () => route.path,
  (newPath) => {
    // If the side navigation is open, close it
    if (newPath) {
      isSideNavOpen.value = false;
    }
  }
);

/*** Functions */
const func_toggleSideNav = () => {
  isSideNavOpen.value = !isSideNavOpen.value;
};

const func_logout = () => {
  clearAllCookies();
  window.location.href = "/login";
};
</script>
