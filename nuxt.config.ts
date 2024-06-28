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
  runtimeConfig: {
    public: {
      baseUrl: 'https://newsapi.org/v2',
      apiKey: '6bd4a18884a9402d81e67a053cbb9cac',
    }
  }
});
