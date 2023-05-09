<template>
  <div class="flex flex-col justify-center text-center min-h-screen">
    <div>Error code: {{ error.statusCode }}</div>
    <div>{{ error.statusMessage }}</div>
    <div class="mt-5">
      <NuxtLink to="/" class="global_button">Go Home</NuxtLink>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: () => `Error code: ${error.value.statusCode}`,
});
const error = useError();
</script>
