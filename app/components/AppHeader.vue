<script setup lang="ts">
const items = [
    {
        label: "Головна",
        to: "/",
    },
    {
        label: "Пошук",
        to: "/explore",
    },
    {
        label: "Джерела",
        to: "/sources",
    },
];
</script>

<template>
    <UHeader>
        <template #left>
            <NuxtLink to="/" class="flex items-center gap-2">
                <UIcon
                    name="i-heroicons-newspaper"
                    class="w-8 h-8 text-(--ui-primary)"
                />
                <span class="text-xl font-black tracking-tight">Новини</span>
            </NuxtLink>
        </template>

        <UNavigationMenu :items="items" variant="link" class="hidden md:flex" />

        <template #right>
            <UColorModeButton />
            <UButton
                to="/explore"
                icon="i-heroicons-magnifying-glass"
                variant="ghost"
                color="neutral"
                class="md:hidden"
            />
        </template>
    </UHeader>
</template>
