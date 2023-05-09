<template>
  <div class="text-center mt-[20%]">
    <div>Error code: {{ error.statusCode }}</div>
    <div>{{ error.statusMessage }}</div>
    <NuxtLink to="/">Go Home</NuxtLink>
  </div>
</template>
<script setup>
const error = useError();
</script>
