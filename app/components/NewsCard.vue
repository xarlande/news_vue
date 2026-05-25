<script setup lang="ts">
interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const props = defineProps<{
  article: Article;
}>();

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<template>
  <UCard class="overflow-hidden flex flex-col h-full group">
    <template #header>
      <div class="relative aspect-video overflow-hidden -m-4">
        <img
          v-if="article.urlToImage"
          :src="article.urlToImage"
          :alt="article.title"
          class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div
          v-else
          class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
        </div>
        <div class="absolute top-2 right-2">
          <UBadge color="primary" variant="solid" size="sm">
            {{ article.source.name }}
          </UBadge>
        </div>
      </div>
    </template>

    <div class="flex-1">
      <h3 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {{ article.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
        {{ article.description }}
      </p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <time class="text-xs text-gray-500">{{ formatDate(article.publishedAt) }}</time>
        <UButton
          :to="article.url"
          target="_blank"
          variant="link"
          color="primary"
          icon="i-heroicons-arrow-top-right-on-square"
          trailing
          size="sm"
        >
          Читати далі
        </UButton>
      </div>
    </template>
  </UCard>
</template>
