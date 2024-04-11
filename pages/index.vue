<template>
  <div
    class="container mx-auto relative min-h-full md:min-h-[500px] flex flex-col md:flex-row justify-between items-center"
  >
    <div
      class="h-full text-center md:text-left w-full md:w-[450px] lg:w-[600px] pt-32 pb-10 md:py-0"
    >
      <h1
        class="text-primary font-bold text-5xl md:text-4xl lg:text-[56px] md:leading-tight mb-4 bg-gradient-to-r from-primary via-secondary to-primary-2 text-transparent bg-clip-text"
      >
        Helping people to <br class="hidden lg:block" />
        analyze their
        <span class="font-bold">finances</span>.
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum alias
        animi assumenda, veniam error?
      </p>
    </div>
    <div
      class="md:absolute right-0 md:-bottom-[45px] w-full md:w-[268px] lg:w-[338px] h-auto cursor-pointer z-30"
      @click="playCash()"
    >
      <img
        :class="{ 'slide-in-frm-right': data_isImageVisible }"
        src="/img/header-img.svg"
        class="w-full h-auto opacity-0 hidden md:block"
        alt="Money floating"
      />
      <img
        src="/img/yoga.png"
        class="w-[200px] mx-auto h-auto block md:hidden"
        alt="Yoga"
      />
      <audio ref="refMoneySound">
        <source src="/sounds/money.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>

  <!-- How it works -->
  <div
    id="how-it-works"
    class="container mx-auto flex flex-col md:flex-row relative md:h-[850px] pb-20 mb-28"
  >
    <div
      :style="{ top: data_floatingManPosition + 'px' }"
      class="w-[214px] lg:w-[250px] h-[264px] lg:h-[300px] absolute -top-[25px] -left-[50px] hidden md:block"
    >
      <img
        src="/img/floating-man.svg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div
      id="description"
      class="w-full md:w-1/2 flex items-center justify-center -mt-10"
    >
      <div
        class="w-[256px] h-auto bg-primary text-white rounded-3xl pl-5 pr-8 py-12 shadow-3xl"
      >
        <h2 class="text-3xl tracking-wide leading-none mb-4">
          How it<br />
          <span
            class="bg-gradient-to-b from-orange-300 to-secondary text-transparent bg-clip-text font-semibold"
            >works</span
          >?
        </h2>
        <p class="text-sm leading-6">
          Manage your finances efficiently and take control of your financial
          planning with our easy three-step process. See how your money is
          working for you with our intuitive system.
        </p>
      </div>
    </div>

    <div
      id="process"
      class="w-full md:w-1/2 flex justify-end items-end pt-16 pb-40 md:py-0"
    >
      <ul>
        <li
          v-for="(item, index) in data_process"
          :key="index"
          class="flex mb-7 cursor-pointer scale-100 hover:scale-105 hover:rounded-2xl hover:px-2 hover:md:px-4 hover:pt-4 hover:md:pt-4 hover:pb-6 hover:md:pb-6 hover:shadow-md hover:bg-white transition-all ease-in-out duration-300"
          @mouseover="playGif(index)"
          @mouseleave="pauseGif(index)"
        >
          <div class="w-[40px] h-[40px] relative mr-4">
            <img
              v-if="item.isHovering"
              src="/img/checked.gif"
              alt=""
              class="w-full h-full object-contain bg-transparent"
            />
            <img
              v-else
              src="/img/checked.png"
              alt=""
              class="w-full h-full object-contain"
            />
          </div>
          <div class="w-[80%]">
            <h4 class="font-bold text-base md:text-lg mb-2 text-primary">
              {{ item.title }}
            </h4>
            <p class="text-sm md:text-base text-black tracking-normal">
              {{ item.text }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="absolute bottom-0">
      <img src="/img/window.svg" alt="" class="w-full h-full object-cover" />
    </div>
  </div>
  <!-- Creator -->
  <div
    id="creator"
    class="bg-primary text-white text-center pt-20 md:pt-28 pb-3 overflow-hidden md:overflow-visible"
  >
    <div class="container mx-auto relative">
      <img
        src="/img/chart.svg"
        alt=""
        class="absolute right-0 -top-[320px] hidden md:block"
      />
      <h3
        class="text-2xl md:text-4xl pb-12 md:pb-16 font-quicksand tracking-wider"
      >
        Meet the handsome creator...
      </h3>
      <div
        id="about-me"
        class="relative mx-auto w-full lg:w-[900px] h-auto mb-32 lg:mb-40"
      >
        <div
          @click="playPew()"
          class="mx-auto w-[70px] scale-100 hover:scale-110 h-[70px] border-2 border-white rounded-full shadow-3xl relative z-10 mb-2 lg:mb-4 ease-in-out cursor-pointer"
        >
          <img src="/img/iroh.png" alt="" class="w-full h-full absolute" />
          <audio ref="refAudioSound">
            <source src="/sounds/wow-naman.mp3" type="audio/mpeg" />
          </audio>
        </div>
        <div
          class="text-black z-10 relative text-sm w-full sm:w-[500px] lg:w-[640px] mx-auto"
        >
          <p class="font-sf-compact font-medium text-primary text-base mb-2">
            Gudo Fabi
          </p>
          <p class="text-sm lg:text-base">
            "I built this app to tackle my own budgeting and expense tracking
            challenges, making it simpler for others with the same issues. It
            goes beyond mere tracking, automatically adjusting your budget based
            on personalized categories and percentages. This tool is designed to
            make complex financial planning easy and accessible for everyone,
            ensuring smarter money management tailored to your needs."
          </p>
        </div>
        <img
          src="/img/paper.png"
          alt=""
          class="absolute max-w-[1300px] sm:max-w-[750px] md:max-w-full lg:w-full h-[350px] md:h-[317px] xl:h-[300px] -left-52 sm:-left-16 md:left-0 top-0 sm:-top-7 md:-top-2 lg:top-0 z-0 object-contain"
        />
      </div>
      <div class="footer w-full">
        <ul id="social" class="border-b border-white flex justify-center py-5">
          <li
            v-for="(social, index) in data_social"
            :key="index"
            class="text-white hover:bg-gradient-to-b hover:from-orange-300 hover:to-secondary hover:text-transparent hover:bg-clip-text transition-all w-[40px] h-[40px] mr-9 last:mr-0 scale-100 hover:scale-110 ease-in-out"
          >
            <a :href="social.link" class="text-4xl" target="_blank">
              <span :class="[social.icon]"></span>
            </a>
          </li>
        </ul>
        <p class="py-5 text-base">kupown.com &copy; 2024</p>
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
    icon: "ph ph-globe",
    link: "https://www.gudofabi.com/",
  },
  {
    icon: "ph ph-linkedin-logo",
    link: "https://www.linkedin.com/in/gudofabi/",
  },
  {
    icon: "ph ph-behance-logo",
    link: "https://www.behance.net/gudofabi",
  },
  {
    icon: "ph ph-pinterest-logo",
    link: "https://www.pinterest.ph/fabi_ape/",
  },
]);
const data_floatingManPosition = ref(-25); // Initial position of the floating man
const data_isImageVisible = ref(false);
const refAudioSound = ref(null);
const refMoneySound = ref(null);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  data_isImageVisible.value = true;
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const playCash = () => {
  if (refMoneySound.value) {
    const promise = refMoneySound.value
      .play()
      .catch((error: any) => console.error("Error playing the sound:", error));
  } else {
    console.log("Something wrong!");
  }
};

const playPew = () => {
  if (refAudioSound.value) {
    const promise = refAudioSound.value
      .play()
      .catch((error: any) => console.error("Error playing the sound:", error));
  } else {
    console.log("Something wrong!");
  }
};

const playGif = (index: number) => {
  data_process[index].isHovering = true;
};
const pauseGif = (index: number) => {
  data_process[index].isHovering = false;
};

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  data_floatingManPosition.value = -25 - scrollPosition * 0.1; // Adjust the 0.1 to change the speed
};
</script>

<style lang="scss">
.flip-front {
  transform-style: preserve-3d;
}

.flip-back {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
