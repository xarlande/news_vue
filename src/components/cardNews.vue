<template>
  <div
    v-for="(item, idx) in newsList"
    :key="idx"
    class="border rounded my-5 flex p-5 flex-col"
  >
    <img
      :src="
        item.urlToImage ? item.urlToImage : 'https://via.placeholder.com/150'
      "
      class="h-72 mx-auto"
      alt="image"
    />
    <div class="flex flex-col">
      <div class="my-3 text-center text-lg">
        {{ item.title }}
      </div>

      <div class="my-3 text-center">
        {{ item.description }}
      </div>

      <div class="flex justify-between mr-3 gap-2">
        <div class="text-center">
          <div>Час публікації: {{ item.time }}</div>
          <div>Дата публікації: {{ item.data }}</div>
        </div>
        <div>
          <a class="global_button" v-bind:href="item.url" target="_blank"
            >Посилання</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/getNews";
import { toRefs } from "vue";

export default {
  name: "cardNews",
  setup() {
    const store = useNewsStore();
    const { newsList, getNews } = toRefs(store);

    return {
      newsList,
      getNews,
    };
  },
  methods: {},
  mounted() {
    this.getNews();
  },
};
</script>

<style scoped></style>
