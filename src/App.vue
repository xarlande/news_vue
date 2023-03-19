<template>
  <header class="border-b border-gray-300 text-center py-3 uppercase">
    <h1 class="max-w-3xl mx-auto cursor-default">News App</h1>
  </header>
  <div class="max-w-3xl mx-auto p-2">
    <SearchNews />

    <main>
      <div class="text-center cursor-default">
        <div v-if="requestStoreSearch.country">
          Новини країни : {{ requestStoreSearch.country.toUpperCase() }}
        </div>
        <div v-if="requestStoreSearch.query">
          Ось новини за запитом "{{ requestStoreSearch.query }}"
        </div>
      </div>

      <CardNews />
    </main>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import CardNews from "@/components/cardNews.vue";
import SearchNews from "@/components/searchNews.vue";
import { useNewsStore } from "@/stores/getNews";

export default defineComponent({
  components: { SearchNews, CardNews },
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
