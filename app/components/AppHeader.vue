<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur sticky top-0 z-50">
    <UContainer>
      <div class="h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="text-xl font-bold flex items-center gap-2">
            <UIcon name="i-heroicons-newspaper" class="w-8 h-8 text-primary" />
            <span>Nuxt News</span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-4">
            <UButton to="/" variant="ghost" color="gray">Headlines</UButton>
            <UButton to="/explore" variant="ghost" color="gray">Explore</UButton>
            <UButton to="/sources" variant="ghost" color="gray">Sources</UButton>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <UColorModeButton />
          <UButton
            to="/explore"
            icon="i-heroicons-magnifying-glass"
            variant="ghost"
            color="gray"
            class="md:hidden"
          />
        </div>
      </div>
    </UContainer>
  </header>
</template>
