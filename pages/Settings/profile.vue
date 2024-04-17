<template>
  <div class="max-w-full mt-10">
    <form class="space-y-6 rounded px-8 pt-6 pb-8 mb-4 bg-gray-50">
      <h2 class="text-xl text-gray-800 font-semibold mb-4">
        Update Your Profile Information
      </h2>

      <FormInputField
        v-model="data_form.username"
        v-bind="{
          placeholder: 'Username',
          type: 'text',
          label: 'Username',
        }"
        :validation="$v.username"
      />

      <FormInputField
        v-model="data_form.email"
        v-bind="{
          placeholder: 'Email',
          type: 'email',
          label: 'Email',
        }"
        :validation="$v.email"
      />

      <div class="flex items-center justify-end">
        <button class="kp-btn" type="button" @click="func_update">
          Update Profile
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Profile - Kupown",
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
import { email } from "@vuelidate/validators";
import { requiredMessage } from "~/utils/validators";

const authStore = useAuthStore();

const data_form = reactive({
  ...authStore.getUser,
});

const rules = computed(() => ({
  username: {
    required: requiredMessage(),
  },
  email: {
    required: requiredMessage(),
    email,
  },
}));

const $v = useVuelidate(rules, data_form as any);

const func_update = () => {
  $v.value.$validate();
  if (!$v.value.$error) {
    authStore.updateProfile(data_form as any);
  }
};
</script>
