<template>
  <div class="border-b text-center py-3 uppercase">
    <div class="max-w-3xl mx-auto">News App</div>
  </div>
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
  mounted() {
    this.getNews();
  },
});
</script>

<style scoped></style>
