<template>
  <p class="text-blue-500 text-center text-xl">
    Новини категорії: {{ categoriesName }}
  </p>
  <div v-if="dataCard">
    <div class="text-center text-sm my-5" v-if="!dataCard.length">Пусто</div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 my-5"
      v-else
    >
      <HomeNewsCard
        v-for="(item, idx) in dataCard"
        :key="idx"
        :item-new="item"
      />
    </div>
  </div>
  <p class="text-center text-sm my-5" v-else>Немає доступу до сервера</p>
</template>

<script>
import HomeNewsCard from "@/components/newsCategoryItem/homeNewsCard.vue";

export default {
  name: "newsCategoryItem",
  components: { HomeNewsCard },
  props: { categoriesName: { type: String }, dataCard: { type: Array } },
};
</script>

<style scoped></style>
