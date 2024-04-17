<template>
  <div
    class="xl:fixed w-full flex items-center justify-center xl:h-screen py-24 xl:pt-0"
  >
    <div
      class="rounded-xl bg-white px-6 sm:px-8 py-8 sm:py-10 shadow-4xl w-[90%] sm:w-96 text-center xl:-mt-[300px]"
    >
      <h2 class="text-3xl mb-4">Forgot Password</h2>
      <p class="text-base mb-8 text-gray-500 leading-5">
        Enter the email address associated with your account, and we'll send you
        a link to reset your password.
      </p>
      <FormInputField
        v-model="data_form.email"
        v-bind="{
          placeholder: 'Email',
        }"
        :validation="$v.email"
      />
      <div class="text-right">
        <button
          :disabled="comp_disabledBtn"
          :class="{
            'kp-btn-disabled': comp_disabledBtn,
            'kp-disabled-btn':
              !data_loading && data_cooldown <= 0 && data_form.email.trim(),
          }"
          class="kp-btn text-primary"
          type="button"
          @click="func_handleSubmit"
        >
          {{
            data_loading
              ? "Sending..."
              : data_cooldown > 0
              ? `Please wait ${data_cooldown}s`
              : "Send Reset Link"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Forgot Password - Kupown",
  meta: [
    {
      name: "description",
      content: "Helping people to analyze their finances.",
    },
  ],
});
const { $emitter } = useNuxtApp();
import { useVuelidate } from "@vuelidate/core";
import { email } from "@vuelidate/validators";
import { requiredMessage } from "~/utils/validators";

const authStore = useAuthStore();

const data_form = reactive({
  email: "",
});
const data_loading = ref(false);
const data_cooldown = ref(0);

const rules = computed(() => ({
  email: {
    email,
    required: requiredMessage(),
  },
}));

const $v = useVuelidate(rules, data_form);

const comp_disabledBtn = computed(() => {
  return (
    data_loading.value || data_cooldown.value > 0 || !data_form.email.trim()
  );
});

/*** Functions */
const func_handleSubmit = () => {
  console.log("hi!");
  if (data_loading.value || data_cooldown.value > 0) return;

  $v.value.$validate();
  if (!$v.value.$error) {
    data_loading.value = true;
    authStore
      .forgotPassword(data_form)
      .then((res) => {
        $emitter.emit("alert-notification", {
          message: res.data.message,
          alertType: "success",
          timeout: 6000,
          show: true,
        });
        startCooldown(); // Start the cooldown after a successful submission
      })
      .catch((err) => {
        $emitter.emit("alert-notification", {
          message: err.response.data.message,
          alertType: "error",
          timeout: 3000,
          show: true,
        });
      })
      .finally(() => {
        data_loading.value = false;
        email.value = "";
      });
  }
};

// Function to start and manage the cooldown timer
const startCooldown = () => {
  data_cooldown.value = 30; // Set cooldown duration (e.g., 30 seconds)
  const intervalId = setInterval(() => {
    data_cooldown.value--;
    if (data_cooldown.value <= 0) {
      clearInterval(intervalId); // Clear interval when countdown is done
    }
  }, 1000); // Update countdown every second
};
</script>
