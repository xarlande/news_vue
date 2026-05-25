<script setup lang="ts">
const categories = [
  { label: 'Усі категорії', value: '' },
  { label: 'Бізнес', value: 'business' },
  { label: 'Розваги', value: 'entertainment' },
  { label: 'Загальне', value: 'general' },
  { label: 'Здоров\'я', value: 'health' },
  { label: 'Наука', value: 'science' },
  { label: 'Спорт', value: 'sports' },
  { label: 'Технології', value: 'technology' }
];

const selectedCategory = ref('');

const { data, pending, error } = await useFetch('/api/sources', {
  query: {
    category: selectedCategory,
    language: 'en'
  },
  watch: [selectedCategory]
});

const sources = computed(() => data.value?.sources || []);
</script>

<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold">Джерела новин</h1>
          <p class="text-gray-500">Авторитетні видання з усього світу</p>
        </div>

        <USelect
          v-model="selectedCategory"
          :options="categories"
          size="lg"
          class="w-full md:w-64"
        />
      </div>

      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 9" :key="i">
          <UCard>
            <USkeleton class="h-6 w-3/4 mb-4" />
            <USkeleton class="h-16 w-full" />
            <template #footer>
              <USkeleton class="h-8 w-24" />
            </template>
          </UCard>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2">Помилка завантаження джерел</h2>
        <p class="text-gray-500">{{ error.message }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="source in sources" :key="source.id" class="flex flex-col h-full">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-lg">{{ source.name }}</h3>
              <UBadge color="gray" variant="soft">{{ source.category }}</UBadge>
            </div>
          </template>

          <p class="text-sm text-gray-600 dark:text-gray-400 flex-1">
            {{ source.description }}
          </p>

          <template #footer>
            <div class="flex gap-2">
              <UButton
                :to="source.url"
                target="_blank"
                variant="outline"
                color="gray"
                size="sm"
                icon="i-heroicons-globe-alt"
              >
                Сайт
              </UButton>
              <UButton
                :to="`/?sources=${source.id}`"
                variant="solid"
                color="primary"
                size="sm"
                icon="i-heroicons-newspaper"
              >
                Новини
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
