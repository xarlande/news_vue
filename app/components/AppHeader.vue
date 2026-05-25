<template>
    <header
        class="border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-black/70 backdrop-blur-xl sticky top-0 z-50"
    >
        <UContainer>
            <div class="h-16 flex items-center justify-between">
                <div class="flex items-center gap-8">
                    <NuxtLink
                        to="/"
                        class="text-xl font-black tracking-tight flex items-center gap-2"
                    >
                        <UIcon
                            name="i-heroicons-newspaper"
                            class="w-8 h-8 text-primary"
                        />
                        <span>Новини</span>
                    </NuxtLink>

                    <nav class="hidden md:flex items-center gap-1">
                        <UButton
                            to="/"
                            variant="ghost"
                            color="gray"
                            class="rounded-full"
                            >Головна</UButton
                        >
                        <UButton
                            to="/explore"
                            variant="ghost"
                            color="gray"
                            class="rounded-full"
                            >Пошук</UButton
                        >
                        <UButton
                            to="/sources"
                            variant="ghost"
                            color="gray"
                            class="rounded-full"
                            >Джерела</UButton
                        >
                    </nav>
                </div>

                <div class="flex items-center gap-2">
                    <UColorModeButton />
                    <UButton
                        to="/explore"
                        icon="i-heroicons-magnifying-glass"
                        variant="ghost"
                        color="gray"
                        class="md:hidden rounded-full"
                    />
                </div>
            </div>
        </UContainer>
    </header>
</template>
