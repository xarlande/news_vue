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
const heroArticle = computed(() => articles.value[0]);
const remainingArticles = computed(() => articles.value.slice(1));

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
    });
};
</script>

<template>
    <div class="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a]">
        <!-- Hero Section -->
        <section
            v-if="heroArticle && !pending && !route.query.sources"
            class="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-black"
        >
            <img
                v-if="heroArticle.urlToImage"
                :src="heroArticle.urlToImage"
                class="absolute inset-0 w-full h-full object-cover opacity-60"
                alt="Hero"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
            />

            <UContainer class="relative h-full flex flex-col justify-end pb-16">
                <div
                    class="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000"
                >
                    <UBadge
                        color="primary"
                        variant="solid"
                        size="lg"
                        class="mb-6 rounded-full px-4"
                    >
                        Головна новина дня
                    </UBadge>
                    <h1
                        class="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight"
                    >
                        {{ heroArticle.title }}
                    </h1>
                    <p
                        class="text-xl text-gray-200 mb-8 line-clamp-2 font-medium leading-relaxed"
                    >
                        {{ heroArticle.description }}
                    </p>
                    <div class="flex items-center gap-6">
                        <UButton
                            :to="heroArticle.url"
                            target="_blank"
                            size="xl"
                            color="primary"
                            class="rounded-full px-8 font-bold"
                        >
                            Читати повністю
                        </UButton>
                        <span
                            class="text-gray-400 font-bold uppercase tracking-widest text-xs"
                        >
                            {{ heroArticle.source.name }} •
                            {{ formatDate(heroArticle.publishedAt) }}
                        </span>
                    </div>
                </div>
            </UContainer>
        </section>

        <UContainer class="py-12">
            <!-- Filters -->
            <div class="flex flex-col gap-10">
                <div
                    class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8"
                >
                    <div>
                        <h2 class="text-4xl font-black tracking-tight mb-2">
                            {{
                                route.query.sources
                                    ? "Новини джерела"
                                    : "Свіжі події"
                            }}
                        </h2>
                        <p class="text-gray-500 font-medium">
                            Добірка найважливішого за сьогодні
                        </p>
                    </div>

                    <div
                        v-if="!route.query.sources"
                        class="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit"
                    >
                        <button
                            v-for="cat in categories"
                            :key="cat.value"
                            class="px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300"
                            :class="
                                selectedCategory === cat.value
                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-primary scale-105'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            "
                            @click="selectedCategory = cat.value"
                        >
                            {{ cat.label }}
                        </button>
                    </div>
                </div>

                <!-- Loading State -->
                <div
                    v-if="pending"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div v-for="i in 6" :key="i" class="flex flex-col gap-5">
                        <USkeleton class="aspect-[16/10] w-full rounded-2xl" />
                        <USkeleton class="h-8 w-3/4 rounded-lg" />
                        <USkeleton class="h-20 w-full rounded-lg" />
                    </div>
                </div>

                <!-- Error State -->
                <div
                    v-else-if="error"
                    class="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-3xl"
                >
                    <UIcon
                        name="i-heroicons-exclamation-circle"
                        class="w-16 h-16 text-red-500 mx-auto mb-6"
                    />
                    <h2 class="text-2xl font-black mb-3 text-red-600">
                        Не вдалося завантажити новини
                    </h2>
                    <p class="text-gray-500 mb-8 max-w-md mx-auto">
                        {{ error.message }}
                    </p>
                    <UButton
                        size="lg"
                        color="red"
                        variant="soft"
                        @click="refresh"
                        class="rounded-full px-8"
                    >
                        Спробувати знову
                    </UButton>
                </div>

                <!-- Empty State -->
                <div
                    v-else-if="articles.length === 0"
                    class="text-center py-20"
                >
                    <div
                        class="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <UIcon
                            name="i-heroicons-inbox"
                            class="w-10 h-10 text-gray-400"
                        />
                    </div>
                    <p class="text-xl font-bold text-gray-400">
                        На жаль, новин не знайдено
                    </p>
                </div>

                <!-- Articles Grid -->
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    <NewsCard
                        v-for="article in route.query.sources
                            ? articles
                            : remainingArticles"
                        :key="article.url"
                        :article="article"
                    />
                </div>
            </div>
        </UContainer>
    </div>
</template>
