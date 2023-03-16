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
import { defineComponent, toRefs } from "vue";
import cardNews from "@/components/cardNews.vue";
import SearchNews from "@/components/searchNews.vue";
import { useNewsStore } from "@/stores/getNews";

export default defineComponent({
  components: { SearchNews, cardNews },
  setup() {
    const store = useNewsStore();
    const { getNews } = toRefs(store);

    return {
      getNews,
    };
  },
  mounted() {
    this.getNews("ua");
  },
});
</script>

<style scoped></style>
