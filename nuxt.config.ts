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
      script: [
        { src: 'https://unpkg.com/@phosphor-icons/web' }
      ]
    },
  },
  modules: ["@pinia/nuxt"],
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
