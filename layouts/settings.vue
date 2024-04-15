<template>
  <AppNavbar />
  <div class="flex justify-center">
    <div class="mx-auto pt-6 pb-10 sm:px-6 lg:px-8 w-[1096px]">
      <div class="px-4 border-b border-gray-100 sm:px-0">
        <div class="flex min-h-[1096px] h-full bg-white shadow-md rounded-l-lg">
          <!-- Sidebar -->
          <SettingsSideNav />

          <!-- Main Content -->
          <div class="flex-grow p-6 overflow-hidden">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
