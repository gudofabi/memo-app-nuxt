// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap",
        },
      ],
      script: [{ src: "https://unpkg.com/@phosphor-icons/web@2.1.1" }],
    },
  },
  modules: ["@pinia/nuxt"],
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/scss/main.scss", "@vuepic/vue-datepicker/dist/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devServer: {
    port: 8000,
  },
  runtimeConfig: {
    public: {
      appTitle: process.env.VITE_APP_TITLE, // Use without VITE_ prefix
      middlewareURL: process.env.VITE_MIDDLEWARE_URL,
    },
  },
});
