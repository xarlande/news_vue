<template>
  <div class="mt-5">
    <p class="text-blue-500 text-center text-xl">
      Новини категорії: Технології
    </p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
      v-if="newsTechnology.length"
    >
      <HomeNewsCard
        class="my-2"
        v-for="(item, idx) in newsTechnology"
        :key="idx"
        :item-new="item"
      />
    </div>
    <div class="text-center text-sm my-5" v-else>Пусто</div>
  </div>
  <div class="my-2">
    <p class="text-blue-500 text-center text-xl">Новини категорії: Бізнес</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
      v-if="newsBusiness.length"
    >
      <HomeNewsCard
        class="my-2"
        v-for="(item, idx) in newsBusiness"
        :key="idx"
        :item-new="item"
      />
    </div>
    <div class="text-center text-sm my-5" v-else>Пусто</div>
  </div>
  <div class="my-2">
    <p class="text-blue-500 text-center text-xl">Новини категорії: Популярні</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
      v-if="newsPopular.length"
    >
      <HomeNewsCard
        class="my-2"
        v-for="(item, idx) in newsPopular"
        :key="idx"
        :item-new="item"
      />
    </div>
    <div class="text-center text-sm my-5" v-else>Пусто</div>
  </div>
  <div class="my-2">
    <p class="text-blue-500 text-center text-xl">Новини категорії: Спорт</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
      v-if="newsSport.length"
    >
      <HomeNewsCard
        class="my-2"
        v-for="(item, idx) in newsSport"
        :key="idx"
        :item-new="item"
      />
    </div>
    <div class="text-center text-sm my-5" v-else>Пусто</div>
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
