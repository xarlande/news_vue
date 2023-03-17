<template>
  <div class="border-b border-gray-300 text-center py-3 uppercase">
    <div class="max-w-3xl mx-auto">News App</div>
  </div>
  <div class="max-w-3xl mx-auto p-2">
    <nav>
      <SearchNews />
    </nav>
    <main>
      <div class="text-center">
        <div v-if="requestStoreSearch.country">
          Новини країни : "{{ requestStoreSearch.country }}"
        </div>
        <div v-if="requestStoreSearch.query">
          Ось новини за запитом "{{ requestStoreSearch.query }}"
        </div>
      </div>

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
    const { getNews, requestStoreSearch } = toRefs(store);

    return {
      getNews,
      requestStoreSearch,
    };
  },
  mounted() {
    this.getNews("ua");
  },
});
</script>

<style scoped></style>
