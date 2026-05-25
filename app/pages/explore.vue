<script setup lang="ts">
const searchQuery = ref('');
const sortBy = ref('publishedAt');
const page = ref(1);

const sortOptions = [
  { label: 'Нові', value: 'publishedAt' },
  { label: 'Популярні', value: 'popularity' },
  { label: 'Релевантні', value: 'relevancy' }
];

const { data, pending, error, refresh } = await useFetch('/api/search', {
  query: {
    q: searchQuery,
    sortBy: sortBy,
    page: page,
    pageSize: 12,
    language: 'en' // English results are usually more plentiful
  },
  immediate: false, // Don't fetch on load if query is empty
  watch: [sortBy, page]
});

// Manual trigger for search to allow debouncing or button click
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    page.value = 1;
    refresh();
  }
};

// Debounced search
let timeout: NodeJS.Timeout;
watch(searchQuery, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    handleSearch();
  }, 600);
});

const articles = computed(() => data.value?.articles || []);
</script>

<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-8">
      <div>
        <h1 class="text-3xl font-bold">Пошук новин</h1>
        <p class="text-gray-500">Шукайте серед мільйонів статей з усього світу</p>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          size="lg"
          placeholder="Наприклад: Technology, Ukraine, AI..."
          class="flex-1"
          @keyup.enter="handleSearch"
        />
        <USelect
          v-model="sortBy"
          :options="sortOptions"
          size="lg"
          class="w-full md:w-48"
        />
      </div>

      <div v-if="!searchQuery && !pending" class="text-center py-20">
        <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 class="text-xl font-medium text-gray-500">Введіть запит, щоб почати пошук</h2>
      </div>

      <div v-else-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="flex flex-col gap-4">
          <USkeleton class="aspect-video w-full" />
          <USkeleton class="h-6 w-3/4" />
          <USkeleton class="h-20 w-full" />
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2">Помилка пошуку</h2>
        <p class="text-gray-500">{{ error.message }}</p>
      </div>

      <div v-else-if="articles.length === 0" class="text-center py-12">
        <p class="text-gray-500">За вашим запитом нічого не знайдено</p>
      </div>

      <div v-else class="flex flex-col gap-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="article in articles"
            :key="article.url"
            :article="article"
          />
        </div>

        <div class="flex justify-center">
          <UPagination
            v-model="page"
            :total="Math.min(data.totalResults || 0, 100)"
            :page-count="12"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>
