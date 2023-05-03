<template>
  <div class="mt-5">
    <NewsCategoryItem
      :data-card="newsTechnology"
      :categories-name="`Технології`"
    />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsBusiness" :categories-name="`Бізнес`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsPopular" :categories-name="`Популярні`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsSport" :categories-name="`Спорт`" />
  </div>
</template>
<script setup>
import { onMounted, toRefs } from "vue";
import { useNewsHomePage } from "@/stores/getNewsForHome";
import NewsCategoryItem from "@/components/NewsCategory.vue";

const store = useNewsHomePage();
const { newsTechnology, newsBusiness, newsPopular, newsSport } = toRefs(store);

onMounted(() => {
  store.getAllNews();
});
</script>
<style scoped></style>
