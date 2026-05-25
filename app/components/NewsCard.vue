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
    return new Date(dateStr).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
</script>

<template>
    <div
        class="flex flex-col h-full group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
    >
        <div class="relative aspect-[16/10] overflow-hidden">
            <img
                v-if="article.urlToImage"
                :src="article.urlToImage"
                :alt="article.title"
                class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            <div
                v-else
                class="w-full h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
            >
                <UIcon
                    name="i-heroicons-photo"
                    class="w-12 h-12 text-gray-300"
                />
            </div>
            <div class="absolute top-3 left-3">
                <UBadge
                    color="white"
                    variant="solid"
                    size="sm"
                    class="font-medium shadow-sm backdrop-blur-md bg-white/90 dark:bg-black/90 dark:text-white"
                >
                    {{ article.source.name }}
                </UBadge>
            </div>
        </div>

        <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center gap-2 mb-3">
                <time
                    class="text-[10px] uppercase tracking-wider font-bold text-gray-400"
                >
                    {{ formatDate(article.publishedAt) }}
                </time>
            </div>

            <h3
                class="font-extrabold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300"
            >
                {{ article.title }}
            </h3>

            <p
                class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-6"
            >
                {{ article.description }}
            </p>

            <div
                class="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-gray-800/50"
            >
                <UButton
                    :to="article.url"
                    target="_blank"
                    variant="ghost"
                    color="primary"
                    icon="i-heroicons-arrow-right"
                    trailing
                    size="sm"
                    class="font-bold -ml-2"
                >
                    Читати далі
                </UButton>
            </div>
        </div>
    </div>
</template>
