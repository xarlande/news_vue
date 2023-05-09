<template>
  <p class="text-blue-500 text-center text-xl">
    Новини категорії: {{ categoriesName }}
  </p>
  <div class="text-center text-sm my-5" v-if="!dataCard.length">Пусто</div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 my-5"
    v-else
  >
    <HomeNewsCard
      class="shadow"
      v-for="(item, idx) in dataCard"
      :key="idx"
      :item-new="item"
    />
  </div>
</template>

<script setup>
import HomeNewsCard from "@/components/NewsCategory/NewsCategoryCard.vue";

defineProps({
  categoriesName: {
    type: String,
    default: "",
  },
  dataCard: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped></style>
