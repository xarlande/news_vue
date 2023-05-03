<template>
  <NewsSearchForm />

  <main>
    <div class="text-center cursor-default">
      <div v-if="requestStoreSearch.country">
        Новини країни : {{ requestStoreSearch.country.toUpperCase() }}
      </div>
      <div v-if="requestStoreSearch.query">
        Ось новини за запитом "{{ requestStoreSearch.query }}"
      </div>
    </div>
    <div :class="{ spinner_flex: loadingNews }">
      <LoadingSpinner v-if="loadingNews" />
      <NewsSearchCard v-else />
    </div>
  </main>
</template>

<script setup>
import { onMounted, toRefs } from "vue";
import NewsSearchForm from "@/components/NewsSearch/NewsSearchForm.vue";
import LoadingSpinner from "@/components/icon/loadingSpinner.vue";
import NewsSearchCard from "@/components/NewsSearch/NewsSearchCard.vue";
import { useNewsStore } from "@/stores/getNewsForSearch";

const store = useNewsStore();
const { requestStoreSearch, loadingNews, newsList } = toRefs(store);

onMounted(() => {
  if (!newsList.value.length) {
    store.getNews("ua");
  }
});
</script>

<style scoped>
.spinner_flex {
  @apply flex justify-center items-center min-h-[300px];
}
</style>
