<template>
  <div class="w-72 border-r border-gray-200">
    <div class="px-6 py-4">
      <h2
        class="text-2xl font-semibold text-gray-700 border-b border-gray-200 pb-3"
      >
        Settings
      </h2>
      <nav class="mt-8">
        <ul>
          <li class="mt-1">
            <NuxtLink
              href="/settings/profile"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold rounded-md transition duration-200 flex items-center whitespace-nowrap"
              active-class="bg-indigo-200 text-indigo-800 border-0 hover:bg-indigo-200"
            >
              <span class="ph ph-user text-xl mr-4"></span>
              Profile
            </NuxtLink>
          </li>
          <li class="mt-1">
            <NuxtLink
              href="/settings/budget-rule"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold rounded-md transition duration-200 flex items-center whitespace-nowrap"
              active-class="bg-indigo-200 text-indigo-800 border-0 hover:bg-indigo-200"
            >
              <span class="ph ph-chart-pie-slice text-xl mr-4"></span>
              Budget Rule Setup
            </NuxtLink>
          </li>
          <li class="mt-1">
            <NuxtLink
              href="/settings/change-password"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold rounded-md transition duration-200 flex items-center whitespace-nowrap"
              active-class="bg-indigo-200 text-indigo-800 border-0 hover:bg-indigo-200"
            >
              <span class="ph ph-lock text-xl mr-4"></span>
              Change Password
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
