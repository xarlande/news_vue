<template>
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
    <div :class="{ spiner_flex: loadingNews }">
      <LoadingSpiner v-if="loadingNews" />
      <CardNews v-else />
    </div>
  </main>
</template>

<script>
import { toRefs, defineComponent } from "vue";
import SearchNews from "@/components/NewsSearch/searchNews.vue";
import LoadingSpiner from "@/components/icon/loadingSpiner.vue";
import CardNews from "@/components/NewsSearch/cardNews.vue";
import { useNewsStore } from "@/stores/getNews";

export default defineComponent({
  name: "SearchView",
  components: { CardNews, LoadingSpiner, SearchNews },
  setup() {
    const store = useNewsStore();
    const { getNews, requestStoreSearch, loadingNews, newsList } =
      toRefs(store);

    return {
      getNews,
      requestStoreSearch,
      loadingNews,
      newsList,
    };
  },
  mounted() {
    if (!this.newsList.length) {
      this.getNews("ua");
    }
  },
});
</script>

<style scoped>
.spiner_flex {
  @apply flex justify-center items-center min-h-[300px];
}
</style>
