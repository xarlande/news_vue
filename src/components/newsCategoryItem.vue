<template>
  <p class="text-blue-500 text-center text-xl">
    Новини категорії: {{ categoriesName }}
  </p>
  <div class="news-grid" v-if="Object.keys(dataCard).length">
    <HomeNewsCard v-for="(item, idx) in dataCard" :key="idx" :item-new="item" />
  </div>
  <div class="text-center text-sm my-5" v-else>Пусто</div>
</template>

<script>
import HomeNewsCard from "@/components/newsCategoryItem/homeNewsCard.vue";

export default {
  name: "newsCategoryItem",
  components: { HomeNewsCard },
  props: { categoriesName: { type: String }, dataCard: { type: Array } },
};
</script>

<style scoped>
.news-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 my-5;
}
</style>
