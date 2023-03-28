<template>
  <header
    class="border-b border-gray-300 bg-gray-100 text-center p-3 fixed z-10 top-0 inset-x-0"
  >
    <div class="max-w-5xl mx-auto flex justify-between">
      <router-link
        to="/"
        class="uppercase py-2 text-blue-500 text-xl flex gap-2 items-center"
      >
        <img class="h-8" src="./assets/icon-logo.png" alt="logo" />
        News App</router-link
      >
      <nav class="router flex">
        <router-link class="border-r" to="/">Home</router-link>
        <router-link to="/search">Search News</router-link>
      </nav>
    </div>
  </header>
  <div class="">
    <main class="max-w-5xl mx-auto p-2 my-16">
      <RouterView />
    </main>
  </div>
  <footer
    class="bg-gray-100 border-t border-gray-300 w-full p-5 text-right fixed z-10 bottom-0 inset-x-0"
  >
    <div class="max-w-5xl mx-auto">
      Created by
      <a
        target="_blank"
        class="text-blue-500 hover:text-blue-400"
        href="https://github.com/xarlande"
        >Bogdan Velgan</a
      >
    </div>
  </footer>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import { useNewsStore } from "@/stores/getNews";

export default defineComponent({
  setup() {
    const storeNews = useNewsStore();
    const { completeLoad } = toRefs(storeNews);

    return {
      completeLoad,
    };
  },
});
</script>

<style scoped>
.router .router-link-active {
  @apply text-blue-500 hover:text-blue-400;
}
.router a {
  @apply hover:text-blue-400 p-2;
}
</style>
