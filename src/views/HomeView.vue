<template>
  {{ loadingNews }}
</template>

<script>
import { toRefs } from "vue";
import { useNewsStore } from "@/stores/getNews";

export default {
  name: "HomeView",
  setup() {
    const store = useNewsStore();
    const { loadingNews } = toRefs(store);

    return {
      loadingNews,
    };
  },
};
</script>

<style scoped></style>
