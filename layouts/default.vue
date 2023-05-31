<template>
  <header
    class="border-b border-gray-300 bg-gray-100 text-center p-3 fixed z-20 top-0 inset-x-0 shadow"
  >
    <div class="max-w-5xl mx-auto flex justify-between">
      <nuxt-link
        to="/"
        class="uppercase py-2 text-blue-500 text-xl flex gap-2 items-center"
      >
        <img class="h-8" src="@/assets/icon-logo.png" alt="logo" />
        <h1>News App</h1></nuxt-link
      >
      <nav class="max-sm:hidden router flex">
        <nuxt-link class="border-r" to="/">Головна</nuxt-link>
        <nuxt-link class="border-r" to="/about">Про нас</nuxt-link>
        <nuxt-link to="/search">Пошук новин</nuxt-link>
      </nav>
      <div
        class="flex sm:hidden items-center mr-2.5"
        @click="burgerOpen = !burgerOpen"
      >
        <BurgerBtnClose v-if="burgerOpen" />
        <BurgerBtn v-else />
      </div>
    </div>
  </header>
  <nav
    v-if="burgerOpen"
    @click="burgerOpen = false"
    class="router bg-gray-100 flex flex-col justify-center items-center fixed inset-x-0 z-10 inset-y-0 text-xl gap-5"
  >
    <nuxt-link to="/">Головна</nuxt-link>
    <nuxt-link to="/about">Про нас</nuxt-link>
    <nuxt-link to="/search">Пошук новин</nuxt-link>
  </nav>
  <div>
    <main class="max-w-5xl mx-auto p-2 my-20">
      <slot />
    </main>
  </div>
  <footer
    class="bg-gray-100 border-t border-gray-300 w-full p-2 text-right fixed z-20 bottom-0 inset-x-0"
  >
    <div class="max-w-5xl mx-auto">
      Автор:
      <a
        target="_blank"
        class="text-blue-500 hover:text-blue-400"
        href="https://github.com/xarlande"
        >Богдан Вельган</a
      >
    </div>
  </footer>
</template>
<script setup>
import BurgerBtnClose from "~/components/Icon/BurgerBtnClose.vue";
import BurgerBtn from "~/components/Icon/BurgerBtn.vue";

const burgerOpen = ref(false);

watch(burgerOpen, () => {
  if (burgerOpen.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});
</script>
