<template>
  <div
    class="hover:underline mx-auto border rounded relative p-3 flex flex-col justify-center"
  >
    <nuxt-img
      v-if="itemNew.urlToImage"
      class="mx-auto"
      sizes="sm:100vw md:50vw lg:400px"
      format="webp"
      quality="80"
      :src="itemNew.urlToImage"
      alt="image"
    />
    <div class="my-2 text-center">
      <p>{{ itemNew.title }}</p>
    </div>
    <a class="inset-0 absolute" :href="itemNew.url" target="_blank"> </a>
  </div>
</template>

<script setup>
defineProps({
  itemNew: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
