<template>
  <div>Error code: {{ error.statusCode }}</div>
  <div>{{ error.statusMessage }}</div>
  <NuxtLink to="/">Go Home</NuxtLink>
</template>
<script setup>
const error = useError();
</script>
