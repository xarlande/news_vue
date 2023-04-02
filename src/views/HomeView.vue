<template>
  <div class="mt-5">
    <NewsCategoryItem
      :data-card="newsTechnology"
      :categories-name="`Технології`"
    />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsBusiness" :categories-name="`Бізнес`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsPopular" :categories-name="`Популярні`" />
  </div>
  <div class="my-2">
    <NewsCategoryItem :data-card="newsSport" :categories-name="`Спорт`" />
  </div>
</template>
<script>
import { defineComponent, toRefs } from "vue";
import { useNewsHomePage } from "@/stores/getNewsHomePage";
import NewsCategoryItem from "@/components/newsCategoryItem.vue";

export default defineComponent({
  components: { NewsCategoryItem },
  setup() {
    const store = useNewsHomePage();
    const { newsTechnology, newsBusiness, newsPopular, newsSport, getAllNews } =
      toRefs(store);

    return {
      getAllNews,
      newsTechnology,
      newsSport,
      newsBusiness,
      newsPopular,
    };
  },
  mounted() {
    this.getAllNews();
  },
});
</script>
<style scoped></style>
