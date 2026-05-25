<script setup lang="ts">
const categories = [
    { label: "Головне", value: "general" },
    { label: "Бізнес", value: "business" },
    { label: "Розваги", value: "entertainment" },
    { label: "Здоров'я", value: "health" },
    { label: "Наука", value: "science" },
    { label: "Спорт", value: "sports" },
    { label: "Технології", value: "technology" },
];

const route = useRoute();
const selectedCategory = ref("general");

const { data, pending, error, refresh } = await useFetch("/api/headlines", {
    query: {
        category: computed(() =>
            route.query.sources ? undefined : selectedCategory.value,
        ),
        sources: computed(() => route.query.sources),
        country: computed(() => (route.query.sources ? undefined : "us")),
    },
    watch: [selectedCategory, () => route.query.sources],
});

const articles = computed(() => data.value?.articles || []);
</script>

<template>
    <UContainer class="py-8">
        <div class="flex flex-col gap-8">
            <div
                class="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 class="text-3xl font-bold">Головні новини</h1>
                    <p class="text-gray-500">Останні події з усього світу</p>
                </div>

                <div class="flex overflow-x-auto pb-2 md:pb-0 gap-2">
                    <UButton
                        v-for="cat in categories"
                        :key="cat.value"
                        :variant="
                            selectedCategory === cat.value ? 'solid' : 'soft'
                        "
                        color="primary"
                        size="sm"
                        @click="selectedCategory = cat.value"
                    >
                        {{ cat.label }}
                    </UButton>
                </div>
            </div>

            <div
                v-if="pending"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <div v-for="i in 6" :key="i" class="flex flex-col gap-4">
                    <USkeleton class="aspect-video w-full" />
                    <USkeleton class="h-6 w-3/4" />
                    <USkeleton class="h-20 w-full" />
                </div>
            </div>

            <div v-else-if="error" class="text-center py-12">
                <UIcon
                    name="i-heroicons-exclamation-triangle"
                    class="w-12 h-12 text-red-500 mx-auto mb-4"
                />
                <h2 class="text-xl font-bold mb-2">Помилка завантаження</h2>
                <p class="text-gray-500 mb-6">{{ error.message }}</p>
                <UButton @click="refresh">Спробувати ще раз</UButton>
            </div>

            <div v-else-if="articles.length === 0" class="text-center py-12">
                <p class="text-gray-500">Новин не знайдено</p>
            </div>

            <div
                v-else
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <NewsCard
                    v-for="article in articles"
                    :key="article.url"
                    :article="article"
                />
            </div>
        </div>
    </UContainer>
</template>
