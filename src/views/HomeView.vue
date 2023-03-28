<template>
  <div class="my-5">
    <p class="text-blue-500 text-center">Новини категорії: Технології</p>
    <HomeNewsCard
      class="my-2"
      v-for="(item, idx) in newsTechnology"
      :key="idx"
      :item-new="item"
    />
  </div>
  <div class="my-2">
    <p class="text-blue-500 text-center">Новини категорії: Технології</p>
    <HomeNewsCard
      class="my-2"
      v-for="(item, idx) in newsBusiness"
      :key="idx"
      :item-new="item"
    />
  </div>
  <div class="my-2">
    <p class="text-blue-500 text-center">Новини категорії: Технології</p>
    <HomeNewsCard
      class="my-2"
      v-for="(item, idx) in newsPopular"
      :key="idx"
      :item-new="item"
    />
  </div>
  <div class="my-2">
    <p class="text-blue-500 text-center">Новини категорії: Технології</p>
    <HomeNewsCard
      class="my-2"
      v-for="(item, idx) in newsSport"
      :key="idx"
      :item-new="item"
    />
  </div>
</template>
<script>
import { defineComponent, toRefs } from "vue";
import { useNewsHomePage } from "@/stores/getNewsHomePage";
import HomeNewsCard from "@/components/HomeNewsCard.vue";

export default defineComponent({
  components: { HomeNewsCard },
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
