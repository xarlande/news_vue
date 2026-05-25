<script setup lang="ts">
const searchQuery = ref("");
const sortBy = ref("publishedAt");
const page = ref(1);

const sortOptions = [
    { label: "Нові", value: "publishedAt" },
    { label: "Популярні", value: "popularity" },
    { label: "Релевантні", value: "relevancy" },
];

const { data, pending, error, refresh } = await useFetch("/api/search", {
    query: {
        q: searchQuery,
        sortBy: sortBy,
        page: page,
        pageSize: 12,
        language: "en",
    },
    immediate: false,
    watch: [sortBy, page],
});

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        page.value = 1;
        refresh();
    }
};

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
    <div class="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] py-12">
        <UContainer>
            <div class="flex flex-col gap-10">
                <div
                    class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-gray-800 pb-8"
                >
                    <div>
                        <h1 class="text-4xl font-black tracking-tight mb-2">
                            Пошук новин
                        </h1>
                        <p class="text-gray-500 font-medium">
                            Шукайте серед мільйонів статей з усього світу
                        </p>
                    </div>
                </div>

                <div
                    class="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
                >
                    <UInput
                        v-model="searchQuery"
                        icon="i-heroicons-magnifying-glass"
                        size="xl"
                        variant="none"
                        placeholder="Введіть ключові слова (наприклад: Технології, Україна...)"
                        class="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                        @keyup.enter="handleSearch"
                    />
                    <USelect
                        v-model="sortBy"
                        :items="sortOptions"
                        size="xl"
                        variant="none"
                        class="w-full md:w-56 bg-gray-50 dark:bg-gray-800 rounded-2xl px-4"
                    />
                </div>

                <div v-if="!searchQuery && !pending" class="text-center py-32">
                    <div
                        class="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <UIcon
                            name="i-heroicons-magnifying-glass"
                            class="w-12 h-12 text-gray-300"
                        />
                    </div>
                    <h2 class="text-2xl font-black text-gray-400">
                        Введіть запит, щоб почати пошук
                    </h2>
                </div>

                <div
                    v-else-if="pending"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div v-for="i in 6" :key="i" class="flex flex-col gap-5">
                        <USkeleton class="aspect-[16/10] w-full rounded-2xl" />
                        <USkeleton class="h-8 w-3/4 rounded-lg" />
                        <USkeleton class="h-20 w-full rounded-lg" />
                    </div>
                </div>

                <div
                    v-else-if="error"
                    class="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-3xl"
                >
                    <UIcon
                        name="i-heroicons-exclamation-circle"
                        class="w-16 h-16 text-red-500 mx-auto mb-6"
                    />
                    <h2 class="text-2xl font-black mb-3 text-red-600">
                        Помилка пошуку
                    </h2>
                    <p class="text-gray-500">{{ error.message }}</p>
                </div>

                <div
                    v-else-if="articles.length === 0"
                    class="text-center py-20"
                >
                    <p class="text-xl font-bold text-gray-400">
                        За вашим запитом нічого не знайдено
                    </p>
                </div>

                <div v-else class="flex flex-col gap-12">
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                    >
                        <NewsCard
                            v-for="article in articles"
                            :key="article.url"
                            :article="article"
                        />
                    </div>

                    <div class="flex justify-center pt-8">
                        <UPagination
                            v-model:page="page"
                            :total="Math.min(data?.totalResults || 0, 100)"
                            :items-per-page="12"
                            size="lg"
                            class="rounded-full shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>
