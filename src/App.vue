<template>
  <div class="max-w-3xl mx-auto p-2">
    <nav>
      <SearchNews />
    </nav>
    <main>
      <cardNews />
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import cardNews from "@/components/cardNews.vue";
import SearchNews from "@/components/searchNews.vue";

export default defineComponent({
  components: { SearchNews, cardNews },
});
</script>

<style scoped></style>
