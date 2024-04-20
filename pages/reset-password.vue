<template>
  <div
    class="xl:fixed w-full flex items-center justify-center xl:h-screen py-24 xl:pt-0"
  >
    <div
      class="rounded-xl bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-4xl w-[90%] sm:w-96 text-center xl:-mt-[300px]"
    >
      <form @submit.prevent="func_handleSubmit">
        <h2 class="text-3xl mb-2">Reset Your Password</h2>
        <p class="text-base mb-8 text-gray-500 leading-5">
          Please enter your new password below.
        </p>
        <FormInputField
          v-model="data_form.password"
          v-bind="{
            label: 'Password',
            placeholder: 'Enter New Password',
            type: 'password',
          }"
          :validation="$v.password"
        />
        <FormInputField
          v-model="data_form.confirm_password"
          v-bind="{
            label: 'Confirm Password',
            placeholder: 'Confirm New Password',
            type: 'password',
          }"
          :validation="$v.confirm_password"
        />
        <div class="flex items-center justify-end">
          <button class="kp-btn kp-btn-primary" type="submit">
            {{ data_loading ? "Updating..." : "Create New Password" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Reset Password - Kupown",
  meta: [
    {
      name: "description",
      content: "Helping people to analyze their finances.",
    },
  ],
});
const { $emitter } = useNuxtApp();
const authStore = useAuthStore();
import { useVuelidate } from "@vuelidate/core";
import { maxLength, sameAs, helpers } from "@vuelidate/validators";
import {
  requiredMessage,
  passwordMinLength,
  containsUppercase,
  containsLowercase,
  containsNumber,
  containsSpecialChar,
} from "~/utils/validators";

const route = useRoute();
const router = useRouter();

const data_form = reactive({
  password: "",
  confirm_password: "",
});
const data_loading = ref(false);
const data_errorMessage = ref("");
const data_successMessage = ref("");

const rules = computed(() => ({
  password: {
    required: requiredMessage(),
    minLength: passwordMinLength(8),
    containsUppercase,
    containsLowercase,
    containsNumber,
    containsSpecialChar,
    maxLength: maxLength(12),
  },
  confirm_password: {
    required: requiredMessage(),
    sameAsPassword: helpers.withMessage(
      "Must be similar to password.",
      sameAs(data_form.password)
    ),
  },
}));

const $v = useVuelidate(rules, data_form);

// Method to initiate the password reset process
const func_handleSubmit = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    const token = route.query.token as string;
    data_loading.value = true;
    authStore
      .resetPassword(token, data_form.password)
      .then((res) => {
        $emitter.emit("alert-notification", {
          message: res.data.message,
          alertType: "success",
          timeout: 3000,
          show: true,
        });
        data_form.password = "";
        data_form.confirm_password = "";
        window.location.href = "/login";
      })
      .catch((err) => {
        $emitter.emit("alert-notification", {
          message: err.response.data.message,
          alertType: "success",
          timeout: 3000,
          show: true,
        });
      })
      .finally(() => {
        data_loading.value = false;
      });
  }
};
</script>
