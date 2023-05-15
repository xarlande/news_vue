// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-headlessui",
    "@nuxt/image-edge",
  ],
  pinia: {
    autoImports: ["defineStore"],
  },
  tailwindcss: {
    viewer: false,
  },
});
