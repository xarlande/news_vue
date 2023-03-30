<template>
  <div class="hover:underline mx-auto border relative p-3">
    <img
      v-if="itemNew.urlToImage"
      class="mx-auto"
      :src="itemNew.urlToImage"
      alt="img"
    />
    <div class="my-2 text-center">
      <p class="mb-4" v-if="itemNew.author">Автор: {{ itemNew.author }}</p>
      <p>{{ itemNew.title }}</p>
    </div>
    <a class="inset-0 absolute" :href="itemNew.url" target="_blank"> </a>
  </div>
</template>

<script>
export default {
  name: "HomeNewsCard",
  props: {
    itemNew: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
