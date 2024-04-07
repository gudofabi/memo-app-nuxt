<template>
  <div
    class="container mx-auto relative min-h-[500px] flex justify-between items-center"
  >
    <div class="w-[600px]">
      <h1 class="text-primary text-[58px] leading-tight mb-4">
        Helping people to <br />
        analyze their
        <span class="text-secondary font-semibold">finances</span>.
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum alias
        animi assumenda, veniam error?
      </p>
    </div>
    <div class="absolute right-0 -bottom-[45px] w-[338px]">
      <img
        src="@/assets/img/header-img.svg"
        class="w-auto h-auto"
        alt="Money floating"
      />
    </div>
  </div>
  <div
    id="how-it-works"
    class="container mx-auto flex relative h-[850px] pb-20 mb-28"
  >
    <div
      class="w-[214px] lg:w-[250px] h-[264px] lg:h-[300px] absolute -top-[25px] -left-[50px]"
    >
      <img
        src="@/assets/img/floating-man.svg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div id="description" class="w-1/2 flex items-center justify-center">
      <div
        class="w-[256px] h-auto bg-primary text-white rounded-3xl pl-5 pr-8 py-12 shadow-3xl"
      >
        <h2 class="text-3xl tracking-wide leading-none mb-4">
          How it<br />
          <span class="text-secondary font-semibold">works</span>?
        </h2>
        <p class="text-sm leading-6">
          Manage your finances efficiently and take control of your financial
          planning with our easy three-step process. See how your money is
          working for you with our intuitive system.
        </p>
      </div>
    </div>
    <div id="process" class="w-1/2 flex justify-end items-end">
      <ul>
        <li
          v-for="(item, index) in data_process"
          :key="index"
          class="flex mb-7 cursor-pointer"
          @mouseover="playGif(index)"
          @mouseleave="pauseGif(index)"
        >
          <div class="w-[40px] h-[40px] relative mr-4">
            <img
              v-if="item.isHovering"
              src="@/assets/img/checked.gif"
              alt=""
              class="w-full h-full object-contain"
            />
            <img
              v-else
              src="@/assets/img/checked.png"
              alt=""
              class="w-full h-full object-contain"
            />
          </div>
          <div class="w-[80%]">
            <h4 class="font-bold text-lg mb-2">{{ item.title }}</h4>
            <p class="text-base text-black tracking-normal">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="absolute bottom-0">
      <img
        src="@/assets/img/window.svg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
  </div>
  <div id="creator" class="bg-primary text-white text-center py-28">
    <div class="container mx-auto relative">
      <img
        src="@/assets/img/chart.svg"
        alt=""
        class="absolute right-0 -top-[320px]"
      />
      <h3 class="text-4xl pb-16 font-quicksand tracking-wider">
        Meet the handsome creator...
      </h3>
      <div id="about-me" class="relative mx-auto w-[900px]">
        <div
          class="mx-auto w-[70px] h-[70px] border-2 border-white rounded-full shadow-lg relative z-10 mb-4"
        >
          <img
            src="@/assets/img/iroh.png"
            alt=""
            class="w-full h-full absolute"
          />
        </div>
        <div class="text-black z-10 relative text-sm w-[640px] mx-auto">
          <p class="font-sf-compact font-medium text-base mb-2">Gudo Fabi</p>
          <p class="text-base">
            "I built this app to tackle my own budgeting and expense tracking
            challenges, making it simpler for others with the same issues. It
            goes beyond mere tracking, automatically adjusting your budget based
            on personalized categories and percentages. This tool is designed to
            make complex financial planning easy and accessible for everyone,
            ensuring smarter money management tailored to your needs."
          </p>
        </div>
        <img
          src="@/assets/img/paper.png"
          alt=""
          class="absolute w-full h-auto top-0 z-0 object-fill"
        />
      </div>
      <div class="footer">
        <ul id="social">
          <li>
            <a href="http://"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data_process = reactive([
  {
    title: "Create and Assign",
    text: "Start by creating custom categories (e.g., Savings, Essentials, Entertainment) and allocate a percentage of your income to each.",
    isHovering: false,
  },
  {
    title: "Ensure Balance",
    text: "Verify that the total allocations across all categories add up to 100% of your income for a balanced budget.",
    isHovering: false,
  },
  {
    title: "Adjust as Needed",
    text: "Our system automatically shows your income distribution, allowing you to easily modify categories or percentages to align with your changing financial goals.",
    isHovering: false,
  },
]);

const data_social = ref([
  {
    icon: "",
    link: "",
  },
  {
    icon: "",
    link: "",
  },
  {
    icon: "",
    link: "",
  },
  {
    icon: "",
    link: "",
  },
]);

const playGif = (index: number) => {
  data_process[index].isHovering = true;
};
const pauseGif = (index: number) => {
  data_process[index].isHovering = false;
};
</script>
