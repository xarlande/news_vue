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
import { useNewsHomePage } from "@/stores/getNewsForIndex";
import NewsCategoryItem from "@/components/NewsCategory.vue";

const title = "News App - Home";

useSeoMeta({
  title: title,
  ogTitle: title,
});

const store = useNewsHomePage();
const { newsTechnology, newsBusiness, newsPopular, newsSport } = toRefs(store);

onMounted(() => {
  store.getAllNews();
});
</script>
