<template>
  <div
    class="xl:fixed w-full flex items-center justify-center xl:h-screen py-24 xl:pt-0"
  >
    <div
      class="rounded-xl bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-4xl w-[90%] sm:w-96 text-center xl:-mt-[300px]"
    >
      <h2 class="text-2xl sm:text-3xl mb-4">Register</h2>
      <p class="text-base mb-8 text-gray-500 leading-5">
        Hello friend, I’m Kupown - expense tracker application. Register and
        explore now!
      </p>
      <FormInputField
        v-model="data_form.username"
        v-bind="{
          placeholder: 'Username',
          type: 'text',
        }"
        :validation="$v.username"
      />
      <FormInputField
        v-model="data_form.email"
        v-bind="{
          placeholder: 'Email',
          type: 'email',
        }"
        :validation="$v.email"
      />
      <FormInputField
        v-model="data_form.password"
        v-bind="{
          placeholder: 'Password',
          type: 'password',
        }"
        :validation="$v.password"
      />
      <div class="text-right">
        <button class="kp-btn text-primary" @click="func_register">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Register - Kupown",
  meta: [
    {
      name: "description",
      content: "Helping people to analyze their finances.",
    },
  ],
});

import { useVuelidate } from "@vuelidate/core";
import { email, maxLength } from "@vuelidate/validators";
import {
  requiredMessage,
  passwordMinLength,
  containsUppercase,
  containsLowercase,
  containsNumber,
  containsSpecialChar,
} from "~/utils/validators";

/*** Auth Store */
const authStore = useAuthStore();

const data_form = reactive({
  username: "",
  email: "",
  password: "",
});

const rules = computed(() => ({
  username: {
    required: requiredMessage(),
  },
  email: {
    required: requiredMessage(),
    email,
  },
  password: {
    required: requiredMessage(),
    minLength: passwordMinLength(8),
    containsUppercase,
    containsLowercase,
    containsNumber,
    containsSpecialChar,
    maxLength: maxLength(12),
  },
}));

const $v = useVuelidate(rules, data_form);

/*** Functions */
const func_register = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    authStore.register(data_form);
  }
};
</script>
