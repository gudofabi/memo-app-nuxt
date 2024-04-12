<template>
  <div
    class="xl:fixed w-full flex items-center justify-center xl:h-screen py-24 xl:pt-0"
  >
    <div
      class="rounded-xl bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-4xl w-[90%] sm:w-96 text-center xl:-mt-[300px]"
    >
      <h2 class="text-2xl lg:text-3xl mb-4">Login</h2>
      <p class="text-base mb-8 text-gray-500 leading-5">
        Hello friend, I’m Kupown - expense tracker application. Login and
        explore now!
      </p>
      <input
        type="text"
        class="kp-input mb-6"
        placeholder="Username"
        v-model="data_form.username"
      />
      <input
        type="password"
        class="kp-input mb-6"
        placeholder="Password"
        v-model="data_form.password"
      />
      <div class="text-right">
        <p
          class="mb-3 text-base font-semibold hover:text-secondary text-primary"
        >
          <NuxtLink href="/forgot-password" class="">Forgot Password?</NuxtLink>
        </p>
        <button class="kp-btn text-primary" @click="func_login">Login</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/**** Auth Store */
const authStore = useAuthStore();

const data_form = reactive({
  username: "",
  password: "",
});

/*** Functions */
const func_login = () => {
  console.log(data_form);
  authStore.login(data_form);
};
</script>
