<template>
    <div
        class="hover:underline mx-auto border rounded relative p-3 flex flex-col justify-center"
    >
        <img
            v-if="itemNew.urlToImage"
            class="mx-auto h-48 object-cover rounded w-full"
            :src="itemNew.urlToImage"
            alt="image"
            loading="lazy"
            @error="
                (e) => (e.target.src = 'https://placehold.co/600x400?text=News')
            "
        />
        <div
            v-else
            class="h-48 bg-gray-200 flex items-center justify-center rounded w-full"
        >
            <span class="text-gray-400 italic">Фото відсутнє</span>
        </div>
        <div class="my-2 text-center flex-grow">
            <p class="font-semibold">{{ itemNew.title }}</p>
        </div>
        <div class="mt-auto text-xs text-gray-500 flex justify-between">
            <span>{{ formattedDate }}</span>
            <span>{{ formattedTime }}</span>
        </div>
        <a class="inset-0 absolute" :href="itemNew.url" target="_blank"> </a>
    </div>
</template>

<script setup>
const props = defineProps({
    itemNew: {
        type: Object,
        default: () => ({}),
    },
});

const formattedDate = computed(() => {
    if (!props.itemNew.publishedAt) return "";
    return new Intl.DateTimeFormat("uk-UA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(props.itemNew.publishedAt));
});

const formattedTime = computed(() => {
    if (!props.itemNew.publishedAt) return "";
    return new Intl.DateTimeFormat("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(props.itemNew.publishedAt));
});
</script>

<style scoped></style>
