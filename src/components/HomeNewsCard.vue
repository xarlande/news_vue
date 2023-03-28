<template>
  <div class="mx-auto border relative p-3 w-3/4">
    <div>
      <p class="text-center mb-4">Джерело: {{ itemNew.author }}</p>
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
