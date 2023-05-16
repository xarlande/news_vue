<template>
  <NewsSearchForm :country="country" />

  <main>
    <div class="text-center cursor-default">
      <div v-if="requestStoreSearch.country">
        Новини країни : {{ getCountryName.name }}
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
import NewsSearchForm from "@/components/NewsSearch/NewsSearchForm.vue";
import LoadingSpinner from "@/components/Icon/LoadingSpinner.vue";
import NewsSearchCard from "@/components/NewsSearch/NewsSearchCard.vue";
import { useNewsStore } from "@/stores/getNewsForSearch";

const title = "News App - Search";

useSeoMeta({
  title: title,
  ogTitle: title,
});

const store = useNewsStore();
const { requestStoreSearch, loadingNews, newsList } = toRefs(store);

const country = [
  { id: 1, name: "Україна", IsoForm: "ua" },
  { id: 2, name: "США", IsoForm: "us" },
  { id: 3, name: "Німеччина", IsoForm: "de" },
  { id: 4, name: "Польща", IsoForm: "pl" },
];

const getCountryName = computed(() => {
  const countryStore = requestStoreSearch.value.country
  if(countryStore){
    return country.find(item => item.IsoForm === countryStore)
  }
})

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
