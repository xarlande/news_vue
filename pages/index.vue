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
  }
})

const newsTechnology = await useInstanceFetch<{articles: Array<any>}>('/top-headlines', {
  query: {
    apiKey: runtimeConfig.public.apiKey,
    country: 'ua',
    category: 'technology'
  }
})

const newsBusiness = await useInstanceFetch<{articles: Array<any>}>('/top-headlines', {
  query: {
    apiKey: runtimeConfig.public.apiKey,
    country: 'ua',
    category: 'business'
  }
})

const newsSport = await useInstanceFetch<{articles: Array<any>}>('/top-headlines', {
  query: {
    apiKey: runtimeConfig.public.apiKey,
    country: 'ua',
    category: 'sport'
  }
})
</script>
