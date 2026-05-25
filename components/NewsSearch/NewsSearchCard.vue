<template>
    <article
        v-for="(item, idx) in newsList"
        :key="idx"
        class="border border-gray-300 rounded my-5 p-5 shadow"
    >
        <img
            v-if="item.urlToImage"
            :src="item.urlToImage"
            class="h-72 mx-auto object-cover rounded w-full"
            alt="image"
            loading="lazy"
            @error="
                (e) => (e.target.src = 'https://placehold.co/600x400?text=News')
            "
        />
        <div
            v-else
            class="h-72 bg-gray-200 flex items-center justify-center rounded w-full"
        >
            <span class="text-gray-400 italic">Фото відсутнє</span>
        </div>
        <div class="flex flex-col">
            <h2 class="my-3 text-center text-lg">
                {{ item.title }}
            </h2>

            <p v-if="item.description" class="my-3 text-center">
                {{ item.description }}
            </p>

            <div
                class="mt-4 flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <div class="text-sm text-gray-500 italic">
                    {{ item.data }} • {{ item.time }}
                </div>
                <a class="global_button" :href="item.url" target="_blank"
                    >Читати далі</a
                >
            </div>
        </div>
    </article>
</template>

<script setup>
import { useNewsStore } from "@/stores/getNewsForSearch";
import { toRefs } from "vue";

const store = useNewsStore();
const { newsList } = toRefs(store);
</script>

<style scoped></style>
