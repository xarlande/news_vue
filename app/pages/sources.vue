<script setup lang="ts">
const categories = [
    { label: "Усі категорії", value: null },
    { label: "Бізнес", value: "business" },
    { label: "Розваги", value: "entertainment" },
    { label: "Загальне", value: "general" },
    { label: "Здоров'я", value: "health" },
    { label: "Наука", value: "science" },
    { label: "Спорт", value: "sports" },
    { label: "Технології", value: "technology" },
];

const selectedCategory = ref(null);

const { data, pending, error } = await useFetch("/api/sources", {
    query: {
        category: selectedCategory,
        language: "en",
    },
    watch: [selectedCategory],
});

const sources = computed(() => data.value?.sources || []);
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
                            Джерела новин
                        </h1>
                        <p class="text-gray-500 font-medium">
                            Авторитетні видання з усього світу
                        </p>
                    </div>

                    <USelect
                        v-model="selectedCategory"
                        :items="categories"
                        size="xl"
                        variant="none"
                        class="w-full md:w-72 bg-white dark:bg-gray-900 rounded-2xl px-4 shadow-sm border border-gray-100 dark:border-gray-800"
                    />
                </div>

                <div
                    v-if="pending"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div v-for="i in 9" :key="i">
                        <UCard class="rounded-2xl border-none shadow-sm h-64">
                            <USkeleton class="h-8 w-3/4 mb-4 rounded-lg" />
                            <USkeleton class="h-24 w-full rounded-lg" />
                        </UCard>
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
                        Помилка завантаження джерел
                    </h2>
                    <p class="text-gray-500">{{ error.message }}</p>
                </div>

                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div
                        v-for="source in sources"
                        :key="source.id"
                        class="group bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col h-full"
                    >
                        <div class="flex items-center justify-between mb-6">
                            <h3
                                class="font-black text-xl group-hover:text-primary transition-colors"
                            >
                                {{ source.name }}
                            </h3>
                            <UBadge
                                color="gray"
                                variant="soft"
                                class="rounded-full px-3 uppercase text-[10px] font-bold tracking-wider"
                            >
                                {{ source.category }}
                            </UBadge>
                        </div>

                        <p
                            class="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed flex-1 mb-8"
                        >
                            {{ source.description }}
                        </p>

                        <div
                            class="pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between"
                        >
                            <UButton
                                :to="source.url"
                                target="_blank"
                                variant="ghost"
                                color="gray"
                                size="sm"
                                icon="i-heroicons-globe-alt"
                                class="font-bold rounded-full"
                            >
                                Сайт
                            </UButton>
                            <UButton
                                :to="`/?sources=${source.id}`"
                                variant="solid"
                                color="primary"
                                size="sm"
                                icon="i-heroicons-newspaper"
                                class="font-bold rounded-full px-6"
                            >
                                Новини
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>
