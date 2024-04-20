<template>
  <div class="w-full mt-10">
    <form class="space-y-6 bg-gray-100 rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-xl text-gray-800 font-semibold mb-4">
        Change Your Password
      </h2>

      <FormInputField
        v-model="data_form.current_password"
        v-bind="{
          label: 'Current Password',
          placeholder: 'Enter your existing password.',
          type: 'password',
        }"
        :validation="$v.current_password"
        sub-title="Enter your existing password."
      />
      <FormInputField
        v-model="data_form.new_password"
        v-bind="{
          label: 'New Password',
          placeholder: 'Make sure your new password is strong and unique.',
          type: 'password',
        }"
        :validation="$v.new_password"
      />

      <div class="flex items-center justify-end">
        <button
          @click="func_changePassword"
          type="button"
          class="kp-btn kp-btn-primary"
        >
          Change Password
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Change Password - Kupown",
  meta: [
    {
      name: "description",
      content: "Helping people to analyze their finances.",
    },
  ],
});
definePageMeta({
  layout: "settings",
});

import { useVuelidate } from "@vuelidate/core";
import { maxLength } from "@vuelidate/validators";
import {
  requiredMessage,
  passwordMinLength,
  containsUppercase,
  containsLowercase,
  containsNumber,
  containsSpecialChar,
} from "~/utils/validators";

const authStore = useAuthStore();

// Reactive state for form and password visibility
const data_form = reactive({
  current_password: "",
  new_password: "",
});

const rules = computed(() => ({
  current_password: {
    required: requiredMessage(),
  },
  new_password: {
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

// Change password method
const func_changePassword = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    authStore.changePassword(data_form);
    $v.value.$reset();
    data_form.current_password = "";
    data_form.new_password = "";
  }
};
</script>

<style>
/* You might need to import Font Awesome or use your own icons for the eye/eye-slash */
</style>
