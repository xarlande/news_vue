import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    newsApiKey: "6bd4a18884a9402d81e67a053cbb9cac",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
