<template>
  <div class="fixed w-full flex items-center justify-center h-screen">
    <div
      class="rounded-xl bg-white px-8 py-10 shadow-4xl w-96 text-center -mt-[300px]"
    >
      <h2 class="text-3xl mb-4">Forgot Password</h2>
      <p class="text-base mb-8 text-gray-500 leading-5">
        Enter the email address associated with your account, and we'll send you
        a link to reset your password.
      </p>
      <input type="text" class="kp-input mb-6" placeholder="Email" />
      <div class="text-right">
        <button class="kp-btn text-primary">Send Reset Link</button>
      </div>
    </div>
  </div>
</template>
