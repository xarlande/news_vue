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
    <NewsCategoryItem :data-card="newsPopular.data.value?.articles" :categories-name="`Популярні`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsSport" :categories-name="`Спорт`" />
  </div>
</template>
<script setup lang="ts">
import { useNewsHomePage } from "@/stores/getNewsForIndex";
import NewsCategoryItem from "@/components/NewsCategory.vue";

const title = "News App - Home";

useSeoMeta({
  title: title,
  ogTitle: title,
});

const store = useNewsHomePage();
const runtimeConfig = useRuntimeConfig()
const { newsTechnology, newsBusiness, newsSport } = toRefs(store);

const newsPopular = await useFetch<{articles: Array<any>}>('/top-headlines', {
  baseURL: runtimeConfig.public.baseUrl,
  query: {
    apiKey: runtimeConfig.public.apiKey,
    country: 'ua'
  }
})

onMounted(() => {
  store.getAllNews();
});
</script>
