<template>
  <div class="mt-5">
    <NewsCategoryItem
      :data-card="newsTechnology.data.value?.articles"
      :categories-name="`Технології`"
    />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsBusiness.data.value?.articles" :categories-name="`Бізнес`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsPopular.data.value?.articles" :categories-name="`Популярні`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsSport.data.value?.articles" :categories-name="`Спорт`" />
  </div>
</template>
<script setup lang="ts">
import NewsCategoryItem from "@/components/NewsCategory.vue";

const title = "News App - Home";

useSeoMeta({
  title: title,
  ogTitle: title,
});

const runtimeConfig = useRuntimeConfig()

const newsPopular = await useInstanceFetch<{articles: Array<any>}>('/top-headlines', {
  query: {
    apiKey: runtimeConfig.public.apiKey,
    country: 'ua'
  },
  lazy: true
})

const newsTechnology = await useFetch<{articles: Array<any>}>('/api/top-headlines', {
  query: {
    country: 'ua',
    category: 'technology'
  },
  lazy: true
})

const newsBusiness = await useFetch<{articles: Array<any>}>('/api/top-headlines', {
  query: {
    country: 'ua',
    category: 'business'
  },
  lazy: true
})

const newsSport = await useFetch<{articles: Array<any>}>('/api/top-headlines', {
  query: {
    country: 'ua',
    category: 'sport'
  },
  lazy: true
})
</script>
