<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const title = "News App";
const description =
  "Комплексна новинна платформа, яка надає найновіші та найактуальніші новини з усього світу.";

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: {
    url: "https://img.icons8.com/fluency/48/news.png",
    alt: "favicon",
  },
  author: "Velgan Bogdan",
  ogLocale: "uk-ua",
});
useHead({
  htmlAttrs: {
    lang: "uk",
  },
});
</script>

<style lang="css">
.router .router-link-active {
  @apply text-blue-500 hover:text-blue-400;
}

.router a {
  @apply hover:text-blue-400 p-2;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  @apply text-gray-600 bg-gray-100 leading-relaxed;
}
input {
  @apply bg-gray-100;
}
li {
  @apply bg-gray-100;
}
.global_button {
  @apply text-gray-100 bg-blue-500 rounded inline-block p-2 cursor-pointer px-4 py-3 shadow shadow-blue-500  hover:bg-blue-400  active:bg-blue-600;
}
</style>
